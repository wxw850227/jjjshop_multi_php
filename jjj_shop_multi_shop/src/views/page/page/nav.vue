<template>
  <div class="d-s-s pb50">
    <!--分类不同样式展示-->
    <div class="model-container">
      <div
        class="img-box p10"
        :style="'backgroundColor:' + formData.backgroundColor + ';'"
      >
        <div class="d-a-c">
          <div
            v-for="(item, index) in formData.list"
            :key="index"
            class="d-c d-c-c"
            @mouseenter="mouseenter"
            @mouseleave="mouseleave"
            v-if="item.is_show"
          >
            <div v-if="formData.type != 2">
              <img class="nav_img" :src="item.iconPath" alt="" />
            </div>
            <div
              v-if="formData.type != 1"
              :style="'color:' + formData.textColor + ' ;'"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--图片展示参数-->
    <div class="param-container flex-1">
      <div class="common-form"><span>展示设置</span></div>
      <el-form size="small" :model="formData" label-width="100px">
        <div :key="index" v-for="(navBar, index) in formData.list">
          <el-form-item :label="navBar.text + ':'">
            <div class="param-img-item">
              <div class="d-a-c">
                <div class="icon">
                  未选中：
                  <img
                    v-img-url="navBar.iconPath"
                    alt=""
                    @click="onEditorSelectImage(navBar, 'iconPath')"
                  />
                </div>
                <div class="icon">
                  已选中：
                  <img
                    v-img-url="navBar.selectedIconPath"
                    alt=""
                    @click="onEditorSelectImage(navBar, 'selectedIconPath')"
                  />
                </div>
              </div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" type="primary" @click="Submit()">保存</el-button>
    </div>
    <!--上传图片-->
    <Upload
      v-if="isupload"
      :isupload="isupload"
      :config="{ total: 3 }"
      @returnImgs="returnImgsFunc"
    ></Upload>
  </div>
</template>

<script>
import { getNav, postNav } from "@/api/page.js";
import Upload from "@/components/file/Upload.vue";
export default {
  data() {
    return {
      /*是否上传图片*/
      isupload: false,
      /*表单数据对象*/
      formData: {
        /* 导航类型*/
        type: 0,
        /* 背景颜色*/
        backgroundColor: "",
        textColor: "",
        textHoverColor: "",
        /* 悬浮 */
        bulge: false,
        list: [
          // {
          // text:'',
          // iconPath:'',
          // is_show:true,
          // selectedIconPath:'',
          // link:{
          // wap_url:''
          // }
          // }
        ],
      },
      is_linkset: false,
      index: 0,
    };
  },
  components: {
    Upload,
  },
  created() {
    this.getData();
  },
  methods: {
    /*获取数据*/
    getData() {
      let self = this;
      getNav({}, true)
        .then((res) => {
          // let data = JSON.parse(res.data.data.data);
          // console.log(data)
          self.formData = res.data.data.data;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*提交*/
    Submit() {
      let self = this;
      self.loading = true;
      let Params = self.formData;
      if (Params.list.length <= 0 || !Params.list) {
        Params = {};
      }
      postNav(
        {
          data: Params,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，修改成功",
            type: "success",
          });
          self.getData();
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    /*选择链接*/
    changeLink(index) {
      this.is_linkset = true;
      this.index = index;
    },

    /*获取链接并关闭弹窗*/
    closeLinkset(e) {
      this.is_linkset = false;
      this.formData.list[this.index].link.wap_url = "/" + e.url;
      this.formData.list[this.index].text = e.name;
    },
    onEditorDeleleData: function (index) {
      let self = this;
      // if (self.formData.list.length <= 1) {
      //   ElMessage({
      //     message: '至少保留一个',
      //     type: 'error'
      //   });
      //   return false;
      // }
      self.formData.list.splice(index, 1);
    },
    onEditorSelectImage: function (index, imgUrl) {
      this.isupload = true;
      this.imgModel = {
        index: index,
        imgUrl: imgUrl,
      };
    },
    /*上传图片*/
    returnImgsFunc(e) {
      if (e != null) {
        this.imgModel.index[this.imgModel.imgUrl] = e[0]["file_path"];
      }
      this.isupload = false;
    },
    onEditorResetColor: function (holder, attribute, color) {
      holder[attribute] = color;
    },
    onEditorAddData: function () {
      let self = this;
      // 新增data数据
      if (self.formData.list) {
        if (self.formData.list.length >= 5) {
          ElMessage({
            message: "最多添加5个",
            type: "error",
          });
          return false;
        } else {
          let newDataItem = {
            iconPath: "",
            text: "",
            is_show: true,
            selectedIconPath: "",
            link: {
              wap_url: "",
            },
          };
          self.formData.list.push(newDataItem);
        }
      } else {
        let newDataItem = {
          iconPath: "",
          text: "",
          is_show: true,
          selectedIconPath: "",
          link: {
            wap_url: "",
          },
        };
        let list = [{ ...newDataItem }];
        self.formData = {
          type: 0,
          backgroundColor: "",
          textColor: "",
          textHoverColor: "",
          bulge: false,
          list: [],
        };
        self.formData.list = list;
      }
    },
    mouseenter(e) {
      e.target.childNodes[2].style.color = this.formData.textHoverColor;
    },
    mouseleave(e) {
      e.target.childNodes[2].style.color = this.formData.textColor;
    },
  },
};
</script>

<style scoped="scoped">
.model-container {
  width: 300px;
  height: calc(100vh - 150px);
  margin-right: 30px;
}

.model-container img {
  width: 100%;
}

.model-container .img-box {
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
}

.param-container {
  padding: 20px;
  /* height: calc(100vh - 150px); */
  border: 1px solid #eee;
}

.icon img {
  width: 50px;
  height: 50px;
}

.nav_img {
  width: 30px !important;
  height: 30px;
}

.delete-box {
  z-index: 99;
}

.param-img-item {
  border: 1px solid #cccccc;
  margin-bottom: 10px;
  padding: 30px 15px;
}
</style>
