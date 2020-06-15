/**
 * InputPassword
 */
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import styles from './formStyle';

interface IProps {
  label?: string;
  value?: string;
  error?: any;
  placeholder: string;
  mimLength?: number;
  maxLength?: number;
  onChange?: () => void;
}

export default class InputPassword extends React.PureComponent<IProps> {
  render() {
    const {
      label,
      onChange,
      value,
      error,
      placeholder,
      mimLength,
      maxLength
    } = this.props;

    return (
      <View style={styles.inputView}>
        <TextInput
          maxLength={maxLength || 20}
          clearButtonMode="while-editing"
          // autoComplete="password"
          style={styles.input}
          // label={`${label}：`}
          value={value || ''}
          onChangeText={onChange}
          placeholder={placeholder || '请输入'}
        />

        <View style={styles.error}>
          <Text style={styles.errorText}>{error ? error.join(',') : null}</Text>
        </View>
      </View>
    );
  }
}
