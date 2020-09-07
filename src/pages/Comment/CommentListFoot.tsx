/**
 * CommontListFoot
 */
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from '@/assets/iconfont';
import { getBottomSpace } from '@/utils/index';
import { Touchable } from '@/components/index';

const bottomSpace = getBottomSpace();

interface IProps {
  
}

const CommontListFoot = (props: IProps) => {
  return (
    <View style={styles.foot}>
      <View style={styles.footView}>
        <Text>foot</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foot: {
    height: bottomSpace + 50,
    flexDirection: 'row',
    borderTopColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  footView: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CommontListFoot;
