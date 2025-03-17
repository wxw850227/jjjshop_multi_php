<template>
	<div class="mt16">
		<!-- {{form.model.spec_many.spec_list.length}} -->
		<el-form-item label="规格明细："
			v-if="form.model.spec_many&& form.model.spec_many.spec_list && form.model.spec_many.spec_list.length > 0">
			<el-col>
				批量设置
				<el-input size="small" v-model="batchData.product_price" placeholder="销售价"
					style="width: 160px;padding-left: 4px;"></el-input>
				<el-input size="small" v-model="batchData.line_price" placeholder="划线价"
					style="width: 160px;padding-left: 4px;"></el-input>
				<el-input size="small" v-model="batchData.stock_num" placeholder="库存"
					style="width: 160px;padding-left: 4px;"></el-input>
				<el-input size="small" v-model="batchData.product_weight" placeholder="重量"
					style="width: 160px;padding-left: 4px;"></el-input>
				<el-button size="small" @click="onSubmitBatchData">应用</el-button>
			</el-col>
			<!--多规格表格-->
			<el-col>

				<el-table size="small" :data="form.model.spec_many.spec_list" :span-method="objectSpanMethod" border
					style="width: 100%; margin-top: 20px">
					<el-table-column :label="item.group_name" :key="item.group_name"
						v-for="(item, index) in form.model.spec_many.spec_attr">
						<template #default="scope">
							{{ scope.row.rows[index].spec_value }}
						</template>
					</el-table-column>
					<el-table-column label="规格图片">
						<template #default="scope">
							<img v-img-url="scope.row.spec_form.image_path" alt="" :width="35" :height="35"
								@click="chooseSpecImage(scope.$index)" />
						</template>
					</el-table-column>
					<el-table-column label="产品编码">
						<template #default="scope">
							<el-form-item label="" style="margin-bottom: 0;"><el-input size="small" prop="product_no"
									v-model="scope.row.spec_form.product_no"></el-input></el-form-item>
						</template>
					</el-table-column>
					<el-table-column label="销售价">
						<template #default="scope">
							<el-form-item label="" :rules="[{ required: true, message: ' ' }]"
								:prop="'model.spec_many.spec_list.' + scope.$index + '.spec_form.product_price'"
								style="margin-bottom: 0;">
								<el-input size="small" prop="product_price"
									v-model="scope.row.spec_form.product_price"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column label="划线价">
						<template #default="scope">
							<el-form-item label="" style="margin-bottom: 0;"><el-input size="small" prop="line_price"
									v-model="scope.row.spec_form.line_price"></el-input></el-form-item>
						</template>
					</el-table-column>
					<el-table-column label="库存">
						<template #default="scope">
							<el-form-item label="" :rules="[{ required: true, message: ' ' }]"
								:prop="'model.spec_many.spec_list.' + scope.$index + '.spec_form.stock_num'"
								style="margin-bottom: 0;">
								<el-input size="small" prop="stock_num"
									v-model="scope.row.spec_form.stock_num"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column label="重量(kg)">
						<template #default="scope">
							<el-form-item label="" :rules="[{ required: true, message: ' ' }]"
								:prop="'model.spec_many.spec_list.' + scope.$index + '.spec_form.product_weight'"
								style="margin-bottom: 0;">
								<el-input size="small" prop="product_weight"
									v-model="scope.row.spec_form.product_weight"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-form-item>
		<!--上传图片组件-->
		<Upload v-if="isupload" :isupload="isupload" @returnImgs="returnImgsFunc">上传图片</Upload>
	</div>
</template>

<script>
import Upload from '@/components/file/Upload.vue';
export default {
	components: {
		Upload
	},
	data() {
		return {
			/*批量设置sku属性*/
			batchData: {
				product_price: '',
				line_price: '',
				stock_num: '',
				product_weight: ''
			},
			/*图片是否打开*/
			isupload: false,
			//上传图片选择的下标
			spec_index: -1
		};
	},
	inject: ['form'],
	created() {

	},
	methods: {

		/*表格跨行*/
		objectSpanMethod({
			row,
			column,
			rowIndex,
			columnIndex
		}) {
			var spec_attr = this.form.model.spec_many.spec_attr;
			// 规格组合总数 (table行数)
			var totalRow = 1;
			//比如2个规格,只有第一列有多行
			if (columnIndex < spec_attr.length - 1) {
				let startRowIndex = columnIndex + 1;
				let endRowIndex = spec_attr.length - 1;
				for (var i = startRowIndex; i <= endRowIndex; i++) {
					totalRow *= spec_attr[i].spec_items.length;
				}
				if (rowIndex % totalRow === 0) {
					return {
						rowspan: totalRow,
						colspan: 1
					};
				} else {
					return {
						rowspan: 0,
						colspan: 0
					};
				}
			}
		},

		/*批量设置sku属性*/
		onSubmitBatchData: function() {
			var self = this;
			self.form.model.spec_many.spec_list.forEach(function(value) {
				for (var key in self.batchData) {
					if (self.batchData.hasOwnProperty(key) && self.batchData[key]) {
						// self.$set(value.spec_form, key, self.batchData[key]);
						value.spec_form[key] = self.batchData[key];
					}
				}
			});
		},

		/*选择图片*/
		chooseSpecImage: function(spec_index) {
			this.isupload = true;
			this.spec_index = spec_index;
		},

		/*返回图片*/
		returnImgsFunc(e) {
			this.isupload = false;
			this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_id = e[0]['file_id'];
			this.form.model.spec_many.spec_list[this.spec_index].spec_form.image_path = e[0]['file_path'];
			// this.$set(this.form.model.spec_many.spec_list[this.spec_index].spec_form, 'image_id', e[0]['file_id']);
			// this.$set(this.form.model.spec_many.spec_list[this.spec_index].spec_form, 'image_path', e[0]['file_path']);
		}
	}
};
</script>

<style>
</style>