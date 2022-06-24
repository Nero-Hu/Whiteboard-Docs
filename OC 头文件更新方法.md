#OC 头文件更新方法：

## SourceTree

拉取分支。

OC 的头文件位于 media_sdk3 仓库 include/objc 文件夹下。文件夹结构如下：

其中更新较多的文件为 Agora\ Objective-C\ API\ Overview-template.md，AgoraEnumerates.h，AgoraObjects.h 和 AgoraRtcEngineKit.h。

```
└── objc
    ├── Agora\ Objective-C\ API\ Overview-template.md        自定义的首页，生成页面为 https://docs.agora.io/cn/Interactive%20Broadcast/API%20Reference/oc/docs/headers/Agora-Objective-C-API-Overview.html
    ├── AgoraConstants.h                                     常量，目前里面只有码率模式和 AgoraVideoDimension，基本用不到。
    ├── AgoraEnumerates.h                                    枚举类，包括错误码、警告码以及其他方法中用到的枚举。
    ├── AgoraLiveKit.h                                       忽略，不用来生成文档
    ├── AgoraLivePublisher.h                                 忽略，不用来生成文档
    ├── AgoraLiveSubscriber.h                                忽略，不用来生成文档
    ├── AgoraMediaIO.h                                       自采集自渲染用的类。通常无需更新。
    ├── AgoraMediaMetadata.h                                 媒体附属信息类。通常无需更新。
    ├── AgoraObjects.h                                       其他大部分方法用到的类。
    ├── AgoraRtcCryptoLoader.h                               忽略。
    ├── AgoraRtcEngineKit.h                                  所有的方法和回调。
    ├── AgoraRtmKit.h                                        忽略。
    ├── index.md                                             给生成的默认主页加上自定义的描述。
    └── internal                                             忽略。
```

## VSCode

1. 添加 API 注释。

   模板：

```
/** <brief description of the method>
 <detailed description of the method> 
 
 @param <name>  <description of the parameter> 
 
 @note <single line note>. 
 或者
 **Note**: <multiple-line note>
 
 @return <the return values if any>
 */
```

- 引用：链接地址需要给出类的名称以及方法名称，用空格隔开，并加上[ ]，[displayname] ([categoryname APIname])。例如： [userJoinedBlock]([AgoraRtcEngineKit userJoinedBlock:]) 。

  - APIname见html中显示，如下图：

    ![image-20190801160049911](/Users/wyl/Library/Application%20Support/typora-user-images/image-20190801160049911.png)

  - 不要在枚举的注释里引用其他枚举类，比如在warning code中用链接引用error code。否则会导致 appledoc crash。

- 枚举值中不能有空行，否则会造成只显示第一行注释。

- 尽量在英文注释中避免使用与属性名称相同的词。因为 appledoc 会自动识别并生成链接，与属性名称相同的词会被识别为属性的链接。

- 不要在注释文字前面加多余的空格，会导致被识别为代码格式。

- 对中文 API 注释，要手动添加新增 API 的代码。

- 新增的 API 接口，除在头文件中更新外，还需及时在  Agora\ Objective-C\ API\ Overview-template.md 中更新。

- 和C++不同，OC代码每句前不要有*，只有一头一尾有/** 和 */。

- 使用 tag 时（如@note, @return, @param），后面要接内容，才会被 appledoc 识别。

  ```objective-c
   @return - YES: Success.
   - NO: Failure.
  ```

  

- 使用无序列表时，要用空行隔开，例如

  ``` objective-c
  @param channels Sets the number of audio channels of the external audio sink:
   
   - 1: Mono
   - 2: Stereo
  ```

  

2. 完成头文件更新后，记得删除 NS_ENUM 下的 AgoraVideoRenderModeAdaptive 部分代码： `**__deprecated_enum_msg**("AgoraVideoRenderModeAdaptive is deprecated.") `，让该参数和其余两个参数的显示一致，否则生成的 html 文件中该参数格式会乱。正确示例如下：

   ![image-20190801170045463](/Users/wyl/Library/Application Support/typora-user-images/image-20190801170045463.png)

## appledoc

### 安装

