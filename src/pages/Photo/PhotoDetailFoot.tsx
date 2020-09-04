import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screenWidth } from '@/utils/index';
import Icon from '@/assets/iconfont';
import { IPhotoDetail } from '@/types/CommonTypes';
import { Touchable } from '@/components/index';

export const itemWidth = (screenWidth - 20) / 5;
export const itemHeight = 50;

interface IProps {
  photoDetail: IPhotoDetail;
  handleFavor: () => void;
  handleComment: () => void;
  handleCollect: () => void;
  handleShare: () => void;
  handleNextPhotos: () => void;
}

const PhotoDetailFoot = (props: IProps) => {
  const {
    photoDetail,
    handleFavor,
    handleComment,
    handleCollect,
    handleShare,
    handleNextPhotos
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Touchable style={styles.itemWrapper} onPress={handleFavor}>
          <View style={styles.iconView}>
            <Icon
              name={
                photoDetail.favoring_state
                  ? 'icon-favorites-fill'
                  : 'icon-favorites'
              }
              size={30}
              color="#fff"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.footText}>喜欢</Text>
          </View>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable style={styles.itemWrapper} onPress={handleComment}>
          <View style={styles.iconView}>
            <Icon name="icon-comments" size={30} color="#fff" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.footText}>评论</Text>
          </View>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable style={styles.itemWrapper} onPress={handleCollect}>
          <View style={styles.iconView}>
            <Icon
              name={
                photoDetail.collecting_state
                  ? 'icon-collection-fill'
                  : 'icon-collection'
              }
              size={30}
              color="#fff"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.footText}>收藏</Text>
          </View>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable style={styles.itemWrapper} onPress={handleShare}>
          <View style={styles.iconView}>
            <Icon name="icon-share" size={30} color="#fff" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.footText}>分享</Text>
          </View>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable style={styles.itemWrapper} onPress={handleNextPhotos}>
          <View style={styles.iconView}>
            <Icon name="icon-double-arro-right" size={30} color="#fff" />
          </View>
          <View style={styles.textView}>
            <Text style={styles.footText}>下一组</Text>
          </View>
        </Touchable>
      </View>
    </View>
  );
};

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
    marginHorizontal: 5,
    position: 'relative'
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15
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

export default PhotoDetailFoot;
