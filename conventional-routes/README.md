# 约定式路由

约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。

比如以下文件结构：

```bash
.
  └── pages
    ├── index.tsx
    └── users.tsx
```

会得到以下路由配置，

```js
[
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/users', component: '@/pages/users' },
]
```

需要注意的是，满足以下任意规则的文件不会被注册为路由，

* 以 `.` 或 `_` 开头的文件或目录
* 以 `d.ts` 结尾的类型定义文件
* 以`Modal.jsx`、`Modal.tsx` 结尾的弹框文件
* 以 `test.ts`、`spec.ts`、`e2e.ts` 结尾的测试文件（适用于 `.js`、`.jsx` 和 `.tsx` 文件）
* `components` 和 `component` 目录
* `utils` 和 `util` 目录
* 不是 `.jsx` 或 `.tsx` 文件

## 动态路由

约定 `[]` 包裹的文件或文件夹为动态路由。

比如：

* `src/pages/users/[id].tsx` 会成为 `/users/:id`
* `src/pages/users/[id]/settings.tsx` 会成为 `/users/:id/settings`

举个完整的例子，比如以下文件结构，

```bash
.
  └── pages
    └── [post]
      ├── index.tsx
      └── comments.tsx
    └── users
      └── [id].tsx
    └── index.tsx
```

会生成路由配置，

```js
[
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/users/:id', component: '@/pages/users/[id]' },
    { exact: true, path: '/:post/', component: '@/pages/[post]/index' },
    {
        exact: true,
        path: '/:post/comments',
        component: '@/pages/[post]/comments',
    },
];
```

## 动态可选路由

约定 `[ $]` 包裹的文件或文件夹为动态可选路由。

比如：

* `src/pages/users/[id$].tsx` 会成为 `/users/:id?`
* `src/pages/users/[id$]/settings.tsx` 会成为 `/users/:id?/settings`

举个完整的例子，比如以下文件结构，

```bash
.
  └── pages
    └── [post$]
      └── comments.tsx
    └── users
      └── [id$].tsx
    └── index.tsx
```

会生成路由配置，

```js
[
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/users/:id?', component: '@/pages/users/[id$]' },
    {
        exact: true,
        path: '/:post?/comments',
        component: '@/pages/[post$]/comments',
    },
];
```

## 嵌套路由

约定目录下有 `_layout.tsx` 时会生成嵌套路由，以 `_layout.tsx` 为该目录的 layout。layout 文件需要返回一个 React 组件，并通过 `props.children` 渲染子组件。

比如以下目录结构，

```bash
.
└── pages
    └── users
        ├── _layout.tsx
        ├── index.tsx
        └── list.tsx
```

会生成路由，

```js
[
    {
        exact: false, path: '/users', component: '@/pages/users/_layout',
        routes: [
            { exact: true, path: '/users', component: '@/pages/users/index' },
            { exact: true, path: '/users/list', component: '@/pages/users/list' },
        ]
    }
]
```
