<template>
  <div id="question">
    <h1>常见问题</h1>
    <p>更新时间：{{updateAt}}</p>
    <div id="editor"></div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="saveFAQ()">保 存</el-button>
    </div>
  </div>
</template>

<script>
import E from "wangeditor"; //引入wangeditor
export default {
  data() {
    return {
      content: "",
      editor: null, //编辑器实例
      url: process.env.VUE_APP_BASEPORT,
      updateAt: new Date()
    };
  },
  created() {},
  mounted() {
    this.initEditor();
  },
  methods: {
    //设置富文本内容
    setEditor(content) {
      this.editor.txt.html(content);
    },
    //使用wangeditor
    initEditor() {
      this.editor = new E("#editor");
      // 配置服务器端地址
      this.editor.customConfig.uploadImgServer = this.url + "/admin/uploadFile";
      this.editor.customConfig.uploadImgParams = {
        // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
        // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
        token: this.$store.state.login.token
      };
      this.editor.customConfig.uploadImgHooks = {
        success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          insertImg(process.env.VUE_APP_BASEIMAGEURL + result.data.newName);
          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      };
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "image", // 插入图片
        "table", // 表格
        "undo", // 撤销
        "redo" // 重复
      ];
      this.editor.customConfig.zIndex = 100;
      this.editor.create();
      this.editor.$textElem.attr("contenteditable", true); //改行配置用于禁用编辑器，true为启用
    }
  }
};
</script>

<style lang="less" scoped>
#question {
  padding: 10px 100px;
  #editor {
    margin-bottom: 10px;
    text-align: left;
    /deep/.w-e-text-container {
      height: 600px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
    }
  }
}
</style>