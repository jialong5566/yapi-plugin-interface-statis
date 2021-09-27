# yapi-plugin-interface-statis

Yapi平台插件，展示mock接口的访问日志

## 目的

从访问日志的次数可以看到接口是否被访问到，同时可以看访问的ip、时间和日期


## 方案

对已经存储的统计数据进行展示，添加controller，在原有的statisMockModel 上添加 原型方法，实例通过yapi 的getInst 工具方法获取，添加接口页面的tab，添加统计次数请求的api接口

## 使用

作为Yapi平台插件，接口页面增加tab按钮，点击即可看到最新的访问次数