import React, { useState } from 'react';
import { Picker } from '@ant-design/react-native';
import { CascaderValue } from '@ant-design/react-native/lib/picker/cascader/CascaderTypes';

const data = require('@bang88/china-city-data');

interface CityPickerProps {
  title?: string;
  value?: CascaderValue;
  callback: (value: string) => void;
}

const CityPicker: React.FC<CityPickerProps> = props => {
  const { title, value } = props;

  const [currentValue, setValue] = useState(value);

  const onChange = (value: any) => {
    setValue(value);
    props.callback(value.join(','));
  };

  return (
    <Picker
      title={title}
      data={data}
      cols={3}
      value={currentValue}
      onChange={onChange}>
      {props.children}
    </Picker>
  );
};

CityPicker.defaultProps = {
  title: '选择居住地'
};

export default CityPicker;
