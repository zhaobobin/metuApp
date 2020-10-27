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
import { Navigator, Encrypt } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout, GlobalStyles } from '@/theme/index';

import { Button, Touchable, Toast } from '@/components/index';
import {
  FormItem,
  InputMobile,
  InputPassword,
  InputText,
  InputSmscode,
  CheckBox
} from '@/components/Form/index';

interface FormValues {
  mobile: string;
  nickname: string;
  password: string;
  smscode: string;
  xieyi: boolean;
}

const initialValues = {
  mobile: '',
  nickname: '',
  password: '',
  smscode: '',
  xieyi: true
};

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .trim()
    .length(11, '手机号格式有误')
    .required('请输入手机号'),
  nickname: Yup.string()
    .trim()
    .min(2, '昵称不能小于2位')
    .max(6, '昵称不能超过6位')
    .required('请输入昵称'),
  password: Yup.string()
    .trim()
    .min(6, '密码长度不能小于6位')
    .max(20, '密码长度不能大于20位')
    .required('请输入密码'),
  smscode: Yup.string()
    .trim()
    .length(6, '验证码格式有误')
    .required('请输入验证码')
});

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['account/register']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {
  title: string;
  checked: boolean;
  keyboardHeight: number;
}

class Register extends React.Component<IProps, IState> {
  private keyboardDidShow: any;
  private keyboardDidHide: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '用户注册',
      checked: true,
      keyboardHeight: 0
    };
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
    this.onRegister(values);
  };

  onRegister = (values: FormValues) => {
    const payload: any = {
      ...values
    };
    if (!this.state.checked) {
      Toast.show('请勾选注册协议');
      return;
    }
    if (payload.password) {
      payload.password = Encrypt(payload.mobile, payload.password);
    }
    if (payload.smscode) {
      payload.smscode = Encrypt(payload.mobile, payload.smscode);
    }
    this.props.dispatch({
      type: 'account/register',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goPage('MainScreen');
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  toggleXieyi = () => {
    const checked = !this.state.checked;
    this.setState({
      checked
    });
  };

  toXieyi = () => {
    Navigator.goPage('RegisterXieyi');
  };

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { loading } = this.props;
    const { title, checked, keyboardHeight } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Image source={require('@/assets/com/logo.png')} />
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
                      name="nickname"
                      placeholder="昵称"
                      component={InputText}
                    />
                  </FormItem>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="password"
                      placeholder="密码"
                      component={InputPassword}
                    />
                  </FormItem>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="smscode"
                      render={(props: any) => (
                        <InputSmscode
                          {...props}
                          placeholder="验证码"
                          type="register"
                          mobile={props.form.values['mobile']}
                        />
                      )}
                    />
                  </FormItem>
                  <FormItem>
                    <View style={styles.xieyi}>
                      <View style={styles.check}>
                        <CheckBox
                          label="已阅读并同意"
                          checked={checked}
                          onClick={this.toggleXieyi}
                        />
                      </View>
                      <View style={styles.desc}>
                        <Touchable onPress={this.toXieyi}>
                          <Text style={styles.link}>
                            《迷图网用户注册协议》
                          </Text>
                        </Touchable>
                      </View>
                    </View>
                  </FormItem>
                  <View style={styles.btn}>
                    <Button
                      title="注册"
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
          <Text style={styles.footText}>已有账号？返回</Text>
          <Touchable onPress={this.goBack}>
            <Text style={styles.link}>登录</Text>
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
  xieyi: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...layout.margin(20, 0, 0, 0)
  },
  check: {
    width: 120,
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
    flexDirection: 'row'
  },
  footText: {
    marginRight: 10
  },
  link: {
    color: '#1890ff'
  }
});

export default connector(Register);
