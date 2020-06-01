import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/photo/IPhoto';
import Touchable from '@/components/Touchable';

const mapStateToProps = (state: RootState) => ({
  popular: state.home.popular,
  loading: state.loading.effects['home/carsouel']
});

const connector = connect(mapStateToProps);

type IProps = ConnectedProps<typeof connector>;

interface IRenderItem {
  item: IPhoto;
}

class Popular extends React.Component<IProps> {
  componentDidMount() {
    this.getPopular();
  }

  getPopular = async () => {
    this.props.dispatch({
      type: 'home/queryPopular'
    });
  };

  renderItem = ({ item }: IRenderItem) => {
    return (
      <Touchable style={styles.item} onPress={this.onPressImage}>
        <Image source={{ uri: item.thumb.url }} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  onPressImage = () => {};

  render() {
    const { popular } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          data={popular}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: 'center'
  },
  image: {
    marginBottom: 5,
    width: '100%',
    height: 100,
    borderRadius: 8
  }
});

export default connector(Popular);
