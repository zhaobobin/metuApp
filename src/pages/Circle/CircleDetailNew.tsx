import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  circleId: string;
}

class CircleDetailNew extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>CircleDetailNew</Text>
      </View>
    );
  }
}

export default connector(CircleDetailNew);
