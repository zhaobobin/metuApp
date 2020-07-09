/**
 * 上下留白
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface WhiteSpaceProps {
  backgroundColor?: string;
  size?: Size;
  text?: string;
}

const WhiteSpace: React.FC<WhiteSpaceProps> = React.memo(props => {
  const { size, backgroundColor, text } = props;
  let height = 10;
  switch (size) {
    case 'xs':
      height = 3;
      break;
    case 'sm':
      height = 6;
      break;
    case 'md':
      height = 10;
      break;
    case 'lg':
      height = 15;
      break;
    case 'xl':
      height = 20;
      break;
    case 'xxl':
      height = 30;
      break;
    default:
      break;
  }
  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
});

WhiteSpace.defaultProps = {
  backgroundColor: 'trannsparent',
  size: 'md'
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    justifyContent: 'center'
  },
  text: {
    fontSize: 12,
    color: 'rgb(136, 136, 136)'
  }
})

export default WhiteSpace;
