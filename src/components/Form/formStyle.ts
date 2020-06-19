import { StyleSheet } from 'react-native';
import { color, layout } from '@/theme/index';

const styles = StyleSheet.create({
  formItem: {
    ...layout.margin(0, 10, 0, 0)
  },
  inputView: {
    height: 64,
    position: 'relative'
  },
  input: {
    ...layout.padding(0),
    height: 44,
    fontSize: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.border
  },
  close: {
    position: 'absolute',
    left: 10,
    right: 10
  },
  error: {
    ...layout.margin(10, 0, 0, 0),
    height: 20
  },
  errorText: {
    color: 'red'
  },
  clear: {},

  psdLevelError: {

  },
  psdLevelMiddle: {

  },
  psdLevelStrong: {

  }
});

export default styles;
