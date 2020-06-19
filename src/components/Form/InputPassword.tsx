/**
 * InputPassword
 */
import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Validator } from '@/utils/index';
import styles from './formStyle';

interface IProps {
  label?: string;
  value?: string;
  error?: any;
  placeholder: string;
  mimLength?: number;
  maxLength?: number;
  callback: (value: string, err?: string) => void;
}

export default class InputPassword extends React.PureComponent<IProps> {

  //监控输入值
  changeValue = (value: string) => {
    value = value.replace(/ /g,'');
    this.checkPsd(value);
    this.props.callback(value);
  };

  checkPsd = (value: string) => {
    let psdLevel, psdLevelStyle;
    if(value) {
      let psdModes = Validator.checkPsdLevel(value);
      switch(psdModes){
        case 1 :
          psdLevel = '';
          psdLevelStyle = '';
          break;
        case 2 :
          psdLevel = '弱';
          psdLevelStyle = styles.psdLevelError;
          break;
        case 3 :
          psdLevel = '中';
          psdLevelStyle = styles.psdLevelMiddle;
          break;
        case 4 :
          psdLevel = '强';
          psdLevelStyle = styles.psdLevelStrong;
          break;
        default:
          psdLevel = '';
          psdLevelStyle = '';
          break;
      }
    }
    this.setState({
      value,
      psdLevel,
      psdLevelStyle
    });
  };

  render() {
    const {
      label,
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
          onChangeText={this.changeValue}
          placeholder={placeholder || '请输入'}
        />

        <View style={styles.error}>
          <Text style={styles.errorText}>{error ? error.join(',') : null}</Text>
        </View>
      </View>
    );
  }
}
