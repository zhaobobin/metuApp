import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Search extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}

export default connector(Search);
