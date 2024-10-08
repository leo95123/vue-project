## vue 项目模板

### 目录结构

```
|-- .eslintrc.cjs // eslint配置
|-- .gitignore // git忽略
|-- .npmrc // npm 源配置
|-- .prettierrc.json // prettier 配置
|-- README.md // 项目介绍
|-- env.d.ts
|-- index.html // 项目入口
|-- package-lock.json
|-- package.json
|-- pnpm-lock.yaml
|-- tsconfig.app.json // ts 配置
|-- tsconfig.json // ts 配置
|-- tsconfig.node.json // ts 配置
|-- vite.config.ts // vite 配置
|-- public // 公共资源
| |-- favicon.ico
|-- src
|-- App.vue
|-- main.ts // 入口文件
|-- api // api接口
| |-- about
| |-- home
| |-- index.ts
|-- assets // 资源目录
| |-- icons
| |-- IconDrag.vue
| |-- icons.d.ts
|-- components // 公共组件
| |-- SearchHeader.vue
| |-- BaseTable // 表格
| |--- BaseTable.vue
| |--- BaseTableColumn.tsx
| |--- types.ts
|-- hook // hook
| |-- usePagination.ts // 分页
| |-- useTable.ts // 表格
|-- request // 请求封装
| |-- index.ts
| |-- token.ts
|-- router // 路由
| |-- index.ts
| |-- home
| |-- index.ts
|-- types // 类型
|-- views // 页面
|--- home
|--- Index.vue

```
