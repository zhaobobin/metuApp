import React from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  StyleProp
} from 'react-native';

const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 50;
const STATUS_BAR_HEIGHT = Platform.OS !== 'ios' ? 0 : 20; //状态栏的高度
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

type StatusBarShape = {
  //设置状态栏所接受的属性
  barStyle: 'light-content' | 'default';
  hidden?: boolean;
  backgroundColor?: string;
};

interface NavigationBarProps {
  style: StyleProp<any>;
  title: string;
  titleView: React.ReactNode;
  titleLayoutStyle: StyleProp<any>;
  hide: boolean;
  statusBar: StatusBarShape;
  rightButton: React.ReactNode;
  leftButton: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = React.memo(props => {
  const getButtonElement = (data: any) => {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  };
  const statusBar = !props.statusBar.hidden ? (
    <View style={styles.statusBar}>
      <StatusBar {...props.statusBar} />
    </View>
  ) : null;

  let titleView = props.titleView ? (
    props.titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {props.title}
    </Text>
  );

  let content = props.hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(props.leftButton)}
      <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
        {titleView}
      </View>
      {getButtonElement(props.rightButton)}
    </View>
  );

  return (
    <View style={[styles.container, props.style]}>
      {statusBar}
      {content}
    </View>
  );
});

NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1890ff'
  },
  navBarButton: {
    alignItems: 'center'
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NAV_BAR_HEIGHT
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
  }
});

export default NavigationBar;
