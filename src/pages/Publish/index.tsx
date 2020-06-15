import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  // navigation: AppStackNavigation;
}

class Publish extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Publish</Text>
      </View>
    );
  }
}

export default connector(Publish);
