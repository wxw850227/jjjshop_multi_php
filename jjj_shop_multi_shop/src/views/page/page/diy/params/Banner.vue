<template>
  <div>
    <div class="common-form">
      <span>{{ curItem.name }}</span>
    </div>
    <el-form size="small" :model="curItem" label-width="100px">
      <el-form-item label="轮播图显示：">
        <el-radio-group v-model="curItem.style.imgShape">
          <el-radio label="round">圆形</el-radio>
          <el-radio label="square">正方形</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="指示点形状：">
        <el-radio-group v-model="curItem.style.btnShape">
          <el-radio label="round">圆形</el-radio>
          <el-radio label="square">正方形</el-radio>
          <el-radio label="rectangle">长方形</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片宽度(px):">
        <el-input placeholder="请输入图片宽度" value="750" disabled></el-input>
      </el-form-item>
      <el-form-item label="图片高度(px):">
        <el-input placeholder="请输入图片高度" v-model="curItem.style.height"></el-input>
      </el-form-item>
      <el-form-item label="指示点颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.btnColor"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;"
            @click.stop="$parent.onEditorResetColor(curItem.style, 'btnColor', '#ffffff')">重置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="背景颜色：">
        <div class="d-s-c">
          <el-color-picker v-model="curItem.style.background"></el-color-picker>
          <el-button type="button" style="margin-left: 10px;"
            @click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#ffffff')">重置
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="切换时间：">
        <el-input v-model="curItem.params.interval"></el-input>
        <p>轮播图自动切换的间隔时间，单位：毫秒</p>
      </el-form-item>
      <el-form-item label="图片：">
        <el-col class="param-img-item" :key="index" v-for="(banner, index) in curItem.data">
          <div class="delete-box">
			  <!-- <i class="DeleteFilled" @click="$parent.onEditorDeleleData(index, selectedIndex)"></i> -->
			  <el-icon @click="$parent.onEditorDeleleData(index, selectedIndex)"><DeleteFilled /></el-icon>
			  </div>
          <div class="pic" style="margin-bottom: 10px;">
            <img v-img-url="banner.imgUrl" alt="" @click="$parent.onEditorSelectImage(banner, 'imgUrl')" />
          </div>
          <div class="d-s-c">
            <div class="url-box flex-1">
              <span class="key-name">链接地址：</span>
              <el-input placeholder="请选择链接地址" v-model="banner.name"></el-input>
            </div>
            <div class="url-box ml10">
              <el-button type="primary" @click="changeLink(index)">选择链接</el-button>
            </div>
          </div>
        </el-col>
        <el-col class="d-c-c">
          <el-button @click="$parent.onEditorAddData">添加一个</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <Setlink v-if="is_linkset" :is_linkset="is_linkset" @closeDialog="closeLinkset">选择链接</Setlink>
  </div>
</template>

<script>
import Setlink from '@/components/setlink/Setlink.vue';
export default {
	components: {
		Setlink
	},
	data() {
		return {
			/*是否选择链接*/
			is_linkset: false,
			index: null
		};
	},
	props: ['curItem', 'selectedIndex'],
	methods: {
		/*选择链接*/
		changeLink(index) {
			this.is_linkset = true;
			this.index = index;
		},

		/*获取链接并关闭弹窗*/
		closeLinkset(e) {
			this.is_linkset = false;
			if (e) {
				this.curItem.data[this.index].linkUrl = e.url;
				this.curItem.data[this.index].name = '链接到' + ' ' + e.type + ' ' + e.name;
			}
		}
	}
};
</script>

<style></style>
