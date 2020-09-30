import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const EmojiView = (props: any) => {
  const { onSelect } = props;
  return (
    <View style={styles.view}>
      <Text style={styles.item} onPress={() => onSelect('😃')}>
        😃
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😄')}>
        😄
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😁')}>
        😁
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😆')}>
        😆
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😅')}>
        😅
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😂')}>
        😂
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤣')}>
        🤣
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😊')}>
        😊
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😇')}>
        😇
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🙂')}>
        🙂
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🙃')}>
        🙃
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😉')}>
        😉
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😌')}>
        😌
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😍')}>
        😍
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🥰')}>
        🥰
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😘')}>
        😘
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😗')}>
        😗
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😙')}>
        😙
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😚')}>
        😚
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😋')}>
        😋
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😛')}>
        😛
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😝')}>
        😝
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😜')}>
        😜
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤪')}>
        🤪
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤨')}>
        🤨
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🧐')}>
        🧐
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤓')}>
        🤓
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😎')}>
        😎
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤩')}>
        🤩
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🥳')}>
        🥳
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😏')}>
        😏
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😒')}>
        😒
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😞')}>
        😞
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😔')}>
        😔
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😟')}>
        😟
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😕')}>
        😕
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🙁')}>
        🙁
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😣')}>
        😣
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😖')}>
        😖
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😫')}>
        😫
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😩')}>
        😩
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🥺')}>
        🥺
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😢')}>
        😢
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😭')}>
        😭
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😤')}>
        😤
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😠')}>
        😠
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😡')}>
        😡
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤬')}>
        🤬
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤯')}>
        🤯
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😳')}>
        😳
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🥵')}>
        🥵
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🥶')}>
        🥶
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😱')}>
        😱
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😨')}>
        😨
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😰')}>
        😰
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😥')}>
        😥
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😓')}>
        😓
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤗')}>
        🤗
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤔')}>
        🤔
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤭')}>
        🤭
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤫')}>
        🤫
      </Text>
      <Text style={styles.item} onPress={() => onSelect('🤥')}>
        🤥
      </Text>
      <Text style={styles.item} onPress={() => onSelect('😶')}>
        😶
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: Math.min(Dimensions.get('window').width, 32 * 12)
  },
  item: {
    // height: 25,
    // width: 25,
    fontSize: 20,
    paddingHorizontal: 3,
    paddingVertical: 5
  }
});

export default EmojiView;
