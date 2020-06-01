import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel from './Carsouel';

const mapStateToProps = (state: RootState) => ({
  home: state.home,
  loading: state.loading.effects['home/carsouel']
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

  componentDidMount() {
    this.getCarsouel();
  }

  getCarsouel = () => {
    this.props.dispatch({
      type: 'home/queryCarsouel'
    });
  }

  render() {

    const { home } = this.props;
    // console.log(home.carsouel)
    return (
      <View>
        <Text>Home</Text>
        <Button
          title="跳转到详情页"
          onPress={() => {
            this.props.navigation.navigate('Detail', { id: '123' });
          }}
        />
        <Carousel />
      </View>
    );
  }
}

export default connector(Home);
