import React from 'react';
import { Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import Icon, { IconNames } from '@/assets/iconfont';

function goBack() {
  Navigator.goBack();
}

interface IProps {
  name?: IconNames;
  size?: number;
  color?: string | string[];
}

const LeftBackButton: React.FC<IProps> = props => {
  const { name = 'icon-arrow-lift', size, color } = props;
  return (
    <Touchable onPress={goBack}>
      <Icon name={name} size={size} color={color} />
    </Touchable>
  );
};

LeftBackButton.defaultProps = {
  size: 30,
  color: '#fff'
};

export default LeftBackButton;
