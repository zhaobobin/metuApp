import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Touchable } from '@/components/index';
import { ICircleItem } from '@/types/CircleTypes';
import { GlobalStyles } from '@/theme/index'

const itemWidth = (GlobalStyles.screenWidth / 3) - 15;

interface IProps {
  item: ICircleItem;
  onPress: (circle_id: string) => void;
}

const CircleListItem: React.FC<IProps> = props => {
  const { item, onPress } = props;
  return (
    <View style={styles.container}>
      <Touchable style={styles.item} onPress={() => onPress(item._id)}>
      {item.avatar_url ? (
        <Image
          source={{ uri: item.avatar_url + '?x-oss-process=style/thumb' }}
          style={styles.image}
        />
      ) : null}
      <Text numberOfLines={2}>{item.name}</Text>
    </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemWidth,
    padding: 5
  },
  item: {
    height: '100%',
    backgroundColor: '#ddd',
    borderRadius: 3,
  },
  image: {},
  title: {}
});

export default CircleListItem;
