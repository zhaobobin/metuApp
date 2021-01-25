import React from 'react';
import {
  Appearance,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Navigator } from '@/utils/index';
import { GlobalStyles } from '@/theme/index';
import InsertLinkModal from './insert-link';
import EmojiView from './emoji';
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

const phizIcon = require('@/assets/editor/phiz.png');
const htmlIcon = require('@/assets/editor/h5.png');
const videoIcon = require('@/assets/editor/video.png');
const strikethrough = require('@/assets/editor/strikethrough.png');

interface IProps {
  theme: string;
  onChange: (html: string) => void;
}

interface IState {
  theme: string;
  contentStyle: any;
  emojiVisible: boolean;
  disabled: boolean;
}

class Editor extends React.Component<IProps, IState> {
  richText = React.createRef<RichEditor>();
  linkModal = React.createRef<InsertLinkModal>();

  constructor(props: IProps) {
    super(props);
    const that = this;
    const theme = props.theme || 'light';
    const contentStyle = that.createContentStyle(theme);
    that.state = {
      theme: theme,
      contentStyle,
      emojiVisible: false,
      disabled: false
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(this.themeChange);
    Keyboard.addListener('keyboardDidShow', this.onKeyBoard);
  }

  componentWillUnmount() {
    Appearance.removeChangeListener(this.themeChange);
    Keyboard.removeListener('keyboardDidShow', this.onKeyBoard);
  }

  onKeyBoard = () => {
    TextInput.State.currentlyFocusedField() &&
      this.setState({ emojiVisible: false });
  };

  editorInitializedCallback = () => {
    this.richText.current?.registerToolbar(function (items: any) {
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items
      );
    });
  };

  /**
   * theme change to editor color
   * @param colorScheme
   */
  themeChange = ({ colorScheme }: any) => {
    const theme = colorScheme;
    const contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  };

  /**
   * editor change data
   * @param {string} html
   */
  handleChange = (html: string) => {
    // console.log('editor data:', html);
    this.props.onChange(html);
  };

  /**
   * editor height change
   * @param {number} height
   */
  handleHeightChange = (height: number) => {
    // console.log('editor height change:', height);
  };

  insertEmoji = (emoji: string) => {
    this.richText.current?.insertText(emoji);
    this.richText.current?.blurContentEditor();
  };

  handleEmoji = () => {
    const { emojiVisible } = this.state;
    Keyboard.dismiss();
    this.richText.current?.blurContentEditor();
    this.setState({ emojiVisible: !emojiVisible });
  };

  insertVideo = () => {
    this.richText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4'
    );
  };

  insertHTML = () => {
    this.richText.current?.insertHTML(
      `<span style="color: blue; padding:0 10px;">HTML</span>`
    );
  };

  onPressAddImage = () => {
    // insert URL
    this.richText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png'
    );
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
    // this.richText.current?.blurContentEditor();
  };

  onInsertLink = () => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    this.linkModal.current?.setModalVisible(true);
  };

  onLinkDone = ({ title, url }: { title: string; url: string }) => {
    this.richText.current?.insertLink(title, url);
  };

  onBack = () => {
    Navigator.goBack();
  };

  createContentStyle = (theme: string) => {
    // Can be selected for more situations (cssText or contentCSSText).
    const contentStyle = {
      backgroundColor: '#000033',
      color: '#fff',
      placeholderTextColor: 'gray',
      // cssText: '#editor {background-color: #f3f3f3}', // initial valid
      contentCSSText: 'font-size: 16px; min-height: 200px;' // initial valid
    };
    if (theme === 'light') {
      contentStyle.backgroundColor = '#fff';
      contentStyle.color = '#000033';
      contentStyle.placeholderTextColor = '#a9a9a9';
    }
    return contentStyle;
  };

  onTheme = () => {
    let { theme } = this.state;
    theme = theme === 'light' ? 'dark' : 'light';
    let contentStyle = this.createContentStyle(theme);
    this.setState({ theme, contentStyle });
  };

  onDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  render() {
    let that = this;
    const { contentStyle, emojiVisible, disabled } = that.state;
    const { backgroundColor, color, placeholderTextColor } = contentStyle;
    const themeBg = { backgroundColor };
    // const initHTML = '<div><br/></div>';
    return (
      <View style={[styles.container, themeBg]}>
        <InsertLinkModal
          ref={that.linkModal}
          placeholderTextColor={placeholderTextColor}
          color={color}
          backgroundColor={backgroundColor}
          onDone={that.onLinkDone}
        />
        <View style={styles.richView}>
          <RichEditor
            ref={that.richText}
            // initialFocus={true}
            disabled={disabled}
            editorStyle={contentStyle} // default light style
            containerStyle={themeBg}
            style={themeBg}
            placeholder={'内容'}
            // initialContentHTML={initHTML}
            editorInitializedCallback={that.editorInitializedCallback}
            onChange={that.handleChange}
            onHeightChange={that.handleHeightChange}
            useContainer={false}
          />
        </View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar
            style={[styles.richBar, themeBg]}
            editor={that.richText}
            disabled={disabled}
            iconTint={color}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#8b8b8b'}
            onPressAddImage={that.onPressAddImage}
            onInsertLink={that.onInsertLink}
            insertEmoji={that.handleEmoji}
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
          {emojiVisible && <EmojiView onSelect={that.insertEmoji} />}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },
  richView: {
    height: GlobalStyles.screenHeight - 320
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF'
  },
  scroll: {
    backgroundColor: 'red'
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
    fontSize: 20
  }
});

export default Editor;
