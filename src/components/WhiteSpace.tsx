/**
 * 上下留白
 */
import React from 'react';
import { View } from 'react-native';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface WhiteSpaceProps {
  backgroundColor?: string;
  size?: Size;
}

const WhiteSpace: React.FC<WhiteSpaceProps> = React.memo(props => {
  const { size, backgroundColor = 'trannsparent' } = props;
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
  return <View style={{ height, backgroundColor }} />;
});

WhiteSpace.defaultProps = {
  size: 'md'
}

export default WhiteSpace;
