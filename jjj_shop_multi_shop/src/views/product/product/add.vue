<template>
	<div class="product-add">
		<!--form表单-->
		<el-form size="small" ref="form" :model="form" label-width="180px">
			<!--基础信息-->
			<Basic></Basic>

			<!--规格设置-->
			<Spec></Spec>

			<!--商品详情-->
			<Content></Content>

			<!--高级设置-->
			<Buyset></Buyset>

			<!--提交-->
			<div class="common-button-wrapper">
				<el-button size="small" type="info" @click="cancelFunc">取消</el-button>
				<el-button size="small" type="primary" @click="onSubmit" :loading="loading">发布</el-button>
				<el-button size="small" type="primary" @click="Draft" :loading="loading">保存为草稿</el-button>
			</div>
		</el-form>
	</div>
</template>

<script>
import {
	addProduct,
	getBaseData
} from '@/api/product.js';
import Basic from './part/Basic.vue';
import Spec from './part/Spec.vue';
import Content from './part/Content.vue';
import Buyset from './part/Buyset.vue';
export default {
	components: {
		/*基础信息*/
		Basic,
		/*规格信息*/
		Spec,
		/*商品详情*/
		Content,
		/*高级设置*/
		Buyset
	},
	data() {
		return {
			/*是否正在加载*/
			loading: false,
			/*form表单数据*/
			form: {
				model: {
					/*商品名称*/
					product_name: '',
					/*商品分类*/
					category_id: null,
					/*商品图片*/
					image: [],
					/*商品卖点*/
					selling_point: '',
					/*规格类别,默认10单规格，20多规格*/
					spec_type: 10,
					/*库存计算方式,默认20付款减库存，10下单减库存*/
					deduct_stock_type: 20,
					/*检查用户等级*/
					is_alone_grade: 0,
					sku: {},
					/*多规格类别*/
					spec_many: {
						/*多规格类别*/
						spec_attr: [],
						/*多规格表格数据*/
						spec_list: []
					},
					/*商品详情内容*/
					content: '',
					/*运费模板ID*/
					delivery_id: '',
					/*商品状态*/
					product_status: 10,
					/*初始销量*/
					sales_initial: 0,
					/*商品排序，默认100*/
					product_sort: 100,
					/*是否开启积分赠送,默认1为开启，0为关闭*/
					is_points_gift: 1,
					/*是否允许使用积分抵扣,默认1为允许，0为不允许*/
					is_points_discount: 1,
					/*最大积分抵扣数量*/
					max_points_discount: 0,
					/*会员折扣设置,默认1为单独设置折扣,0为默认折扣*/
					is_enable_grade: 1,
					/*等级金额类型,默认10为百分比，20为固定金额*/
					alone_grade_type: 10,
					/*限购会员*/
					grade_ids: [],
					/*是否开启单独分销,默认0为关闭，1为开启*/
					is_ind_agent: 0,
					/*分销佣金类型,默认10为百分比，20为固定金额*/
					agent_money_type: 10,
					/*一级佣金*/
					first_money: 0,
					/*二级佣金*/
					second_money: 0,
					/*三级佣金*/
					third_money: 0,
					/*是否虚拟商品*/
					is_virtual: 0,
					/*限购数量*/
					limit_num: 0,
					/*虚拟商品发货方式*/
					virtual_auto: 0,
					/*虚拟商品发货内容*/
					virtual_content: '',
					/*商品预告*/
					is_preview: 0,
					/*商品预告时间*/
					preview_time: '',
				},
				/*商品分类*/
				catgory: [],
				/*运费模板*/
				delivery: [],
				/*会员等级*/
				gradeList: [],
				/*规格数据*/
				specData: null,
				/*是否锁住*/
				isSpecLocked: false
			}
		};
	},
	provide: function() {
		return {
			form: this.form
		};
	},
	created() {

		/*获取基础数据*/
		this.getBaseDataFunc();

	},
	methods: {

		/*获取基础数据*/
		getBaseDataFunc: function() {
			let self = this;
			getBaseData({}, true)
				.then(res => {
					self.loading = false;
					Object.assign(self.form, res.data);
				})
				.catch(error => {
					self.loading = false;
				});
		},

		/*转JSON字符串*/
		convertJson(list) {
			let obj = {};
			list.forEach(item => {
				obj[item.grade_id] = item.product_equity;
			});
			return JSON.stringify(obj);
		},

		/*提交*/
		onSubmit: function() {
			let self = this;
			let params = self.form.model;
			self.$refs.form.validate(valid => {
				if (valid) {
					self.loading = true;
					params.alone_grade_equity = self.convertJson(self.form.gradeList);
					addProduct({
						params: JSON.stringify(params)
					}, true)
						.then(data => {
							self.loading = false;
							ElMessage({
								message: '添加成功',
								type: 'success'
							});
							self.$router.push('/product/product/index');
						})
						.catch(error => {
							self.loading = false;
						});
				} else {
					ElMessage({
						message: '请检查必填项是否填写完整',
						type: 'error'
					});
				}
			});
		},

		/*保存为草稿*/
		Draft() {
			let self = this;
			self.form.model.product_status = 30;
			self.onSubmit();
		},

		/*取消*/
		cancelFunc() {
			this.$router.back(-1);
		}

	}
};
</script>

<style lang="scss" scoped>
	.basic-setting-content {}

	.product-add {
		padding-bottom: 100px;
	}
</style>