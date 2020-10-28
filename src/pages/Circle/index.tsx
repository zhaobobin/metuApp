import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ListRenderItemInfo
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { MainStackNavigation } from '@/navigator/MainNavigation';
import { RootState } from '@/models/index';
import { Navigator } from '@/utils/index';
import { SearchNavBar, Touchable } from '@/components/index';
import { ICircleType, ICircleItem } from '@/types/CircleTypes';
import CircleListItem from './CircleListItem';

const mapStateToProps = (state: RootState) => ({
  circleList: state.circle.circleList
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: MainStackNavigation;
}

class Circle extends React.Component<IProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'circle/queryCircleList',
      payload: {}
    });
  }

  _keyExtractor = (item: ICircleItem) => item._id;

  renderItem = ({ item }: ListRenderItemInfo<ICircleItem>) => {
    return (
      <CircleListItem item={item} onPress={this.goCircleDetail} />
    );
  };

  goCircleList = (type?: ICircleType) => {
    Navigator.goPage('CircleList', { type });
  }

  goCircleDetail = (circle_id: string) => {
    console.log(circle_id)
    Navigator.goPage('CircleDetail', { circle_id });
  }

  render() {
    const { circleList } = this.props;
    return (
      <View style={styles.container}>
        <SearchNavBar type="circle" placeholder="搜索圈子" />
        <ScrollView style={styles.body}>

          <View style={styles.section}>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>热门圈子</Text>
              <Touchable onPress={() => this.goCircleList('popular')}>
                <Text style={styles.moreText}>查看更多</Text>
              </Touchable>
            </View>
            <FlatList
              data={circleList}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>兴趣圈子</Text>
              <Touchable onPress={() => this.goCircleList('interest')}>
                <Text style={styles.moreText}>查看更多</Text>
              </Touchable>
            </View>
          </View>

          <View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>学习圈子</Text>
              <Touchable onPress={() => this.goCircleList('study')}>
                <Text style={styles.moreText}>查看更多</Text>
              </Touchable>
            </View>
          </View>

          <View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>地域圈子</Text>
              <Touchable onPress={() => this.goCircleList('region')}>
                <Text style={styles.moreText}>查看更多</Text>
              </Touchable>
            </View>
          </View>

          <View>
            <View style={styles.subTitle}>
              <Text style={styles.subTitleText}>圈子动态</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  section: {
    marginBottom: 20
  },
  subTitle: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subTitleText: {
    fontSize: 14,
    color: '#333'
  },
  moreText: {
    fontSize: 12,
    color: '#999'
  }
});

export default connector(Circle);
