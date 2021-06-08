import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Touchable } from '@/components/index';
import { ICircleItem } from '@/types/CircleTypes';
import { GlobalStyles } from '@/theme/index';

const itemWidth = GlobalStyles.screenWidth;
const itemPadding = 5;
const imageWidth = itemWidth - itemPadding * 2;
const imageHeight = imageWidth / 2;

interface IProps {
  item: ICircleItem;
  onPress: (circle_id: string) => void;
}

const CircleListItemCard: React.FC<IProps> = props => {
  const { item, onPress } = props;
  return (
    <View style={styles.container}>
      <Touchable style={styles.item} onPress={() => onPress(item._id)}>
        <View style={styles.imageView}>
          {item.avatar_url ? (
            <Image source={{ uri: item.avatar_url }} style={styles.image} />
          ) : (
            <Image
              source={require('@/assets/com/logo.png')}
              style={styles.icon}
            />
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
          <Text style={styles.member} numberOfLines={1}>{item.member_number}人加入</Text>
          <Text style={styles.photo} numberOfLines={1}>{item.photo_number}组作品</Text>
        </View>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemWidth - 50,
    padding: itemPadding
  },
  item: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: GlobalStyles.color.border,
    overflow: 'hidden'
  },
  imageView: {
    width: imageWidth,
    height: imageHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.color.background
  },
  image: {
    width: imageWidth,
    height: imageHeight
  },
  icon: {
    width: 30,
    height: 30
  },
  info: {
    padding: 10
  },
  name: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: '#333'
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
    color: '#666'
  },
  member: {
    marginBottom: 5,
    fontSize: 12,
    color: '#666'
  },
  photo: {
    fontSize: 12,
    color: '#666'
  }
});

export default CircleListItemCard;
