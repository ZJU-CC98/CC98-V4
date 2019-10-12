### editor 的分层

- UbbEditor && MarkdownEditor (最底层)
- src/component/Editor 统一两种编辑器，提供切换能力
- pages/editor/component/TopicEditor(PostEditor) 统一帖子（回帖）的新建和修改，抽象为对一个 baseTopic (Post) 的修改
- SendTopic 等业务层 提供待编辑的帖子（回帖），将编辑好的帖子（回帖）提交到服务器
