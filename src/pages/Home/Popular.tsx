import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import { IPhoto } from '@/types/CommonTypes';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';
import IconArrowRight from '@/assets/iconfont/IconArrowRight';

const mapStateToProps = (state: RootState) => ({
  popular: state.home.popular,
  loading: state.loading.effects['home/queryPopular']
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: (item: IPhoto) => void;
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

  refresh = () => {};

  onPressImage = (item: IPhoto) => {
    this.props.onPress(item);
  };

  renderItem = ({ item }: ListRenderItemInfo<IPhoto>) => {
    const { onPress } = this.props;
    return (
      <Touchable style={styles.item} onPress={() => onPress(item)}>
        <Image
          source={{ uri: item.thumb.url + '?x-oss-process=style/thumb' }}
          style={styles.image}
        />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  _keyExtractor = (item: IPhoto) => item._id;

  render() {
    const { popular } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.title}>
            <Text style={styles.titleText}>热门推荐</Text>
          </View>
          <View style={styles.more}>
            <Text style={styles.moreText}>更多</Text>
            <Icon name="iconarrow-right" color="#6f6f6f" />
          </View>
        </View>
        <View style={styles.body}>
          <FlatList
            numColumns={3}
            data={popular}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <Touchable style={styles.refresh} onPress={this.refresh}>
          <Text style={styles.refreshText}>换一批</Text>
        </Touchable>
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
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  title: {},
  titleText: {
    color: '#333'
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreText: {
    color: '#6f6f6f'
  },
  body: {
    padding: 10
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 8,
    alignItems: 'center'
  },
  image: {
    marginBottom: 5,
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  refresh: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  refreshText: {
    color: '#999'
  }
});

export default connector(Popular);
