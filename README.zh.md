# truechain-official-ssr

```
├── README.md
├── api
│   ├── http.js                         // 对axios进行了一层封装
│   └── index.js                        // API接口调用的统一管理
├── assets
│   ├── images                          // 图片
│   ├── members                         // 成员图片
│   └── stylus
│       ├── animation.styl              // 动画样式
│       ├── base.styl                   // 全局通用样式
│       ├── common
│       │   └── app-button.styl
│       ├── index.styl                  // 统一引用
│       ├── mixin.styl                  // 样式方法
│       └── reset.styl                  // 样式初始化
├── components                          // 通用组件
│   ├── AppLogo.vue
│   ├── README.md
│   ├── app-android.vue
│   └── app-ios.vue
├── config                               // 环境配置
│   └── index.js
├── deploy.sh                            // 自动化命令
├── deploy_flow.md                       // 部署流程
├── layouts                              // 样式布局
│   └── default.vue
├── locales                              // 全球化配置文件
│   ├── en.json                          // 英文
│   ├── ko.json                          // 中文
│   └── sc.json                          // 韩文
├── middleware                           // 中间件
│   └── i18n.js
├── nuxt.config.js                        // nuxt配置文件
├── package-lock.json
├── package.json
├── pages                                  // 页面默认跟目录
│   ├── _lang                              // 根据变量生成对应语言的页面
│   │   ├── index.vue                      // 页面默认页面
│   │   ├── jd                             // 职位描述页面
│   │   │   └── _id.vue
│   │   ├── join.vue                       // 加入我们
│   │   ├── news.vue                       // 新闻页面
│   │   ├── news_detail                    // 新闻详情
│   │   │   └── _id.vue
│   │   ├── node.vue                       // 节点页面
│   │   └── team.vue                       // 团队页面
│   ├── index.vue
│   ├── jd
│   │   └── _id.vue
│   ├── join.vue
│   ├── news.vue
│   ├── news_detail
│   │   └── _id.vue
│   ├── node.vue
│   └── team.vue
├── plugins                                 // 插件配置
│   ├── i18n.js
│   ├── iview.js
│   └── vue-dplayer.js
├── static                                  // 静态文件
│   ├── EnTruechain.pdf
│   ├── README.md
│   ├── Truechain.pdf
│   ├── YellowPaper.pdf
│   ├── donglizi.js
│   ├── download
│   │   ├── true-2.0.1.apk
│   │   ├── true.apk
│   │   └── true_en.apk
│   ├── favicon.ico
│   ├── m1.mp4
│   ├── m2.mp4
│   ├── m3.mp4
│   ├── particles.min.js
│   └── playicon.png
├── store                                     // vuex 配置
│   └── index.js
├── util                                      // util
│   └── index.js
├── webhook.js                                // 自动化部署脚本
└── yarn.lock
```

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
