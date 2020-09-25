import React from 'react';
import { Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@/models/index';

const Title = {
  article: '发布文章',
  photo: '发布照片',
}

const mapStateToProps = (state: RootState) => ({
  publishType: state.publish.publishType
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HeaderTitle extends React.Component<IProps> {
  render() {
    const { publishType } = this.props;
    return (
      <Text style={{ fontSize: 16, color: '#444' }}>
        {publishType ? Title[publishType] : '发布'}
      </Text>
    );
  }
}

export default connector(HeaderTitle);
