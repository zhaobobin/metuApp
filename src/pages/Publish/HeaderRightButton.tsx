import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RootState } from '@/models/index';

const Title = {
  article: '发布文章',
  photo: '发布照片',
}

const mapStateToProps = (state: RootState) => ({
  publishType: state.publish.publishType,
  formValidate: state.publish.formValidate
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: () => void;
}

class HeaderRightButton extends React.Component<IProps> {
  render() {
    const { publishType, formValidate, onPress } = this.props;
    return (
      <HeaderButtons>
        {
          publishType &&
          <Item title={Title[publishType]} onPress={onPress} />
        }
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightButton);
