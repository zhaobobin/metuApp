import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '@/assets/iconfont';
import { Touchable, UserinfoBar } from '@/components/index';
import { IArticleDetail } from '@/types/CommonTypes';

interface IProps {
  articleDetail: IArticleDetail;
  modal?: boolean;
  goBack: () => void;
  handleFollow: () => void;
}

const ArticleDetailHead = (props: IProps) => {
  const { articleDetail, modal, goBack, handleFollow } = props;
  return (
    <View style={styles.container}>
      <View style={styles.headBack}>
        {modal && (
          <Touchable onPress={goBack}>
            <Icon name="icon-close" size={30} color="#fff" />
          </Touchable>
        )}
      </View>
      <View style={styles.headCenter}>
        <UserinfoBar
          userInfo={articleDetail.author}
          following_state={articleDetail.following_state}
          handleFollow={handleFollow}
        />
      </View>
      <View style={styles.headRight}>
        <Icon name="icon-ellipsis" size={30} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headBack: {
    // marginHorizontal: Platform.OS === 'android' ? 0 : 8
  },
  headCenter: {
    flex: 1,
    paddingHorizontal: 20
  },
  headRight: {}
});

export default ArticleDetailHead;
