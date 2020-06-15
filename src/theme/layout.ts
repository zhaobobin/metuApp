import { StyleSheet } from 'react-native';

export const layout = {
  margin: function (...arg: number[]) {
    let margin = {};
    switch (arg.length) {
      case 1:
        margin = {
          marginTop: arg[0],
          marginRight: arg[0],
          marginBottom: arg[0],
          marginLeft: arg[0]
        };
        break;
      case 2:
        margin = {
          marginVertical: arg[0],
          marginHorizontal: arg[1]
        };
        break;
      case 3:
        margin = {
          marginTop: arg[0],
          marginHorizontal: arg[1],
          marginBottom: arg[2]
        };
        break;
      case 4:
        margin = {
          marginTop: arg[0],
          marginRight: arg[1],
          marginBottom: arg[2],
          marginLeft: arg[3]
        };
        break;
      default:
        break;
    }
    return margin;
  },

  padding: function (...arg: number[]) {
    let padding = {};
    switch (arg.length) {
      case 1:
        padding = {
          paddingTop: arg[0],
          paddingRight: arg[0],
          paddingBottom: arg[0],
          paddingLeft: arg[0]
        };
        break;
      case 2:
        padding = {
          paddingVertical: arg[0],
          paddingHorizontal: arg[1]
        };
        break;
      case 3:
        padding = {
          paddingTop: arg[0],
          paddingHorizontal: arg[1],
          paddingBottom: arg[2]
        };
        break;
      case 4:
        padding = {
          paddingTop: arg[0],
          paddingRight: arg[1],
          paddingBottom: arg[2],
          paddingLeft: arg[3]
        };
        break;
      default:
        break;
    }
    return padding;
  },

  border: function ({
    direction = 'all',
    width = StyleSheet.hairlineWidth,
    style = 'solid',
    color = '#ddd',
    radius = 0
  }) {
    let border = {};
    switch (direction) {
      case 'all':
        border = { borderWidth: width };
        break;
      case 'left':
        border = { borderLeftWidth: width };
        break;
      case 'top':
        border = { borderTopWidth: width };
        break;
      case 'right':
        border = { borderRightWidth: width };
        break;
      case 'bottom':
        border = { borderBottomWidth: width };
        break;
      default:
        break;
    }
    return {
      ...border,
      borderStyle: style,
      borderColor: color,
      borderRadius: radius
    };
  }
};
