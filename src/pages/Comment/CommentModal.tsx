/**
 * CommontModal
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { IComment } from '@/types/comment/CommentState';
import { Modal, Button } from '@/components/index';
import { FormItem, InputText } from '@/components/Form/index';

interface FormValues {
  content: string;
}

const initialValues = {
  content: ''
};

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .trim()
    .max(100, '评论长度不能大于100位')
    .required('请输入评论')
});

const mapStateToProps = (state: RootState) => ({
  currentUser: state.account.currentUser,
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onRef?: (ref: any) => void;
}

interface IState {
  visible: boolean;
  item?: IComment;
}

export class CommentModalComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      item: undefined
    };
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  show = (item: IComment) => {
    this.setState({
      visible: true,
      item
    });
  };

  hide = () => {
    this.setState({
      visible: true,
      item: undefined
    });
  };

  onSubmit = (values: FormValues) => {
    this.submitComment(values);
  };

  submitComment = (values: FormValues) => {
    const payload: any = {
      ...values
    };
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal
        popup
        visible={visible}
        animationType="slide-up"
        onClose={this.hide}>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text>回复评论</Text>
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
                        name="content"
                        placeholder="评论"
                        component={InputText}
                      />
                    </FormItem>
                    <View style={styles.btn}>
                      <Button
                        title="发布"
                        type="primary"
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  head: {
    height: 50
  },
  body: {},
  formItem: {

  },
  btn: {

  }
});

export default connector(CommentModalComponent);
