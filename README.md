# 表白页面合并说明

## 文件说明

已成功创建以下文件：
- `index.html` - 主页面（可以成为我的恋人吗）
- `style.css` - 主页面样式
- `script.js` - 主页面脚本（点击"可以"后跳转到冬日界面）
- `winter.html` - 冬日飘字界面
- `winter.css` - 冬日界面样式
- `winter.js` - 冬日界面脚本

## 需要手动复制的资源文件

由于系统编码问题，请手动复制以下文件到 `biaobai` 文件夹：

### 1. 复制 heart.png
从：`可以成为我的恋人吗\heart.png`
到：`可以成为我的恋人吗\biaobai\heart.png`

### 2. 复制 images 文件夹
从：`可以成为我的恋人吗\images\` 文件夹中的所有图片
到：`可以成为我的恋人吗\biaobai\images\`

需要的图片：
- angry.png
- crying.png
- hug.png
- shocked.png
- think.png

### 3. 复制冬日背景图片
从：`可以成为我的恋人吗\一份礼物\一份礼物\images\download1.jpg`
到：`可以成为我的恋人吗\biaobai\images\download1.jpg`

### 4. 复制音乐文件
从：`可以成为我的恋人吗\一份礼物\一份礼物\audio\` 文件夹
到：`可以成为我的恋人吗\biaobai\audio\`

需要的文件：
- music.mp3

## 使用方法

1. 完成上述文件复制后
2. 用浏览器打开 `biaobai\index.html`
3. 页面会显示"可以成为我的恋人吗？"
4. 点击"可以"按钮会跳转到冬日飘字界面
5. 点击"不要"按钮会出现有趣的互动效果

## 目录结构

```
biaobai/
├── index.html           # 主页面
├── style.css           # 主页面样式
├── script.js           # 主页面脚本
├── winter.html         # 冬日界面
├── winter.css          # 冬日界面样式
├── winter.js           # 冬日界面脚本
├── heart.png           # 爱心图片
├── images/             # 图片文件夹
│   ├── angry.png
│   ├── crying.png
│   ├── hug.png
│   ├── shocked.png
│   ├── think.png
│   └── download1.jpg   # 冬日背景
└── audio/              # 音乐文件夹
    └── music.mp3
```

## 功能说明

### 主页面（index.html）
- 显示"可以成为我的恋人吗？"问题
- 点击"可以"跳转到冬日界面
- 点击"不要"会有趣味互动：
  - "可以"按钮会逐渐变大
  - "不要"按钮会被挤到一边
  - 图片和文字会根据点击次数变化
  - 表情会从开心→震惊→思考→生气→哭泣

### 冬日界面（winter.html）
- 满屏飘落温馨文字
- 背景音乐自动播放（可控制）
- 浪漫的雪花效果
- 响应式设计，支持手机和电脑

祝表白成功！❤️
