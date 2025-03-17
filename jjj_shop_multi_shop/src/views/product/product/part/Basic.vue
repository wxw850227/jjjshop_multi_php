<template>
	<div class="basic-setting-content pl16 pr16">
		<!--基本信息-->
		<div class="common-form">基本信息</div>
		<el-form-item label="商品名称：" :rules="[{ required: true, message: '请填写商品名称' }]" prop="model.product_name">
			<el-input v-model="form.model.product_name" class="max-w460"></el-input>
		</el-form-item>
		<el-form-item label="所属分类：" :rules="[{ required: true, message: '你选择商品分类' }]" prop="model.category_id">
			<el-select v-model="form.model.category_id">
				<template v-for="cat in form.category" :key="cat.category_id">
					<el-option :value="cat.category_id" :label="cat.name"></el-option>
					<template v-if="cat.child !== undefined" v-for="two in cat.child" :key="two.category_id">
						<el-option :value="two.category_id" :label="two.name" style="padding-left: 30px;"></el-option>
						<template v-if="two.child !== undefined" v-for="three in two.child" :key="three.category_id">
							<el-option :value="three.category_id" :label="three.name"
								style="padding-left: 60px;"></el-option>
						</template>
					</template>
				</template>
			</el-select>
		</el-form-item>
		<el-form-item label="预告商品：">
			<el-radio-group v-model="form.model.is_preview">
				<el-radio :label="1">开启</el-radio>
				<el-radio :label="0">关闭</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item v-if="form.model.is_preview==1" label="预告开启购买时间"
			:rules="[{ required: true, message: '请选择开启购买时间' }]" prop="model.preview_time">
			<el-date-picker v-model="form.model.preview_time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
				placeholder="选择日期">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="商品图片：" :rules="[{ required: true, message: '请上传商品图片' }]" prop="model.image">
			<div class="draggable-list">
				<template v-if="form.model.image&&form.model.image.length>0">
					<draggable v-model="form.model.image" group="people" item-key="id" class="draggable-list">
						<template #item="{ element,index }">
							<div class="item">
								<img v-img-url="element.file_path" />
								<a href="javascript:void(0);" class="delete-btn" @click.stop="deleteImg(index)">
									<el-icon>
										<Close />
									</el-icon>
								</a>
							</div>
						</template>
					</draggable>
				</template>

				<div class="item img-select" @click="openProductUpload('image', 'image')"><el-icon>
						<Plus />
					</el-icon></div>
			</div>
		</el-form-item>
		<el-form-item label="商品视频：">
			<el-row>
				<div class="draggable-list">
					<div class="item img-select" v-if="form.model.video_id==0"
						@click="openProductUpload('video', 'video')"><el-icon>
							<Plus />
						</el-icon></div>
					<div v-if="form.model.video_id!=0">
						<video width="150" height="150" :src="form.model.video.file_path" :autoplay="false" controls>
							您的浏览器不支持 video 标签
						</video>
						<div>
							<el-button icon="Delete" @click="delVideo">删除视频</el-button>
						</div>
					</div>
				</div>
			</el-row>
		</el-form-item>
		<el-form-item label="视频封面：">
			<el-row>
				<div class="draggable-list">
					<div class="item img-select" v-if="form.model.poster_id==0"
						@click="openProductUpload('image', 'poster')"><el-icon>
							<Plus />
						</el-icon></div>
					<div v-if="form.model.poster_id!=0" class="item" @click="openProductUpload('image', 'poster')">
						<img :src="form.model.poster.file_path" width="100" height="100" />
					</div>
				</div>
			</el-row>
		</el-form-item>
		<el-form-item label="商品卖点：">
			<el-input type="textarea" v-model="form.model.selling_point" class="max-w460"></el-input>
		</el-form-item>
		<!--商品图片组件-->
		<Upload v-if="isProductUpload" :config="config" :isupload="isProductUpload" @returnImgs="returnProductImgsFunc">
			上传图片</Upload>
	</div>
</template>

<script>
import Upload from '@/components/file/Upload.vue';
import draggable from 'vuedraggable';
export default {
	components: {
		Upload,
		draggable
	},
	data() {
		return {
			isProductUpload: false,
			config: {},
			file_name: 'image'
		};
	},
	inject: ['form'],
	created() {

	},
	methods: {

		/*打开上传图片*/
		openProductUpload: function(file_type, file_name) {
			this.file_name = file_name;
			if (file_type == 'image') {
				this.config = {
					total: 9,
					file_type: 'image'
				};
			} else {
				this.config = {
					total: 1,
					file_type: 'video'
				};
			}
			this.isProductUpload = true;
		},

		/*上传商品图片*/
		returnProductImgsFunc(e) {
			if (e != null) {
				if (this.file_name == 'video') {
					this.form.model.video_id = e[0].file_id;
					this.form.model.video = e[0];
				} else if (this.file_name == 'image') {
					let imgs = this.form.model.image.concat(e);
					this.form.model.image = imgs;
				} else if (this.file_name == 'poster') {
					this.form.model.poster_id = e[0].file_id;
					this.form.model.poster = e[0];
				}
			}
			this.isProductUpload = false;
		},

		/*删除商品图片*/
		deleteImg(index) {
			this.form.model.image.splice(index, 1);
		},
		delVideo() {
			this.form.model.video_id = 0;
			this.form.model.video = {};
		},
	}
};
</script>

<style lang="scss" scoped></style>