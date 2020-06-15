/**
 * InputMobile
 */
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './formStyle';

interface IProps {
  label?: string;
  value?: string;
  error?: any;
  placeholder: string;
  onChange?: () => void;
}

export default class InputMobile extends React.PureComponent<IProps> {
  onFocus = () => {};

  clear = () => {};

  render() {
    const { label, onChange, value, error, placeholder } = this.props;

    return (
      <View style={styles.inputView}>
        <TextInput
          maxLength={11}
          keyboardType="phone-pad"
          clearButtonMode="while-editing"
          // autoComplete="tel"
          style={styles.input}
          // label={`${label}：`}
          value={value || ''}
          onChangeText={onChange}
          placeholder={placeholder || '请输入'}
          onFocus={this.onFocus}
        />

        <View style={styles.error}>
          <Text style={styles.errorText}>{error ? error.join(',') : null}</Text>
        </View>
      </View>
    );
  }
}
