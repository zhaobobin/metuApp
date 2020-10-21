#### 项目初始化
```
npx react-native init metuApp --template react-native-template-typescript
```


#### 项目图标库
1、初始化配置
```
npx iconfont-init
```
配置
```
{
    "symbol_url": "http://at.alicdn.com/t/font_1851472_z3m0g7kqao.js",
    "use_typescript": true,
    "save_dir": "./src/assets/iconfont",
    "trim_icon_prefix": "",
    "default_icon_size": 18,
    "summary_component_name": "Icon"
}
```

2、生成图标
```
npx iconfont-rn
```

#### 如何彻底清除缓存，重新编译项目？
```
cd path/to/project
rm -rf ~/.rncache
rm package-lock.json
sudo rm $TMPDIR/*
sudo rm -rf $TMPDIR/*
watchman watch-del-all
watchman watch-del-all
rm yarn.lock
rm -rf node_modules/
rm -rf ios/build
#install node_modules
yarn 
react-native link
cd ios
rm -Rf Pods
rm Podfile.lock
rm -Rf youriosproject.xcworkspace
pod install
#run simulator
cd ..
react-native run-ios
```

### 发布

#### 安卓签名
cd android/app
```
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### 安卓打包
```
// 添加依赖
yarn add react-native-upload -D

// 初始化
npx upload-init

// 打包
npx upload-build --no-ios

// 打包并上传
npx upload-pgy --no-ios -apk=v7a
```
or

```
yarn build

yarn build:android

yarn build:ios
```

#### react-navigation TransitionPresets 动画

1、PhotoDetail: ScaleFromCenterAndroid

2、CommentList: ModalPresentationIOS

3、Login: ModalSlideFromBottomIOS


### 常见问题

##### [aliyun-oss-react-native] android打包时报 `verifyReleaseResources`

解决方案如下:

1.首先在 node_modules 中找到报错的包里面的build.gradle，比如我这个就是 \node_modules\aliyun-oss-react-native\android\build.gradle
2.修改这个 build.gradle，使其与 android/build.gradle 里面的SDK版本保持一致
3.将 build.gradle 里的 compile 改为 implementation，因为 compile 已过时

修改结果为:
```
android {
    compileSdkVersion 28
    buildToolsVersion "28.0.3"

    // ...
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation 'com.facebook.react:react-native:+'
}
```

##### Xcode升级12后，ReactNative ios14看不见图片(静态图片和网络图片)

方法一、修改node_modules中react-native/Libraries/Image/RCTUIImageViewAnimates.m文件

```
if (_currentFrame) { // line 275
    layer.contentsScale = self.animatedImageScale;
    layer.contents = (__bridge id)_currentFrame.CGImage;
} else { // add
    [super displayLayer:layer]
}
```

方法二、升级reactNative版本,大于或者等于0.63版本

    此方法不建议采用，可能会影响项目中其他第三方库