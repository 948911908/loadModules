### 前段时间在掘金上看到一位小伙伴写的模块化解决方案，今天心血来潮也弄了一个
#### 第一次发帖，文笔有限，请各位多多包涵！

[demo](http://pwh6g7lu0.bkt.clouddn.com/index.html#/)
[源码地址]()

![](https://user-gold-cdn.xitu.io/2019/8/19/16ca924fa50127fc?w=502&h=797&f=gif&s=282150)
![](https://user-gold-cdn.xitu.io/2019/8/19/16ca92603262d872?w=557&h=317&f=png&s=20699)
##### 这里是普通加载模式
![](https://user-gold-cdn.xitu.io/2019/8/19/16ca92524fd9bfce?w=502&h=797&f=gif&s=465431)
![](https://user-gold-cdn.xitu.io/2019/8/19/16ca9269d0704409?w=615&h=604&f=png&s=48974)
##### 这里是模块化顺序加载模式
#### 具体效果就请各位自行查看了。

### 解决问题

* 首屏内容过多导致的FPS降低卡顿
* 加快首屏加载速度
* 动态控制首屏加载内容

### 实现思路
```
使用window.requestAnimationFrame和document.readyState实现组件加载
window.requestAnimationFrame保证加载时的FPS不会太低
document.readyState获取当前dom节点加载状态，保证在之前的节点渲染完之后再去渲染新的节点
```

### 支持的功能

* 动态组件props传递
* 动态组件事件监听
* 动态组价实例对象获取
* 动态组件销毁
* 动态组件异步加载



