/**
 * InputMobile
 */
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Validator } from '@/utils/index';
import styles from './formStyle';

interface IProps {
  label?: string;
  value?: string;
  error?: any;
  autoFocus?: boolean;
  placeholder: string;
  onChangeText: (value: string, err?: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
}

export default class InputMobile extends React.PureComponent<IProps> {
  state = {
    value: ''
  };

  // 监控手机号输入
  changeValue = (value: string) => {
    if (value.length === 1 && value !== '1') value = '';
    value = value.replace(/\D/g, '');
    this.setState({ value });
    if (Validator.checkMobile(value)) {
      this.props.onChangeText(value);
    } else {
      this.props.onChangeText(value, '请输入正确的手机号');
    }
  };

  // 手机失焦检测
  mobileOnBlur = () => {
    let { value } = this.state;
    if (value) {
      if (Validator.isMobile(value)) {
        this.props.onChangeText(value);
      } else {
        this.props.onChangeText(value, '请输入正确的手机号');
      }
    } else {
      this.props.onChangeText(value, '请输入手机号');
    }
  };

  onFocus = () => {};

  clear = () => {};

  render() {
    const { label, value, error, autoFocus, placeholder } = this.props;

    return (
      <View style={styles.inputView}>
        <TextInput
          autoFocus={autoFocus}
          maxLength={11}
          keyboardType="phone-pad"
          clearButtonMode="while-editing"
          // autoComplete="tel"
          style={styles.input}
          // label={`${label}：`}
          value={value || ''}
          onChangeText={this.changeValue}
          placeholder={placeholder || '请输入'}
          onFocus={this.onFocus}
          onBlur={this.mobileOnBlur}
        />

        <View style={styles.error}>
          <Text style={styles.errorText}>{error ? error.join(',') : null}</Text>
        </View>
      </View>
    );
  }
}
