import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'CircleDetail'>;
}

class CircleDetail extends React.Component<IProps> {
  render() {
    const { route } = this.props;
    return (
      <View>
        <Text>{route.params.circle_id}</Text>
      </View>
    );
  }
}

export default connector(CircleDetail);
