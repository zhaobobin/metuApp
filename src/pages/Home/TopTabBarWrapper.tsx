import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import {
  MaterialTopTabBar,
  MaterialTopTabBarOptions
} from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';

const mapStateToProps = (state: RootState) => ({
  carsouelActiveIndex: state.home.carsouelActiveIndex
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarOptions & ModelState;

const gradientColor = [
  ['#ddd', '#e2e2e2'],
  ['pink', '#fff'],
  ['blue', 'red'],
  ['green', 'blue'],
  ['red', 'blue']
];

class TopTabBarWrapper extends React.Component<IProps> {

  // tabBar 渐变色背景
  get renderGradientColor() {
    const { carsouelActiveIndex } = this.props;
    return (
      <LinearGradient
        colors={gradientColor[carsouelActiveIndex]}
        style={styles.gradient}
      />
    );
  }

  render() {
    const { props } = this;
    return (
      <View style={styles.container}>
        {this.renderGradientColor}
        <View style={styles.tabBarWrapper}>
          <MaterialTopTabBar {...props} style={styles.tabbar} />
          <Touchable style={styles.category}>
            <Text style={styles.categoryText}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.searchWrapper}>
          <Touchable style={styles.searchBtn}>
            <Text style={styles.searchText}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>搜索</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#fff'
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 280
  },
  tabBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabbar: {
    flex: 1,
    elevation: 0,
    shadowOpacity: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  category: {
    paddingHorizontal: 10,
    borderLeftColor: '#ccc',
    borderLeftWidth: StyleSheet.hairlineWidth
  },
  categoryText: {
    color: '#333'
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 15,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  searchText: {
    color: '#999'
  },
  historyBtn: {
    paddingLeft: 24
  }
});

export default connector(TopTabBarWrapper);
