/**
 * 首页TabBar容器
 */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Navigator } from '@/utils/index';
import Touchable from '@/components/Touchable';
import Icon from '@/assets/iconfont';

const mapStateToProps = (state: RootState) => ({
  carsouelActiveIndex: state.home.carsouelActiveIndex,
  gradientVisible: state.home.gradientVisible
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps &
  ModelState & {
    navigationState?: any;
  };

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

  goSearchPage = () => {
    Navigator.goPage('Search');
  };

  goCategory = () => {
    Navigator.goPage('Category');
  };

  render() {
    let {
      gradientVisible,
      indicatorStyle,
      inactiveTintColor,
      navigationState,
      ...restProps
    } = this.props;
    let textStyle = styles.blackText;
    let activeTintColor = '#333';
    if (navigationState.index !== 1) {
      gradientVisible = false;
    }
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      inactiveTintColor = '#333';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.whiteBackgroundColor
        );
      }
    }
    return (
      <View style={styles.container}>
        {navigationState.index === 1 && this.renderGradientColor}
        <View style={styles.searchWrapper}>
          <Touchable style={styles.input} onPress={this.goSearchPage}>
            <Text style={textStyle}>搜索</Text>
          </Touchable>
          <Touchable style={styles.searchBtn} onPress={this.goSearchPage}>
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
          <Touchable style={styles.more} onPress={this.goCategory}>
            <Icon name="icon-arrow-right" size={30} {...textStyle} />
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
  more: {
    paddingHorizontal: 10
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
