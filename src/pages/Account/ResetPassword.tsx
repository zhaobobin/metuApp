import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';

const mapStateToProps = (state: RootState) => ({
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class ResetPassword extends React.Component<IProps> {

  goBack = () => {
    Navigator.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>ResetPassword</Text>
        <Button title="返回" onPress={this.goBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connector(ResetPassword);
