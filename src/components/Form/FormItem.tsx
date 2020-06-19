/**
 * FormItem
 */
import React from 'react';
import { View } from 'react-native';
import styles from './formStyle';

interface IProps {
  style?: any;
  children: React.ReactNode;
}

const FormItem = (props: IProps) => {
  return <View style={[styles.formItem, props.style]}>{props.children}</View>;
};

export default FormItem;
