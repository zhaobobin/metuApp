import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Toast } from '@/components/index';
import { FormItem, InputMobile } from '@/components/Form/index';

interface FormValues {
  mobile: string;
}

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .trim()
    .length(11, '手机号格式有误')
    .required('请输入手机号')
});

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

interface IState {}

class ResetPasswordStep1 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onSubmit = (values: FormValues) => {
    this.props.dispatch({
      type: 'account/checkMobile',
      payload: {
        mobile: values.mobile
      },
      callback: (res: IResponse) => {
        if (res.code === 0) {
          if (res.data.error_key) {
            Toast.show(res.data.message);
          } else {
            Navigator.goPage('ResetPasswordStep2', { mobile: values.mobile });
          }
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  render() {
    const initialValues = {
      mobile: ''
    };
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>找回密码</Text>
        </View>
        <View style={styles.body}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.onSubmit}>
            {({ handleSubmit }) => {
              return (
                <View>
                  <FormItem style={styles.formItem}>
                    <Field
                      name="mobile"
                      placeholder="手机号"
                      component={InputMobile}
                    />
                  </FormItem>
                  <View style={styles.btn}>
                    <Button
                      title="发送验证码"
                      type="primary"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 100
  },
  head: {
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: '#333'
  },
  body: {
    ...layout.margin(40, 0, 20, 0)
  },
  formItem: {
    marginBottom: 20
  },
  btn: {
    ...layout.margin(20, 0, 0, 0)
  }
});

export default connector(ResetPasswordStep1);
