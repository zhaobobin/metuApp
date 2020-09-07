/**
 * CommontListHead
 */
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Icon from '@/assets/iconfont';
import { Touchable } from '@/components/index';

interface IProps {
  count?: number;
  goBack: () => void;
}

const CommontListHead = (props: IProps) => {
  const { count, goBack } = props;
  return (
    <View style={styles.head}>
      <View style={styles.back}>
        <Touchable onPress={goBack} activeOpacity={1}>
          <Icon
            name="icon-arrow-down"
            size={30}
            color="#666"
            style={styles.headerBackImage}
          />
        </Touchable>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{count} 条评论</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 50,
    flexDirection: 'row',
    position: 'relative',
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  back: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9
  },
  title: {
    flex: 1,
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    color: '#333'
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8
  }
});

export default CommontListHead;
