<template>
	<div class="spec-many-type">
		<!--规格属性-->
		<div class="spec-wrap">
			<template v-if="form.model.spec_many">
				<div class="mb16 min-spc" :key="index" v-for="(attr, index) in form.model.spec_many.spec_attr">
					<div class="spec-hd">
						<div class="input-box">{{ attr.group_name }}</div>
						<a href="javascript:void(0);" @click="onDeleteGroup(index)"><el-icon><DeleteFilled /></el-icon></a>
					</div>
					<div class="spec-bd">
						<div class="item" v-for="(items, i) in attr.spec_items" :key="i">
							<el-tag closable @close="onDeleteValue(index, i)">{{ items.spec_value }}</el-tag>
						</div>
						<div class="item"><el-input size="small" v-model="attr.tempValue"
								style="width: 160px;"></el-input>
						</div>
						<div class="item"><el-button size="small" @click="onSubmitAddValue(attr)"
								:loading="attr.loading">添加</el-button></div>
					</div>
				</div>
			</template>

			<!--添加规格-->
			<div v-if="!form.isSpecLocked">
				<el-button size="small" v-show="showAddGroupBtn"
					@click="onToggleAddGroupForm"><el-icon><CirclePlusFilled /></el-icon>添加规格</el-button>
			</div>
			<!--规格列表-->
			<div class="add-spec mb16" v-show="!showAddGroupBtn">
				<div class="from-box">
					<div class="item">
						<span class="key">规格名：</span>
						<el-input size="small" v-model="addGroupFrom.specName" placeholder="请输入规格名称"></el-input>
					</div>
					<div class="item">
						<span class="key">规格值：</span>
						<el-input size="small" v-model="addGroupFrom.specValue" placeholder="请输入规格值"></el-input>
					</div>
					<el-button type="primary" size="small" :loading="groupLoading" @click="onSubmitAddGroup"
						plain>确定</el-button>
					<el-button size="small" @click="onToggleAddGroupForm">取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		addSpec,
		addSpecValue
	} from '@/api/product.js';
	export default {
		data() {
			return {
				/*显示添加规格组按钮*/
				showAddGroupBtn: true,
				/*显示添加规格组表单*/
				showAddGroupForm: false,
				/*新增规格组值*/
				addGroupFrom: {
					specName: '',
					specValue: ''
				},
				groupLoading: false
			};
		},
		inject: ['form'],
		created() {
			/*获取列表*/
			if (this.form.model.spec_many && this.form.model.spec_many.spec_list.length > 0) {
				this.buildSkulist();
			}
		},
		methods: {

			/*显示/隐藏添加规则组 */
			onToggleAddGroupForm: function() {
				this.showAddGroupBtn = !this.showAddGroupBtn;
				this.showAddGroupForm = !this.showAddGroupForm;
			},

			/*表单提交：新增规格组 */
			onSubmitAddGroup: function() {
				let self = this;
				if (self.addGroupFrom.specName === '' || self.addGroupFrom.specValue === '') {
					ElMessage('请填写规则名或规则值');
					return false;
				}
				// 添加到数据库
				self.groupLoading = true;
				let Params = {
					spec_name: self.addGroupFrom.specName,
					spec_value: self.addGroupFrom.specValue
				};
				addSpec(Params)
					.then(res => {
						self.groupLoading = false;
						console.log(self.addGroupFrom);
						console.log('+++++++++++++++++++++');
						console.log(self.form.model.spec_many);
						console.log('-------------------');
						if (!self.form.model.spec_many) {
							self.form.model.spec_many = {
								spec_many: [],
								spec_attr: [],
							};
						}
						console.log(self.form.model.spec_many.spec_attr);
						// 记录规格数据
						self.form.model.spec_many.spec_attr.push({
							group_id: res.data.spec_id,
							group_name: self.addGroupFrom.specName,
							spec_items: [{
								item_id: res.data.spec_value_id,
								spec_value: self.addGroupFrom.specValue
							}],
							tempValue: '',
							loading: false
						});
						// 清空输入内容
						self.addGroupFrom.specName = '';
						self.addGroupFrom.specValue = '';
						console.log(self.form.model.spec_many.spec_attr);
						console.log(111);
						// 隐藏添加规则组
						self.onToggleAddGroupForm();
						console.log(222);
						// 构建规格组合列表
						self.buildSkulist();
					})
					.catch(() => {
						self.groupLoading = false;
					});
			},

			/*新增规格值*/
			onSubmitAddValue: function(specAttr) {
				let self = this;
				if (!specAttr.hasOwnProperty('tempValue') || specAttr.tempValue === '') {
					ElMessage('规格值不能为空');
					return false;
				}
				// 添加到数据库
				specAttr.loading = true;
				let Params = {
					spec_id: specAttr.group_id,
					spec_value: specAttr.tempValue
				};
				addSpecValue(Params, true)
					.then(data => {
						specAttr.loading = false;
						// 记录规格数据
						specAttr.spec_items.push({
							item_id: data.data['spec_value_id'],
							spec_value: specAttr.tempValue
						});
						// 清空输入内容
						specAttr.tempValue = '';
						// 构建规格组合列表
						self.buildSkulist();
					})
					.catch(() => {
						specAttr.loading = false;
					});
			},

			/*构建规格组合列表*/
			buildSkulist: function() {
				console.log('buildSkulist');
				let self = this;
				if (!self.form.model.spec_many) {
					self.form.model.spec_many = {
						spec_attr: []
					};
				}
				console.log(333333333)
				let spec_attr = self.form.model.spec_many.spec_attr;
				let specArr = [];
				for (let i = 0; i < spec_attr.length; i++) {
					specArr.push(spec_attr[i].spec_items);
				}

				let specListTemp = self.calcDescartes(specArr);
				console.log(444444444)
				let specList = [];
				for (let i = 0; i < specListTemp.length; i++) {
					let rows = [];
					let specSkuIdAttr = [];
					if (!Array.isArray(specListTemp[i])) {
						rows.push(specListTemp[i]);
					} else {
						rows = specListTemp[i];
					}
					for (let j = 0; j < rows.length; j++) {
						specSkuIdAttr.push(rows[j].item_id);
					}
					specList.push({
						product_sku_id: 0,
						spec_sku_id: specSkuIdAttr.join('_'),
						rows: rows,
						spec_form: {}
					});
				}
				console.log(5555555555)
				console.log(specList.length)
				console.log(self.form.model.spec_many)
				// 合并旧sku数据
				if (self.form.model.spec_many.spec_list && self.form.model.spec_many.spec_list.length > 0 && specList
					.length > 0) {
					console.log(self.form.model.spec_many.spec_list.length)
					for (let i = 0; i < specList.length; i++) {
						let overlap = self.form.model.spec_many.spec_list.filter(function(val) {
							return val.spec_sku_id === specList[i].spec_sku_id;
						});
						console.log(overlap)
						if (overlap.length > 0) {
							specList[i].spec_form = overlap[0].spec_form;
							specList[i].product_sku_id = overlap[0].product_sku_id;
						}
					}
				}
				console.log(66666666)
				self.form.model.spec_many.spec_list = specList;
				console.log(self.form.model.spec_many.spec_list);
			},

			/*规格组合*/
			calcDescartes: function(array) {
				if (array.length < 2) return array[0] || [];
				return [].reduce.call(array, function(col, set) {
					let res = [];
					col.forEach(function(c) {
						set.forEach(function(s) {
							let t = [].concat(Array.isArray(c) ? c : [c]);
							t.push(s);
							res.push(t);
						});
					});
					return res;
				});
			},

			/*删除规格组事件*/
			onDeleteGroup: function(index) {
				var self = this;
				ElMessageBox.confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// 删除指定规则组
						self.form.model.spec_many.spec_attr.splice(index, 1);
						// 构建规格组合列表
						self.buildSkulist();
					});
			},

			/*删除规格值值事件*/
			onDeleteValue: function(index, itemIndex) {
				let self = this;

				if (self.form.isSpecLocked) {
					ElMessage({
						message: '本商品正在参加活动，不能删除规格！',
						type: 'warning'
					});
					return;
				}

				ElMessageBox.confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						// 删除指定规则组
						self.form.model.spec_many.spec_attr[index].spec_items.splice(itemIndex, 1);
						// 构建规格组合列表
						self.buildSkulist();
					});
			}
		}
	};
