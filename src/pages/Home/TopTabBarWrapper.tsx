import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import {
  MaterialTopTabBar,
  MaterialTopTabBarOptions
} from '@react-navigation/material-top-tabs';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';

const mapStateToProps = (state: RootState) => ({
  carsouelActiveIndex: state.home.carsouelActiveIndex,
  gradientVisible: state.home.gradientVisible
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarOptions & ModelState;

const gradientColor = [
  ['#a1c4fd', '#c2e9fb'],
  ['#fa709a', '#fee140'],
  ['#a18cd1', '#fbc2eb'],
  ['#e0c3fc', '#8ec5fc'],
  ['#fff1eb', '#ace0f9']
];

class TopTabBarWrapper extends React.Component<IProps> {
  // tabBar 渐变色背景
  get renderGradientColor() {
    const { carsouelActiveIndex, gradientVisible } = this.props;
    if (gradientVisible) {
      return (
        <LinearAnimatedGradientTransition
          colors={gradientColor[carsouelActiveIndex]}
          style={styles.gradient}
        />
      );
    }
    return null;
  }

  render() {
    let { gradientVisible, indicatorStyle, ...restProps } = this.props;
    let textStyle = styles.blackText;
    let activeTintColor = '#333';
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.whiteBackgroundColor
        );
      }
    }
    return (
      <View style={styles.container}>
        {this.renderGradientColor}
        <View style={styles.searchWrapper}>
          <Touchable style={styles.input}>
            <Text style={textStyle}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索</Text>
          </Touchable>
        </View>
        <View style={styles.tabBarWrapper}>
          <MaterialTopTabBar
            {...restProps}
            indicatorStyle={indicatorStyle}
            activeTintColor={activeTintColor}
            style={styles.tabbar}
          />
          <Touchable style={styles.category}>
            <Text style={textStyle}>分类</Text>
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
    height: 355
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
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  input: {
    flex: 1,
    paddingLeft: 15,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  inputText: {
    opacity: 0.3
  },
  searchBtn: {
    paddingLeft: 24
  },
  blackText: {
    color: '#333'
  },
  whiteText: {
    color: '#fff'
  },
  whiteBackgroundColor: {
    backgroundColor: '#fff'
  }
});

export default connector(TopTabBarWrapper);
