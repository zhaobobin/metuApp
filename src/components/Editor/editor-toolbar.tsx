import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RichToolbar } from 'react-native-pell-rich-editor';

const phizIcon = require('@/assets/editor/phiz.png');
const htmlIcon = require('@/assets/editor/h5.png');
const videoIcon = require('@/assets/editor/video.png');
const strikethrough = require('@/assets/editor/strikethrough.png');

import { actions } from './const';

const defaultActions = [
  actions.setBold,
  actions.setItalic,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.heading1,
  actions.heading4,
  actions.insertImage,
  actions.insertEmoji
];

interface IEditorToolbarProps {
  editor?: any;
  disabled?: boolean;
  color?: string;
  onPressAddImage: () => void;
  onInsertLink: () => void;
  handleEmoji: () => void;
}

const EditorToolbar: React.FC<IEditorToolbarProps> = props => {
  const {
    editor,
    disabled,
    color,
    onPressAddImage,
    onInsertLink,
    handleEmoji
  } = props;
  return (
    <RichToolbar
      style={styles.richBar}
      editor={editor}
      disabled={disabled}
      iconTint={color}
      selectedIconTint={'#2095F2'}
      disabledIconTint={'#8b8b8b'}
      onPressAddImage={onPressAddImage}
      onInsertLink={onInsertLink}
      insertEmoji={handleEmoji}
      iconSize={40} // default 50
      actions={defaultActions}
      iconMap={{
        insertEmoji: phizIcon,
        [actions.setStrikethrough]: strikethrough,
        [actions.heading1]: ({ tintColor }) => (
          <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
        ),
        [actions.heading4]: ({ tintColor }) => (
          <Text style={[styles.tib, { color: tintColor }]}>H3</Text>
        ),
        insertHTML: htmlIcon,
        insertVideo: videoIcon
      }}
    />
  );
};

EditorToolbar.defaultProps = {
  disabled: false,
  color: '#fff'
};

const styles = StyleSheet.create({
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF'
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
    fontSize: 20
  }
});

export default EditorToolbar;