</script>

<style scoped="scoped">
	::v-deep(.spec-wrap .el-tag){
		padding: 0 10px !important;
    	height: 32px  !important;
	}
	.spec-many-type {
		margin-left: 180px;
		margin-top: 16px;
		padding: 20px;
		border: 1px solid #e5ecf4;
		background: #f6f9fc;
	}

	.spec-wrap .spec-hd {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		font-weight: bold;
	}

	.spec-wrap .spec-hd .el-icon-delete-solid {
		font-size: 16px;
		color: #999999;
	}

	.spec-wrap .min-spc {
		border: 1px solid #dfecf8;
	}

	.spec-wrap .spec-bd {
		padding: 5px;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		border-top: 1px solid #dfecf8;
		background: #ffffff;
	}

	.spec-wrap .spec-bd .el-tag {
		color: #333333;
	}

	.spec-wrap .spec-bd .item {
		position: relative;
		padding: 5px;
	}

	.spec-wrap .spec-bd .item input {
		padding-right: 30px;
	}

	.spec-wrap .spec-hd a,
	.spec-wrap .spec-hd .svg-icon,
	.spec-wrap .spec-bd .item .svg-icon {
		display: block;
		width: 16px;
		height: 16px;
	}

	.spec-wrap .spec-bd .item a {
		position: absolute;
		top: 6px;
		right: 5px;
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.add-spec .from-box {
		display: flex;
		justify-content: flex-start;
	}

	.add-spec .item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 200px;
		margin-right: 20px;
	}

	.add-spec .item .key {
		display: block;
		white-space: nowrap;
	}
</style>