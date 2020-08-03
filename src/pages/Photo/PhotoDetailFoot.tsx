import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import {
  Navigator,
  getStatusBarHeight,
  getBottomSpace,
  screenWidth
} from '@/utils/index';
import { Touchable } from '@/components/index';

import Icon from '@/assets/iconfont';
import { RootState } from '@/models/index';

export const itemWidth = (screenWidth - 20) / 5;
export const itemHeight = 50;

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PhotoDetailFoot extends React.Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper}>
            <View style={styles.iconView}>
              <Icon name="icon-favorites" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>喜欢</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper}>
            <View style={styles.iconView}>
              <Icon name="icon-favorites" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>评论</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper}>
            <View style={styles.iconView}>
              <Icon name="icon-favorites" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>收藏</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper}>
            <View style={styles.iconView}>
              <Icon name="icon-favorites" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>分享</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.item}>
          <Touchable style={styles.itemWrapper}>
            <View style={styles.iconView}>
              <Icon name="icon-favorites" size={30} color="#fff" />
            </View>
            <View style={styles.textView}>
              <Text style={styles.footText}>下一组</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  item: {
    width: itemWidth,
    height: itemHeight
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footText: {
    color: '#fff',
    fontSize: 12
  }
});

export default connector(PhotoDetailFoot);
