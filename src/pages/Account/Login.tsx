import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Navigator, Validator, Encrypt } from '@/utils/index';
import { color, layout } from '@/theme/index';
import Touchable from '@/components/Touchable';
import Button from '@/components/Button';

import { createForm } from 'rc-form';
import {
  FormItem,
  InputMobile,
  InputPassword,
  CheckBox
} from '@/components/Form/index';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  form: any;
  changeTabKey: () => void;
}

interface IState {
  title: string;
  loginType: 'psd' | 'sms';
  checked: boolean;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '密码登录',
      loginType: 'psd',
      checked: false
    };
  }

  goDetail = () => {
    Navigator.goPage('Register');
  };

  submit = () => {
    this.props.form.validateFields((error: any, values: any) => {
      if (!error) {
        // console.log(values)
        if (values.password)
          values.password = Encrypt(values.mobile, values.password);
        if (values.smscode)
          values.smscode = Encrypt(values.mobile, values.smscode);
        values.loginType = this.state.loginType;
        this.onLogin(values);
      }
    });
  };

  onLogin = (values: any) => {
    this.props.dispatch({
      type: 'global/login',
      payload: values,
      callback: (res: any) => {
        // console.log(res)
        if (res.code === 0) {
          Navigator.goPage('Main');
        } else {
          const message = res.message.split(' ');
          this.props.form.setFields({
            [message[0]]: {
              value: '',
              errors: [new Error(message[1])]
            }
          });
        }
      }
    });
  };

  toggleRemeber = () => {
    const checked = !this.state.checked;
    this.setState({
      checked
    });
  };

  toReset = () => {
    Navigator.goPage('ResetPassword');
  };

  render() {
    const { title, loginType, checked } = this.state;
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsError,
      getFieldError
    } = this.props.form;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.body}>
          <FormItem>
            {getFieldDecorator('mobile', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
              ]
            })(
              <InputMobile
                placeholder="手机号"
                error={getFieldError('mobile')}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('password', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入密码' },
                { min: true, message: '密码不能小于6位' },
                { max: true, message: '密码不能大于20位' }
              ]
            })(
              <InputPassword
                placeholder="密码"
                error={getFieldError('password')}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remeber', {
              valuePropName: 'checked',
              initialValue: checked
            })(
              <View style={styles.remeber}>
                <View style={styles.check}>
                  <CheckBox
                    label="记住帐号"
                    checked={checked}
                    onClick={this.toggleRemeber}
                  />
                </View>
                <View style={styles.desc}>
                  <Text style={styles.link} onPress={this.toReset}>
                    忘记密码
                  </Text>
                </View>
              </View>
            )}
          </FormItem>

          <View style={styles.btn}>
            <Button
              title="登录"
              type="primary"
              onPress={this.submit}
              // disabled={
              //   Validator.hasErrors(getFieldsError()) ||
              //   !getFieldValue('mobile') ||
              //   !getFieldValue(loginType === 'psd' ? 'password' : 'smscode')
              // }
            />
          </View>
        </View>

        <View style={styles.foot}>
          <Touchable onPress={this.props.changeTabKey}>
            <Text style={styles.link}>注册新帐号</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center'
  },
  head: {
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
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
    alignItems: 'flex-start',
    ...layout.margin(20, 0, 0, 0)
  },
  link: {
    color: '#1890ff'
  }
});

const LoginForm = createForm()(connector(Login));

export default LoginForm;
