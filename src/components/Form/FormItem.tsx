/**
 * FormItem
 */
import React from 'react';
import { View } from 'react-native';
import styles from './formStyle';

interface IProps {
  children: React.ReactNode;
}

const FormItem = (props: IProps) => {
  return <View style={styles.formItem}>{props.children}</View>;
};

export default FormItem;
