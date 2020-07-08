import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RootState } from '@/models/index';

const mapStateToProps = (state: RootState) => ({
  isEdit: state.category.isEdit
});

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: () => void;
}

class HeaderRightButton extends React.Component<IProps> {
  render() {
    const { isEdit, onPress } = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '完成' : '编辑'} onPress={onPress} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightButton);
