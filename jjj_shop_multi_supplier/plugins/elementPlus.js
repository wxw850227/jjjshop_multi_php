
  export let gp = {};
  
  export function setup(app) {
    /**
     * @description 全局Confirm
     * @param {string|VNode} content 消息正文内容
     * @param {string} title 标题
     * @param {function} callback1 确认回调
     * @param {function} callback2 关闭或取消回调
     * @param {string} confirmButtonText 确定按钮的文本内容
     * @param {string} cancelButtonText 取消按钮的自定义类名
     */
    app.provide(
      "$baseConfirm",
      (
        content,
        title = undefined,
        callback1 = undefined,
        callback2 = undefined,
        confirmButtonText = "确定",
        cancelButtonText = "取消"
      ) => {
        ElMessageBox.confirm(content, title || "温馨提示", {
          confirmButtonText,
          cancelButtonText,
          closeOnClickModal: false,
          type: "warning",
          lockScroll: false,
          dangerouslyUseHTMLString: true,
        })
          .then(() => {
            if (callback1) {
              callback1();
            }
          })
          .catch(() => {
            if (callback2) {
              callback2();
            }
          });
      }
    );
    app.provide('$getImgSrc',(name)=>{
      if (typeof name === 'undefined') return 'error.png'
      const modules = import.meta.globEager('/src/**/*.{png,svg,jpg,jpeg}')
      if (modules[name]) return modules[name].default
    })
    /* const $testhh = ()=>{
      return '我是elementplus的test'
    }
    app.provide("$testhh", $testhh)
    gp.$testhh = $testhh; */
  }
  