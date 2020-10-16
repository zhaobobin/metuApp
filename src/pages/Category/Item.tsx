import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color, GlobalStyles } from '@/theme/index';
import { ICategory } from '@/models/category';
import Icon from '@/assets/iconfont';

export const parentWidth = GlobalStyles.screenWidth - 20;
export const itemWidth = parentWidth / 4;
export const itemHeight = 50;

interface IProps {
  type: 'myCategory' | 'categorys';
  data: ICategory;
  isEdit: boolean;
  disabled?: boolean;
}

class CategoryItem extends React.Component<IProps> {
  render() {
    const { type, data, isEdit, disabled } = this.props;
    return (
      <View style={styles.item}>
        <View style={styles.itemWrapper}>
          <Text
            style={[
              styles.itemText,
              isEdit && disabled && styles.disabled
            ]}>
            {data.name}
          </Text>
          {isEdit && type === 'myCategory' && disabled !== true ? (
            <View style={styles.icon}>
              <Icon name="icon-close" size={14} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: itemWidth,
    height: itemHeight
  },
  itemWrapper: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    position: 'relative'
  },
  disabled: {
    color: color.gray
  },
  itemText: {
    color: color.c333
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: -8,
    top: -8,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    borderRadius: 10
  }
});

export default CategoryItem;
