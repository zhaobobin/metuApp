import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  home: state.home,
  loading: state.loading.effects['home/add']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

// @connect((state => ({
//   home: state.home,
//   loading: state.loading.effects['home/add']
// }))
class Home extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Text>{this.props.home.num}</Text>
        <Button
          title="add"
          onPress={() => {
            this.props.dispatch({
              type: 'home/add',
              payload: {
                num: 1
              }
            });
          }}
        />
        <Button
          title="跳转到详情页"
          onPress={() => {
            this.props.navigation.navigate('Detail', { id: '123' });
          }}
        />
      </View>
    );
  }
}

export default connector(Home);
