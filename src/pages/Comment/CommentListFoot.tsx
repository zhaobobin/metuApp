/**
 * CommontListFoot
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '@/theme/index';
import { Button } from '@/components/index';

interface IProps {
  showCommentModal: () => void;
}

const CommontListFoot = (props: IProps) => {
  return (
    <View style={styles.foot}>
      <View style={styles.footView}>
        <Button title="发表评论" onPress={props.showCommentModal} type="primary" ghost />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foot: {
    height: GlobalStyles.bottomSpace + 50,
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
