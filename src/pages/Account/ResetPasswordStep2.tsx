import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '@/navigator/LoginNavigation';
import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';
import { IResponse } from '@/types/CommonTypes';
import { layout } from '@/theme/index';

import { Button, Toast } from '@/components/index';
import { FormItem, InputSmscode } from '@/components/Form/index';

interface FormValues {
  smscode: string;
}

const validationSchema = Yup.object().shape({
  smscode: Yup.string()
    .trim()
    .length(6, '验证码格式有误')
    .required('请输入验证码')
});

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<LoginStackParamList, 'ResetPasswordStep2'>;
}

interface IState {}

class ResetPassword extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onSubmit = (values: FormValues) => {
    const { route } = this.props;
    const payload = {
      mobile: route.params.mobile,
      smscode: values.smscode
    }
    this.props.dispatch({
      type: 'account/checkSmscode',
      payload,
      callback: (res: IResponse) => {
        if (res.code === 0) {
          Navigator.goPage('ResetPasswordStep3', payload);
        } else {
          Toast.show(res.message);
        }
      }
    });
  };

  render() {
    const { route } = this.props;
    const initialValues = {
      smscode: ''
    };
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>输入验证码</Text>
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
                      name="smscode"
                      render={(props: any) => (
                        <InputSmscode
                          {...props}
                          placeholder="验证码"
                          type="reset"
                          mobile={route.params.mobile}
                          auto={true}
                        />
                      )}
                    />
                  </FormItem>
                  <View style={styles.btn}>
                    <Button
                      title="下一步"
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

export default connector(ResetPassword);
