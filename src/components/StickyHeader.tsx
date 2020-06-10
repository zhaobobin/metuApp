/**
 * 滑动吸顶效果组件
 * @export
 * @class StickyHeader
 */
import React from 'react';
import { StyleSheet, Animated, LayoutChangeEvent } from 'react-native';

interface IProps {
  stickyHeaderY: number;
  stickyScrollY: Animated.Value;
  style?: StyleSheet.AbsoluteFillStyle;
}

interface IState {
  stickyLayoutY: number;
}

class StickyHeader extends React.Component<IProps, IState> {
  static defaultProps = {
    stickyHeaderY: -1,
    stickyScrollY: new Animated.Value(0)
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      stickyLayoutY: 0
    };
  }

  // 兼容代码，防止没有传头部高度
  _onLayout = (event: LayoutChangeEvent) => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y
    });
  };

  render() {
    const { stickyHeaderY, stickyScrollY, children, style } = this.props;
    const { stickyLayoutY } = this.state;
    let y = stickyHeaderY !== -1 ? stickyHeaderY : stickyLayoutY;
    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1]
    });

    return (
      <Animated.View
        onLayout={this._onLayout}
        style={[style, styles.container, { transform: [{ translateY }] }]}>
        {children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100
  }
});

export default StickyHeader;
