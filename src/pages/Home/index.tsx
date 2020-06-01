import React from 'react';
import { View, Button } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootStackNavigation } from '@/navigator/index';
import { RootState } from '@/models/index';
import Carousel from './Carsouel';
import Popular from './Popular';

const mapStateToProps = (state: RootState) => ({
  carsouel: state.home.carsouel,
  loading: state.loading.effects['home/queryCarsouel']
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

    const { carsouel } = this.props;

    return (
      <View>
        <Carousel carsouel={carsouel} />
        <Popular />
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
