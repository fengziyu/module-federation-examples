## 动态加载组件

## 加载方式

### 加载入口文件

```javascript
  const element = document.createElement("script");
  element.src = url;
  document.head.appendChild(element);
```

### 加载模块

```javascript
const loadComponent = (remote, module) => {
  return async () => {
    const factory = await window[remote].get(module);
    return factory();
  }
}

const Component = React.lazy(loadComponent(system.name, system.module))
```

### 使用

```jsx
  <React.Suspense fallback="Loading">
    <Component/>
  </React.Suspense>
```