1. 在 Terminal 中运行 `git clone git://github.com/tomaz/appledoc.git` 来创建 appledoc 目录。
2. 在本地能看到 appledoc 文件夹后，从 Terminal 进入 appledoc 文件夹，并运行 `sudo sh install-appledoc.sh`。若成功安装，则跳转至步骤 4。
3. 若不成功，
   - 且原因为无 usr/local/bin 路径，则从 Terminal 进入 appledoc 文件夹后运行 `sudo sh install-appledoc.sh -b /usr/bin -t default`即可修改存放路径为 usr/bin 。
   - 且原因为无修改 usr/local/bin 或 usr/bin 目录权限：则重启电脑，并在开机时按住 command+R 进入调试界面，找到 Utilities/Terminal 并运行 `csrutil disable`，最后正常重启电脑即可。
4. 从 Terminal 进入 appledoc 文件夹后，输入 `appledoc —version` 查看 appledoc 版本，若能返回版本号，也能说明安装成功了。

**Note**: appledoc 只能在 Xcode 版本为 9.2 时使用。若本地有9.2版本和更高版本的 Xcode，系统默认会用更高版本的 Xcode，此时用 `sudo xcode-select -s /Applications/Xcode_9.2.app` 即可切换到Xcode，`/Applications/Xcode_9.2.app` 为路径和 app 名称，请根据自己实际情况修改。

### 使用 appledoc 生成 html 文件

1. 在 VSCode 中将头文件更新好后，将 Agora Objective-C API Overview-template.md、AgoraConstants.h、AgoraEnumerates.h、AgoraMediaIO.h、AgoraMediaMetadata.h、AgoraObjects.h、AgoraRtcCryptoLoader.h、AgoraRtcEngineKit.h 、AppledocSettings.plist 和 index.md 文件拷贝出来（此文件夹命名为headers），因为在生成 html 文件前会进行些修改。
2. 在 AppledocSettings.plist 文件中进行如下配置并保存：

![image-20190801164916627](/Users/wyl/Library/Application%20Support/typora-user-images/image-20190801164916627.png)

- 需注意，output 为导出 html 文件的路径（路径中不能有空格），此路径不能与放置头文件的路径一致，否则导出文件会不可用。

3. 从 Terminal 进入存放头文件的目录后，输入 `appledoc . `并运行即可生成 html 文件。

- 在 Terminal 中若有报错提示，需按提示进行头文件注释修改。

  - 若出现 ` Invalid [localAudioStatBlock]([AgoraRtcEngineKit localAudioStatBlock:])`，则说明链接有问题，需输入正确链接。
  - 若出现 `WARN | Invalid [", "] reference found near AgoraRtcEngineKit.h@1070, unknown object : ", !`，则说明范围区间中有空格，需删除。正确格式为：[0,1] （逗号和 1 中间无空格）。
  - 若出现 `WARN | AgoraRtcEngineKit.h@3574: Description for parameter 'parameter' missing for -[AgoraRtcEngineKit getParameter:args:]!` 或 `WARN | AgoraChannelMediaRelayError is not documented!`，则说明该代码没有添加文档注释，需补齐。
  - 若出现以下报错，可以忽略，因为这些都是废弃代码，无需注释：
    - `WARN | AgoraRtcEngineKit.h@3574: Description for parameter 'parameter' missing for -[AgoraRtcEngineKit getParameter:args:]!`
    - `WARN | AgoraRtcEngineKit.h@3574: Description for parameter 'args' missing for -[AgoraRtcEngineKit getParameter:args:]!`
    - `WARN | AgoraRtcEngineKit.h@4022: Description for parameter 'cameraReadyBlock' missing for -[AgoraRtcEngineKit cameraReadyBlock:]!`
    - `WARN | AgoraRtcEngineKit.h@4030: Description for parameter 'connectionLostBlock' missing for -[AgoraRtcEngineKit connectionLostBlock:]!`
    - `WARN | AgoraRtcEngineKit.h@4113: Description for parameter 'mediaEngineEventBlock' missing for -[AgoraRtcEngineKit mediaEngineEventBlock:]!`

  4. 若需要生成中文的 html 文件，需要将 appledoc/Application 文件夹中的  GBApplicationStringsProvider.m 文件内容修改为中文，并重新运行`sudo sh install-appledoc.sh`。

  - 每次切换语言就要把相应语言的该文件进行替换，并且运行 `sudo sh install-appledoc.sh`。建议在本地其他路径中保存英文和中文的 GBApplicationStringsProvider.m 文件各一个，需要时直接复制替换即可。

  