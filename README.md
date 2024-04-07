# pico-8-ios
这个项目是基于[pico-8教育版](https://www.pico-8-edu.com/)做的二次开发，目的是能让pico-8可以在ios系统上跑起来
## 使用方式
### 环境准备
因为这个pico-8是通过localhost的本地服务来使用，因此我们要准备一些能够跑本地服务的环境
#### Node.js环境
在ios上需要准备一个Node.js环境，可以使用任意一个能够跑Shell脚本的app。这里推荐的是[Code App](https://github.com/thebaselab/codeapp)，它同时也能作为IDE进行编程
#### Express.js
pico-8-ios项目是基于Express这个框架的，所以在运行前需要安装Express.js
```shell
npm install express
```
### 特殊文件路径
因为在ipad上，浏览器是无法读取本地文件的，所以这里的解决思路是：
将工程文件（*.p8）放入一个特定的文件夹下，通过请求本地服务的api，来将特定文件夹下的工程文件同步至浏览器里pico-8的文件系统上以便pico-8能读取本地工程文件

**这也意味着这个工程如果要在远端服务器上跑，每修改一次工程文件都得同步至远端服务器上**

工程文件中的carts文件夹就是拿来作为这个特殊文件夹的，所以只要将工程文件放在这个文件夹中，它们都会被自动映射至pico-8的文件系统里

![carts文件夹](/doc/carts.PNG)
### 运行
最后在工程目录下，运行如下命令：
```shell
node app.js
```
接着再在Safari中输入地址：[http://localhost:3000](http://localhost:3000)就可以在iPad上运行pico-8了！

需要注意的是，因为iOS上是假后台，因此在Safari访问后，需要将窗口切回启动服务的窗口才能正常跑本地服务逻辑，不过这个问题在进入pico-8界面后不会再出现

当然你也可以将这两个界面在iPad上同时显示，这样也不会有上述问题
### 下载日志文件
有时我们需要日志文件来定位问题，浏览器版本提供了一个按钮来将日志文件下载下来

我们需要在pico-8中按照这样输出日志：
```lua
-- log.txt是输出的日志文件名，为了要下载，这里一定得是log.txt
printh("你的日志内容", "log.txt")
```
接着在运行了一会游戏后，我们就可以按"Download log.txt"按钮来将日志下载下来了

![下载日志](/doc/download_log.PNG)