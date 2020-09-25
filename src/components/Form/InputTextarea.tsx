/**
 * InputTextarea
 */
import React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { FieldInputProps, FormikProps, ErrorMessage } from 'formik';
import styles from './formStyle';

interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  placeholder: string;
}

export default class InputTextarea extends React.PureComponent<IProps> {
  render() {
    const { field, form, placeholder, ...rest } = this.props;

    return (
      <View style={styles.inputView}>
        <TextInput
          multiline
          textAlignVertical="top"
          clearButtonMode="while-editing"
          style={styles.input}
          placeholder={placeholder || '请输入'}
          value={form.values[field.name]}
          onChangeText={form.handleChange(field.name)}
          onBlur={form.handleBlur(field.name)}
          {...rest}
        />
        <View style={styles.error}>
          <Text style={styles.errorText}>
            <ErrorMessage name={field.name} />
          </Text>
        </View>
      </View>
    );
  }
}
