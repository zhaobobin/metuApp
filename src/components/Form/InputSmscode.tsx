/**
 * InputSmscode
 */
import React from 'react';
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleSheet,
  StyleProp
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { FieldInputProps, FormikProps, ErrorMessage } from 'formik';
import { RootState } from '@/models/index';
import { Validator } from '@/utils/index';
import { filterTel } from '@/utils/utils';
import { color, layout } from '@/theme/index';
import { IResponse } from '@/types/CommonTypes';
import Toast from '@/components/Toast';
import Touchable from '../Touchable';

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = TextInputProps &
  ModelState & {
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    placeholder: string;
    type: string;
    mobile: string;
    auto?: string;
  };

interface IState {
  mobile: string;
  btnText: string;
  btnStyle: StyleProp<any>;
  num: number;
}

class InputSmscode extends React.PureComponent<IProps, IState> {
  timer: number = 0;
  ajaxFlag: boolean = true;

  constructor(props: IProps) {
    super(props);
    this.state = {
      mobile: '',
      btnText: '获取验证码',
      btnStyle: styles.null,
      num: 60
    };
  }

  componentDidMount() {
    this.initBtnStyle(this.props.mobile);
    if (this.props.auto) this.sendSmsCode(); //自动发送验证码
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.mobile !== prevState.mobile) {
      return {
        mobile: nextProps.mobile
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.mobile !== prevState.mobile) {
      this.initBtnStyle(this.state.mobile);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //初始化按钮样式
  initBtnStyle(mobile: string) {
    let { num } = this.state;
    let btnStyle = Validator.isMobile(mobile)
      ? num === 60
        ? styles.actived
        : this.state.btnStyle
      : num === 60
      ? styles.null
      : styles.disabled;
    this.setState({
      mobile,
      btnStyle
    });
  }

  //发送短信验证码
  sendSmsCode = () => {
    let { type, mobile } = this.props;
    this.props.dispatch({
      type: 'account/smscode',
      payload: {
        type,
        mobile
      },
      callback: (res: IResponse) => {
        if (res.code === 0) {
          this.interval(); //执行倒计时
          Toast.show(
            `已将短信验证码发送到您${filterTel(mobile)}的手机当中，请注意查收！`
          );
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  //短信倒计时
  interval() {
    let num = 60;
    this.setState({
      btnText: '重新发送(' + num + 's)',
      btnStyle: styles.disabled
    });
    this.timer = setInterval(() => {
      if (num === 1) {
        this.ajaxFlag = true;
        this.setState({
          btnText: '重新获取',
          btnStyle: this.state.mobile ? styles.actived : styles.null,
          num: 60
        });
        clearInterval(this.timer);
      } else {
        num--;
        this.setState({ btnText: '重新发送(' + num + 's)', num: num });
      }
    }, 1000);
  }

  render() {
    const { field, form, placeholder, ...rest } = this.props;
    const { btnText, btnStyle } = this.state;
    return (
      <View style={styles.inputView}>
        <TextInput
          {...rest}
          maxLength={6}
          keyboardType="phone-pad"
          clearButtonMode="while-editing"
          style={styles.input}
          placeholder={placeholder || '请输入'}
          value={form.values[field.name]}
          onChangeText={form.handleChange(field.name)}
          onBlur={form.handleBlur(field.name)}
        />
        <View style={styles.error}>
          <Text style={styles.errorText}>
            <ErrorMessage name={field.name} />
          </Text>
        </View>
        <View style={styles.btn}>
          <Touchable onPress={this.sendSmsCode}>
            <Text style={btnStyle}>{btnText}</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    height: 64,
    position: 'relative'
  },
  input: {
    ...layout.padding(0),
    height: 44,
    fontSize: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.border
  },
  close: {
    position: 'absolute',
    left: 10,
    right: 10
  },
  error: {
    ...layout.margin(10, 0, 0, 0),
    height: 20
  },
  errorText: {
    color: color.red
  },
  btn: {
    paddingHorizontal: 5,
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    right: 0
  },
  // btnStyle
  actived: {
    color: color.blue
  },
  disabled: {
    color: color.gray
  },
  null: {
    color: color.gray
  }
});

export default connector(InputSmscode);
