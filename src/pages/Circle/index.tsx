import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({

});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Cricle extends React.Component<IProps> {

  render() {
    return (
      <View>
        <View>
          <Text>摄影大赛</Text>
        </View>
        <View>
          <Text>热门圈子</Text>
        </View>
        <View>
          <Text>兴趣圈子</Text>
        </View>
        <View>
          <Text>摄影学习圈子</Text>
        </View>
        <View>
          <Text>校园圈子</Text>
        </View>
        <View>
          <Text>地域圈子</Text>
        </View>
        <View>
          <Text>圈子动态</Text>
        </View>
      </View>
    );
  }
}

export default connector(Cricle);
