import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '@/models/index';
import { Navigator, Validator, Encrypt } from '@/utils/index';
import { layout } from '@/theme/index';
import Button from '@/components/Button';

import { createForm, ValidateErrors, WrappedFormMethods } from 'rc-form';
import {
  FormItem,
  InputMobile,
  InputPassword,
  InputText,
  InputSmscode,
  CheckBox
} from '@/components/Form/index';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  form: WrappedFormMethods;
}

interface IState {
  title: string;
  loginType: 'psd' | 'sms';
  checked: boolean;
}

class Register extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '用户注册',
      loginType: 'psd',
      checked: true
    };
  }

  // 手机号
  mobileCallback = (value: string, err?: string) => {
    if (err) {
      this.props.form.setFields({
        mobile: {
          value: value,
          errors: [new Error(err)]
        }
      });
    } else {
      this.props.form.setFieldsValue({ mobile: value });
    }
  };

  // 密码
  passwordCallback = (value: string, err?: string) => {
    if (err) {
      this.props.form.setFields({
        password: {
          value: value,
          errors: [new Error(err)]
        }
      });
    } else {
      this.props.form.setFieldsValue({ password: value });
    }
  };

  // 昵称
  nicknameCallback = (value: string, err?: string) => {
    if (err) {
      this.props.form.setFields({
        nickname: {
          value: value,
          errors: [new Error(err)]
        }
      });
    } else {
      this.props.form.setFieldsValue({ nickname: value });
    }
  };

  //短信验证码回调
  smscodeCallback = (value: string, err?: string) => {
    //清空错误提示
    if (err === 'mobileError') {
      this.props.form.setFields({
        mobile: {
          value: '',
          errors: [new Error('请输入手机号')]
        }
      });
    } else if (err === 'clearError') {
      this.props.form.setFields({
        smscode: {
          value: '',
          errors: ''
        }
      });
    } else if (err === 'smscodeError') {
      this.props.form.setFields({
        smscode: {
          value: '',
          errors: [
            new Error(!value ? '请输入短信验证码' : '短信验证码格式有误')
          ]
        }
      });
    } else {
      this.props.form.setFieldsValue({ smscode: value });
    }
  };

  submit = () => {
    this.props.form.validateFields((error: ValidateErrors, values: any) => {
      if (error) return;
      if (values.password) {
        values.password = Encrypt(values.mobile, values.password);
      }
      if (values.smscode) {
        values.smscode = Encrypt(values.mobile, values.smscode);
      }
      values.loginType = this.state.loginType;
      this.onRegister(values);
    });
  };

  onRegister = (values: any) => {
    this.props.dispatch({
      type: 'account/register',
      payload: values,
      callback: () => {
        Navigator.goPage('MainScreen');
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
    const { title, checked } = this.state;
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldError,
      getFieldsError
    } = this.props.form;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Image source={require('@/assets/com/logo.png')} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.body}>
          <FormItem style={styles.formItem}>
            {getFieldDecorator('mobile', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入手机号' },
                { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
              ]
            })(
              <InputMobile
                autoFocus
                placeholder="手机号"
                error={getFieldError('mobile')}
                callback={this.mobileCallback}
              />
            )}
          </FormItem>

          <FormItem style={styles.formItem}>
            {getFieldDecorator('nickname', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入昵称' },
                { min: true, message: '昵称不能小于2位' },
                { max: true, message: '昵称不能大于6位' }
              ]
            })(
              <InputText
                placeholder="昵称"
                error={getFieldError('ninckname')}
                callback={this.nicknameCallback}
              />
            )}
          </FormItem>

          <FormItem style={styles.formItem}>
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
                callback={this.passwordCallback}
              />
            )}
          </FormItem>

          <FormItem style={styles.formItem}>
            {getFieldDecorator('smscode', {
              validateFirst: true,
              validateTrigger: 'onBlur',
              rules: [
                { required: true, message: '请输入验证码' },
                { len: true, message: '验证码格式有误' }
              ]
            })(
              <InputSmscode
                placeholder="验证码"
                error={getFieldError('smscode')}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('xieyi', {
              valuePropName: 'checked',
              initialValue: checked
            })(
              <View style={styles.xieyi}>
                <View style={styles.check}>
                  <CheckBox
                    label="已阅读并同意"
                    checked={checked}
                    onClick={this.toggleXieyi}
                  />
                </View>
                <View style={styles.desc}>
                  <Text>
                    <Text style={styles.link} onPress={this.toXieyi}>
                      《迷图网用户注册协议》
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </FormItem>

          <View style={styles.btn}>
            <Button
              title="注册"
              type="primary"
              onPress={this.submit}
              disabled={
                Validator.hasErrors(getFieldsError()) ||
                !getFieldValue('mobile') ||
                !getFieldValue('nickname') ||
                !getFieldValue('password') ||
                !getFieldValue('smscode') ||
                !getFieldValue('xieyi')
              }
            />
          </View>
        </View>

        <View style={styles.foot}>
          <Text>
            已有账号？返回{' '}
            <Text onPress={this.goBack} style={styles.link}>
              登录
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  head: {
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 40
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
    alignItems: 'flex-start'
  },
  link: {
    color: '#1890ff'
  }
});

export default connector(createForm<IProps>()(Register));
