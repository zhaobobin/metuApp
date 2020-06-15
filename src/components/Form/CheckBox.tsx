/**
 * CheckBox
 */
import React from 'react';
import CheckBox from 'react-native-check-box';

interface IProps {
  label: string;
  checked?: boolean;
  onClick: () => void;
}

export default (props: IProps) => {
  return (
    <CheckBox
      onClick={props.onClick}
      isChecked={props.checked || false}
      rightText={props.label || 'CheckBox'}
      checkBoxColor="#1890ff"
      rightTextStyle={{
        marginLeft: 5
      }}
    />
  );
};
