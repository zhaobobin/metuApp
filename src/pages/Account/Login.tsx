import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Keyboard,
  KeyboardEvent
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { ENV, Storage, Navigator, Encrypt } from '@/utils/index';
import { IResponse, ILoginRedirect } from '@/types/CommonTypes';
import { layout, GlobalStyles } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import { FormItem, InputMobile, InputPassword } from '@/components/Form/index';

interface FormValues {
  mobile: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .trim()
    .length(11, '手机号格式有误')
    .required('请输入手机号'),
  password: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入密码')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/login']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  initial: boolean;
  title: string;
  loginType: 'psd' | 'sms';
  checked: boolean;
  lastTel: string;
  keyboardHeight: number;
}

class Login extends React.Component<IProps, IState> {
  private keyboardDidShow: any;
  private keyboardDidHide: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      initial: false,
      title: '密码登录',
      loginType: 'psd',
      checked: false,
      lastTel: '',
      keyboardHeight: 0
    };
  }

  async componentDidMount() {
    const lastTel = await Storage.get(ENV.storage.lastTel);
    this.setState({
      initial: true,
      lastTel
    });
  }

  componentWillMount() {
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardShow
    );
    this.keyboardDidHide = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove();
    this.keyboardDidHide.remove();
  }

  keyboardShow = (e: KeyboardEvent) => {
    console.log(e.endCoordinates.height);
    this.setState({
      keyboardHeight: GlobalStyles.is_IphoneX
        ? e.endCoordinates.height + 180
        : e.endCoordinates.height + 100
    });
  };

  keyboardHide = () => {
    this.setState({
      keyboardHeight: 0
    });
  };

  onSubmit = (values: FormValues) => {
    this.onLogin(values);
  };

  onLogin = (values: FormValues) => {
    const payload: any = {
      ...values
    };
    if (this.state.checked) {
      Storage.set(ENV.storage.lastTel, payload.mobile);
    } else {
      Storage.remove(ENV.storage.lastTel);
    }
    if (payload.password) {
      payload.password = Encrypt(payload.mobile, payload.password);
    }
    if (payload.smscode) {
      payload.smscode = Encrypt(payload.mobile, payload.smscode);
    }
    payload.loginType = this.state.loginType;
    payload.remenber = true;
    this.props.dispatch({
      type: 'account/login',
      payload,
      callback: async (res: IResponse) => {
        if (res.code === 0) {
          const loginRedirect = await Storage.get(ENV.storage.loginRedirect);
          if (loginRedirect) {
            const route: ILoginRedirect = JSON.parse(loginRedirect);
            Navigator.goPage(route.routeName, route.routeParam);
          } else {
            Navigator.goBack();
          }
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  toReset = () => {
    Navigator.goPage('ResetPassword');
  };

  goRegister = () => {
    Navigator.goPage('Register');
  };

  goBack = () => {
    Navigator.goBack();
  };

  goHome = () => {
    Navigator.goPage('AppScreen');
  };

  render() {
    const { loading } = this.props;
    const { initial, title, lastTel, keyboardHeight } = this.state;
    if (!initial) {
      return null;
    }
    const initialValues = {
      mobile: lastTel,
      password: ''
    };
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}>
        <View style={styles.head}>
          <Touchable onPress={this.goHome}>
            <Image source={require('@/assets/com/logo.png')} />
          </Touchable>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.body}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.onSubmit}>
            {({ handleSubmit }) => {
              return (
                <View>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="mobile"
                      placeholder="手机号"
                      component={InputMobile}
                    />
                  </FormItem>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="password"
                      placeholder="密码"
                      component={InputPassword}
                    />
                  </FormItem>
                  <View style={styles.btn}>
                    <Button
                      title="登录"
                      type="primary"
                      disabled={loading}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>

        <View style={[styles.foot, { paddingBottom: keyboardHeight }]}>
          <Touchable onPress={this.toReset}>
            <Text style={styles.link}>忘记密码</Text>
          </Touchable>
          <Touchable onPress={this.goRegister}>
            <Text style={styles.link}>注册新帐号</Text>
          </Touchable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 100
  },
  head: {
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 20
  },
  remeber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...layout.margin(20, 0, 0, 0)
  },
  check: {
    width: '50%',
    height: 30,
    justifyContent: 'center'
  },
  desc: {
    height: 30,
    justifyContent: 'center'
  },
  btn: {
    ...layout.margin(20, 0, 0, 0)
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...layout.margin(20, 0, 0, 0)
  },
  link: {
    color: '#1890ff'
  }
});

export default connector(Login);
