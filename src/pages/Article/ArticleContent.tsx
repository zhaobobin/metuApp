import { IArticleDetail } from '@/types/CommonTypes';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

interface IProps {
  articleDetail: IArticleDetail;
}

class ArticleContent extends React.Component<IProps> {
  render() {
    const { articleDetail } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{articleDetail.title}</Text>
        </View>
        <HTMLView value={articleDetail.content} stylesheet={styles} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    marginBottom: 20,
    paddingVertical: 15
  },
  titleText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold'
  },
  a: {
    fontWeight: '300',
    color: '#FF3366'
  }
});

export default ArticleContent;
