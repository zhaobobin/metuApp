import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@/navigator/AppNavigation';
import { Navigator, Storage, ENV } from '@/utils/index';
import { RootState } from '@/models/index';
import { IResponse } from '@/types/CommonTypes';
import { color, GlobalStyles } from '@/theme/index';

import ArticleDetailHead from './ArticleDetailHead';
import ArticleContent from './ArticleContent';
import ArticleDetailFoot from './ArticleDetailFoot';

const mapStateToProps = (state: RootState) => ({
  loading: state.loading.effects['article/queryArticleDetail'],
  articleDetail: state.article.articleDetail,
  isAuth: state.account.isAuth
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<AppStackParamList, 'ArticleDetail'>;
}

interface IState {
  isAuth: boolean;
  article_id: string;
}

class ArticleDetail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAuth: props.isAuth,
      article_id: props.articleDetail._id
    };
  }

  componentDidMount() {
    const { article_id } = this.props.route.params;
    this.getArticleDetail(article_id);
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.route.params.article_id !== prevState.article_id) {
      return {
        article_id: nextProps.route.params.article_id
      };
    }
    if (nextProps.isAuth !== prevState.isAuth) {
      return {
        isAuth: nextProps.isAuth
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (this.state.article_id !== prevState.article_id) {
      this.getArticleDetail(this.state.article_id);
    }
    if (this.state.isAuth !== prevState.isAuth) {
      this.getArticleState(this.props.articleDetail._id);
    }
  }

  getArticleDetail = (article_id: string) => {
    this.props.dispatch({
      type: 'article/queryArticleDetail',
      payload: {
        article_id
      }
    });
  };

  getArticleState = (article_id: string) => {
    this.props.dispatch({
      type: 'article/queryArticleState',
      payload: {
        article_id
      }
    });
  };

  updateArticleState = (payload: any) => {
    this.props.dispatch({
      type: 'article/updateArticleDetail',
      payload
    });
  };

  handleFollow = () => {
    if (this.state.isAuth) {
      const { articleDetail } = this.props;
      this.props.dispatch({
        type: 'user/followUser',
        payload: {
          user_id: articleDetail.author._id,
          following_state: articleDetail.following_state
        },
        callback: (res: IResponse) => {
          this.updateArticleState(res.data);
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleFavor = async () => {
    if (this.state.isAuth) {
      const { articleDetail } = this.props;
      this.props.dispatch({
        type: 'article/favorArticle',
        payload: {
          article_id: articleDetail._id,
          favoring_state: articleDetail.favoring_state
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleComment = () => {
    Navigator.goPage('CommentScreen', {
      id: this.props.articleDetail._id,
      type: 'articles'
    });
  };

  handleCollect = async () => {
    if (this.state.isAuth) {
      const { articleDetail } = this.props;
      this.props.dispatch({
        type: 'article/collectArticle',
        payload: {
          article_id: articleDetail._id,
          collecting_state: articleDetail.collecting_state
        }
      });
    } else {
      this.goLoginScreen();
    }
  };

  handleShare = () => {
    if (this.state.isAuth) {
    } else {
      this.goLoginScreen();
    }
  };

  handleNextArticle = () => {
    const { articleDetail } = this.props;
    this.props.dispatch({
      type: 'article/nextArticle',
      payload: {
        article_id: articleDetail._id
      }
    });
  };

  goLoginScreen = async () => {
    const route = {
      routeName: 'ArticleScreen',
      routeParam: {
        screen: 'ArticleDetail',
        params: { article_id: this.props.articleDetail._id, modal: true }
      }
    };
    await Storage.set(ENV.storage.loginRedirect, JSON.stringify(route));
    Navigator.goPage('LoginScreen');
  };

  goUserPage = (id: string) => {
    Navigator.goPage('UserDetail', { id });
  };

  goBack = () => {
    Navigator.goBack();
  };

  render() {
    const { loading, articleDetail, route } = this.props;
    if (loading) {
      return null;
    }
    console.log(articleDetail);
    return (
      <View style={styles.container}>
        <ScrollView>
          <ArticleDetailHead
            articleDetail={articleDetail}
            modal={route.params.modal}
            goBack={this.goBack}
            handleFollow={this.handleFollow}
          />
          <ArticleContent articleDetail={articleDetail} />
        </ScrollView>
        <View style={styles.foot}>
          <ArticleDetailFoot
            articleDetail={articleDetail}
            handleFavor={this.handleFavor}
            handleComment={this.handleComment}
            handleCollect={this.handleCollect}
            handleShare={this.handleShare}
            handleNextArticle={this.handleNextArticle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  head: {},
  body: {
    flex: 1
  },
  swiper: {
    flex: 1,
    backgroundColor: '#111'
  },
  foot: {
    width: GlobalStyles.screenWidth,
    height: GlobalStyles.bottomSpace + 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingBottom: GlobalStyles.bottomSpace,
    zIndex: 99,
    backgroundColor: 'rgba(255,255,255,.7)',
    borderColor: color.border,
    borderWidth: StyleSheet.hairlineWidth
  }
});

export default connector(ArticleDetail);
