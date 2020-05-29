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