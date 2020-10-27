/**
 * CommontModal
 */
import React from 'react';
import { View, StyleSheet, Keyboard, KeyboardEvent } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { RootState } from '@/models/index';
import { IComment, ICommentModalResult } from '@/types/comment/CommentState';
import { Modal, Button } from '@/components/index';
import { FormItem, InputTextarea } from '@/components/Form/index';

interface FormValues {
  content: string;
}

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
  defaultValue?: string;
  onRef?: (ref: any) => void;
  callback: (res: ICommentModalResult) => void;
}

interface IState {
  visible: boolean;
  root_comment?: IComment;
  content: string;
  keyboardHeight: number;
}

export class CommentModalComponent extends React.Component<IProps, IState> {
  private keyboardDidShow: any;
  private keyboardDidHide: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      root_comment: undefined,
      content: props.defaultValue || '',
      keyboardHeight: 0
    };
  }

  componentWillMount() {
    this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardShow);
    this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardHide);
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove();
    this.keyboardDidHide.remove();
  }

  keyboardShow = (e: KeyboardEvent) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height
    });
  };

  keyboardHide = () => {
    this.setState({
      keyboardHeight: 0
    });
  };

  show = (item: IComment) => {
    this.setState({
      visible: true,
      root_comment: item
    });
  };

  hide = () => {
    this.setState({
      visible: false,
      root_comment: undefined
    });
  };

  onChange = (val: string) => {
    this.setState({
      content: val
    });
  };

  onSubmit = (values: FormValues) => {
    const { callback } = this.props;
    const { root_comment } = this.state;
    const payload: any = {
      ...values
    };
    if (root_comment) {
      payload.root_comment = root_comment;
    }
    callback(payload);
  };

  render() {
    const { visible, root_comment, content, keyboardHeight } = this.state;
    const initialValues = {
      content
    };
    return (
      <Modal
        popup
        maskClosable
        visible={visible}
        animationType="slide-up"
        onClose={this.hide}>
        <View style={styles.container}>
          <View style={styles.head}></View>
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
                        rows={4}
                        count={100}
                        value={content}
                        autoFocus={true}
                        placeholder={
                          root_comment
                            ? `回复: ${root_comment.author.nickname}`
                            : '发布评论'
                        }
                        onChange={this.onChange}
                        component={InputTextarea}
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
          <View style={{ height: keyboardHeight }}></View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  head: {
    height: 50
  },
  body: {},
  formItem: {
    width: '100%'
    // borderColor: GlobalStyles.color.border,
    // borderLeftWidth: StyleSheet.hairlineWidth,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderRightWidth: StyleSheet.hairlineWidth
  },
  btn: {
    marginTop: 20
  },
  foot: {}
});

export default connector(CommentModalComponent);
