## module federation start

### 配置webpack

``` javascript
// host
plugins: [
  new ModuleFederationPlugin({
    name: "host",
    library: { type: "var", name: "host" },
    remotes: ['remote'],
    shared: ["react", "react-dom"],
  }),
]

// remote
plugins: [
  new ModuleFederationPlugin({
    name: "remote",
    library: { type: "var", name: "remote" },
    filename: "remoteEntry.js",
    exposes: {
      'Button': './src/Button.tsx',
    },
    shared: ["react", "react-dom"],
  }),
]
```

 - name: 项目名
 - filename: 导入的入口文件名，引用remote公开模块时，必须先引用这个入口文件
 - exposes: 公开的模块，属性名为模块名
 - shared: remote和host共享的模块，

### host获取remote入口文件
可以在index.html中用script导入

### 使用

```tsx
const RemoteButton = React.lazy(() => import("app2/Button"));
```


## module federation examples