import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Touchable } from '@/components/index';
import { Navigator } from '@/utils/index';
import Icon from '@/assets/iconfont';
import { GlobalStyles } from '@/theme/index';

interface IMenu {
  name: string;
  type: string;
  icon: string;
}

const Menus = [
  { name: '点赞', type: 'favor', icon: 'icon-favorites' },
  { name: '评论', type: 'comment', icon: 'icon-comments' },
  { name: '关注', type: 'follow', icon: 'icon-account' },
  { name: '收藏', type: 'collect', icon: 'icon-collection' },
  { name: '私信', type: 'mail', icon: 'icon-email' },
  { name: '通知', type: 'notify', icon: 'icon-remind' }
];

const MessageIndex = () => {
  const goMessageList = (item: IMenu) => {
    Navigator.goPage('MessageList', { name: item.name, type: item.type });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.menus}>
        {Menus.map((item, index) => (
          <Touchable
            key={index}
            onPress={() => goMessageList(item)}
            style={styles.menuItem}
            >
            <View style={styles.menuIcon}>
            <Icon name={item.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.menuText}>{item.name}</Text>
          </Touchable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  menus: {
    paddingVertical: 10,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  menuIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 20,
    backgroundColor: GlobalStyles.color.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuText: {
    fontSize: 16,
    color: '#333'
  }
});

export default MessageIndex;
