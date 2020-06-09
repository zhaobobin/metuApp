import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation?: RootStackNavigation;
}

class UserArticles extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>UserArticles</Text>
      </View>
    );
  }
}

export default connector(UserArticles);
