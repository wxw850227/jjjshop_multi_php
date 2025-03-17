<template>
 <div class="d-s-s pb50">
    <!--分类不同样式展示-->
    <div class="flex-1 mr30">
      <div class="model-container">
        <div class="img-box p10" :style="'backgroundColor:'+formData.backgroundColor+';'">
          <div class="d-a-c">
            <div v-for="(item,index) in formData.list" :key="index" class="d-c d-c-c" @mouseenter="mouseenter"
              @mouseleave="mouseleave">
              <div v-if="formData.type != 2">
                <img class="nav_img" v-img-url="index==0?item.selectedIconPath:item.iconPath" alt="">
              </div>
              <div v-if="formData.type != 1"
                :style="index==0?'color:'+formData.textHoverColor+';':'color:'+formData.textColor+';'">{{item.text}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--图片展示参数-->
    <div class="param-container">
      <div class="common-form"><span>展示设置</span></div>
      <el-form size="small" :model="formData" label-width="150px">
        <el-form-item label="是否开启自定义：">
          <el-radio-group v-model="formData.is_auto">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="导航类型：">
          <el-radio-group v-model="formData.type">
            <el-radio label="0">图文</el-radio>
            <el-radio label="1">图片</el-radio>
            <el-radio label="2">文字</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="背景颜色：">
          <div class="d-s-c">
            <el-color-picker v-model="formData.backgroundColor"></el-color-picker>
            <el-button type="button" style="margin-left: 10px;"
              @click.stop="onEditorResetColor(formData, 'backgroundColor', '#ffffff')">重置</el-button>
          </div>
        </el-form-item>
        <el-form-item label="文字颜色：">
          <div class="d-s-c">
            <el-color-picker v-model="formData.textColor"></el-color-picker>
            <el-button type="button" style="margin-left: 10px;"
              @click.stop="onEditorResetColor(formData, 'textColor', '#ffffff')">重置</el-button>
          </div>
        </el-form-item>
        <el-form-item label="选中颜色：">
          <div class="d-s-c">
            <el-color-picker v-model="formData.textHoverColor"></el-color-picker>
            <el-button type="button" style="margin-left: 10px;"
              @click.stop="onEditorResetColor(formData, 'textHoverColor', '#ffffff')">重置</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="navBar.text+':'" :key="index" v-for="(navBar, index) in formData.list">
          <div class="param-img-item">
            <div class="d-e-c f16 gray9"><el-icon class="Delete-solid" @click="onEditorDeleleData(index)"><DeleteFilled /></el-icon></div>
            <div class="d-a-c">
              <div class="icon">未选中：
                <img v-img-url="navBar.iconPath" alt="" @click="onEditorSelectImage(navBar, 'iconPath')">
              </div>
              <div class="icon"> 已选中：
                <img v-img-url="navBar.selectedIconPath" alt=""
                  @click="onEditorSelectImage(navBar, 'selectedIconPath')">
              </div>
            </div>
          </div>
          <div class="d-s-c mb16">
            <div class="url-box flex-1 d-s-c">
              <span class="key-name">链接：</span>
              <el-input disabled v-model="navBar.link_url"></el-input>
            </div>
            <div class="url-box ml10">
              <el-button type="primary" @click="changeLink(index)">选择链接</el-button>
            </div>
          </div>
          <div class="url-box flex-1 d-s-c ">
            <span class="key-name">名称：</span>
            <el-input v-model="navBar.text"></el-input>
          </div>
        </el-form-item>
        <el-col class="d-c-c" v-if="formData.list.length<5">
          <el-button @click="onEditorAddData">添加一个</el-button>
        </el-col>
      </el-form>
    </div>

    <!--提交-->
    <div class="common-button-wrapper">
      <el-button size="small" type="primary" @click="Submit()">保存</el-button>
    </div>
    <!--上传图片-->
    <Upload v-if="isupload" :isupload="isupload" :config="{ total: 3 }" @returnImgs="returnImgsFunc"></Upload>
    <Setlink v-if="is_linkset" :is_linkset="is_linkset" @closeDialog="closeLinkset">选择链接</Setlink>
  </div>
</template>

<script>
  import { getbottomNav,
  editTabbar} from '@/api/page.js';
  import Upload from '@/components/file/Upload.vue';
  import Setlink from '@/components/setlink/SetTab.vue';
  export default {
    data() {
      return {
        /*是否上传图片*/
        isupload: false,
        /*表单数据对象*/
        formData: {
          /* 导航类型*/
          type: '0',
          is_auto:'0',
          /* 背景颜色*/
          backgroundColor: "#ffffff",
          textColor: '#333333',
          textHoverColor: 'red',
          /* 悬浮 */
          bulge: false,
          list: []
        },
        is_linkset: false,
        index: 0,
      };
    },
    components: {
      Upload,
      Setlink
    },
    created() {

      this.getData();

    },
    methods: {

      /*获取数据*/
      getData() {
        let self = this;
        getbottomNav({}, true).then(res => {
          self.formData = res.data.vars.data;
        }).catch(error => {
          self.loading = false;
        });
      },

      /*提交*/
      Submit() {
        let self = this;
        self.loading = true;
        let Params = self.formData;
        if (Params.list.length <= 0 || !Params.list) {
          Params = {}
        }
        editTabbar({
            data: Params
          }, true)
          .then(data => {
            self.loading = false;
            ElMessage({
              message: '恭喜你，修改成功',
              type: 'success'
            });
            self.getData();
          })
          .catch(error => {
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
        this.formData.list[this.index].link_url = '/' + e.url;
        this.formData.list[this.index].text = e.name;
      },
      onEditorDeleleData: function(index) {
        let self = this;
        if (self.formData.list.length <= 1) {
          ElMessage({
            message: '至少保留一个',
            type: 'error'
          });
          return false;
        }
        self.formData.list.splice(index, 1);
      },
      onEditorSelectImage: function(index, imgUrl) {
        this.isupload = true;
        this.imgModel = {
          index: index,
          imgUrl: imgUrl
        };
      },
      /*上传图片*/
      returnImgsFunc(e) {
        if (e != null) {
          this.imgModel.index[this.imgModel.imgUrl] = e[0]['file_path'];
        }
        this.isupload = false;
      },
      onEditorResetColor: function(holder, attribute, color) {
        holder[attribute] = color;
      },
      onEditorAddData: function() {
        let self = this;
        // 新增data数据
        if (self.formData.list) {
          if (self.formData.list.length >= 5) {
            ElMessage({
              message: '最多添加5个',
              type: 'error'
            });
            return false;
          } else {
            let newDataItem = {
              iconPath: '',
              text: '',
              is_show: true,
              selectedIconPath: '',
              link: {
                wap_url: ''
              }
            };
            self.formData.list.push(newDataItem);
          }
        } else {
          let newDataItem = {
            iconPath: '',
            text: '',
            is_show: true,
            selectedIconPath: '',
            link: {
              wap_url: ''
            }
          };
          let list = [{
            ...newDataItem
          }];
          self.formData = {
            type: 0,
            backgroundColor: "",
            textColor: '',
            textHoverColor: '',
            bulge: false,
            list: []
          }
          self.formData.list = list;
        }

      },
      mouseenter(e) {
        e.target.childNodes[2].style.color = this.formData.textHoverColor;
      },
      mouseleave(e) {
        e.target.childNodes[2].style.color = this.formData.textColor;
      }
    }
  };
</script>

<style scoped="scoped">
.d-s-c{
  width: 100%;
}
  .model-container {
    width: 375px;
    height: calc(100vh - 150px);
    margin: 0 auto;
  }

  .mr30 {
    margin-right: 30px;
  }

  .model-container img {
    width: 100%;
  }

  .model-container .img-box {
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, .1);
  }

  .param-container {
    width: 700px;
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
    display: flex;
    justify-content: flex-end;
  }

  .param-img-item {
    border: 1px solid #CCCCCC;
    margin-bottom: 10px;
    padding: 30px 15px;
    width: 100%;
  }

  .param-img-item .el-icon-delete-solid {
    font-size: 16px;
    text-align: right;
    color: #999999;
  }

  .key-name {
    white-space: nowrap;
  }
</style>
