import React from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  ViewStyle
} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0; // 状态栏的高度
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 50;
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

type StatusBarShape = {
  //设置状态栏所接受的属性
  barStyle?: 'light-content' | 'default';
  hidden?: boolean;
  backgroundColor?: string;
};

interface NavigationBarProps {
  style?: ViewStyle;
  title: string;
  titleView?: React.ReactNode;
  titleLayoutStyle?: ViewStyle;
  hide?: boolean;
  statusBar?: StatusBarShape;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

const NavigationBar: React.FC<NavigationBarProps> = React.memo(props => {
  const getButtonElement = (data: React.ReactNode) => {
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  };

  const renderStatusBar = props.statusBar?.hidden ? null : (
    <View style={styles.statusBar}>
      <StatusBar {...props.statusBar} />
    </View>
  );

  const renderNavBar = props.hide ? null : (
    <View style={styles.navBar}>
      {getButtonElement(props.leftButton)}
      <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
        {props.titleView || (
          <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
            {props.title}
          </Text>
        )}
      </View>
      {getButtonElement(props.rightButton)}
    </View>
  );

  return (
    <View style={[styles.container, props.style]}>
      {renderStatusBar}
      {renderNavBar}
    </View>
  );
});

NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
    backgroundColor: '#fff'
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1890ff'
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT
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
  }
});

export default NavigationBar;
