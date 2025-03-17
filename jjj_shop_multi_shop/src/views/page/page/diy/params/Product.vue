<template>
	<div>
		<div class="common-form">
			<span>{{ curItem.name }}</span>
		</div>
		<el-form size="small" :model="curItem" label-width="100px">
			<el-form-item label="商品来源：">
				<el-radio-group v-model="curItem.params.source">
					<el-radio :label="'auto'">自动获取</el-radio>
					<el-radio :label="'choice'">手动选择</el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- 自动获取 -->
			<template v-if="curItem.params.source == 'auto'">
				<!-- 商品分类 -->
				<el-form-item label="商品分类：">
					<el-cascader class="ww100" v-model="currCategory" v-if="CategoryList.length > 0" ref="cascader"
						:options="CategoryList"
						:props="{ checkStrictly: true, children: 'child', value: 'category_id', label: 'name' }"
						@change="changeCategory" clearable></el-cascader>
				</el-form-item>
				<!-- 商品排序 -->
				<el-form-item label="商品排序：">
					<el-radio-group v-model="curItem.params.auto.productSort">
						<el-radio :label="'all'">综合</el-radio>
						<el-radio :label="'sales'">销量</el-radio>
						<el-radio :label="'price'">价格</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 显示数量 -->
				<el-form-item label="显示数量："><el-input v-model="curItem.params.auto.showNum"
						class="w-auto"></el-input></el-form-item>
			</template>
			<!-- 手动选择 -->
			<template v-if="curItem.params.source == 'choice'">
				<el-form-item label="商品列表：">
					<el-col class="choice-product-list">
						<draggable :list="curItem.data"  item-key="id" class="draggable-list">
							<template #item="{element,index}">
								<div class="item" v-if="!element.is_default">
									<img v-img-url="element.image" />
									<a href="javascript:void(0);" class="delete-box"
										@click.stop="$parent.onEditorDeleleData(index, selectedIndex)">
										<el-icon><CircleCloseFilled /></el-icon>
									</a>
								</div>
							</template>
						</draggable>
					</el-col>
					<el-col>
						<el-button icon="Plus" @click.stop="$parent.openProduct(curItem.data,true)">选择产品</el-button>
					</el-col>
				</el-form-item>
			</template>
			<!--组件样式-->
			<div class="p-10-0 mb16 border-b"><span class="gray6 f14">组件样式</span></div>

			<!-- 背景颜色 -->
			<el-form-item label="背景颜色：">
				<div class="d-s-c">
					<el-color-picker v-model="curItem.style.background"></el-color-picker>
					<el-button type="button" style="margin-left: 10px;"
						@click.stop="$parent.onEditorResetColor(curItem.style, 'background', '#F6F6F6')">重置</el-button>
				</div>
			</el-form-item>

			<!-- 商品排序 -->
			<el-form-item label="商品排序：">
				<el-radio-group v-model="curItem.style.display">
					<el-radio :label="'list'">列表平铺</el-radio>
					<el-radio :label="'slide'" :disabled="curItem.style.column == 1">横向滑动</el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- 商品排序 -->
			<el-form-item label="分列数量：">
				<el-radio-group v-model="curItem.style.column">
					<el-radio label="1" :disabled="curItem.style.display == 'slide'">单列</el-radio>
					<el-radio label="2">两列</el-radio>
					<el-radio label="3">三列</el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- 商品排序 -->
			<el-form-item label="显示内容：">
				<el-checkbox v-model="productNameShow"
					@change="checked => check(checked, 'productName')">商品名称</el-checkbox>
				<el-checkbox v-model="productPriceShow"
					@change="checked => check(checked, 'productPrice')">商品价格</el-checkbox>
				<el-checkbox v-model="linePriceShow" @change="checked => check(checked, 'linePrice')">划线价格</el-checkbox>
				<el-checkbox v-model="sellingPointShow" @change="checked => check(checked, 'sellingPoint')"
					v-show="curItem.style.column == 1">商品卖点</el-checkbox>
				<el-checkbox v-model="productSalesShow" @change="checked => check(checked, 'productSales')"
					v-show="curItem.style.column == 1">商品销量</el-checkbox>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		catList
	} from '@/api/product.js';
	import draggable from 'vuedraggable';
	export default {
		components: {
			draggable
		},
		data() {
			return {
				/*是否正在加载*/
				loading: true,
				/*商品类别*/
				CategoryList: [],
				/*当前选中的*/
				currCategory: [],
				productNameShow: false,
				productPriceShow: false,
				linePriceShow: false,
				sellingPointShow: false,
				productSalesShow: false
			};
		},
		props: ['curItem', 'selectedIndex', 'opts'],
		created() {
			/*获取列表*/
			this.getData();
			this.productNameShow = this.curItem.style.show.productName == 1 ? true : false;
			this.productPriceShow = this.curItem.style.show.productPrice == 1 ? true : false;
			this.linePriceShow = this.curItem.style.show.linePrice == 1 ? true : false;
			this.sellingPointShow = this.curItem.style.show.sellingPoint == 1 ? true : false;
			this.productSalesShow = this.curItem.style.show.productSales == 1 ? true : false;
		},
		watch: {
			selectedIndex: function(n, o) {
				this.currCategory = this.currCategoryAuto(this.CategoryList);
			}
		},
		methods: {
			/*获取商品*/
			getData() {
				let self = this;
				catList({
							page_id: self.page_id
						},
						true
					)
					.then(res => {
						self.CategoryList = res.data.list;
						self.currCategory = self.currCategoryAuto(res.data.list);
						self.loading = false;
					})
					.catch(error => {
						self.loading = false;
					});
			},

			/*选择默认*/
			currCategoryAuto(list) {
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					let item = list[i];
					if (item.category_id == this.curItem.params.auto.category) {
						arr.push(item.category_id);
						break;
					} else {
						if (Object.prototype.toString.call(item.child) == '[object Array]' && item.child.length > 0) {
							for (let j = 0; j < item.child.length; j++) {
								if (item.child[j].category_id == this.curItem.params.auto.category) {
									arr.push(item.category_id);
									arr.push(item.child[j].category_id);
									break;
								}
							}
						}
					}
				}
				return arr;
			},

			/*检查*/
			check(checked, name) {
				let value = checked ? 1 : 0;
				this.curItem.style.show[name] = value;
			},

			/*选择类别*/
			changeCategory(e) {
				if (e.length > 0) {
					let item = this.$refs['cascader'].getCheckedNodes();
					this.curItem.params.auto.category = item[0].data.category_id;
				} else {
					this.curItem.params.auto.category = 0;
				}
			}
		}
	};
</script>

<style>
	.choice-product-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.choice-product-list .item {
		position: relative;
		width: 80px;
		height: 80px;
		margin-right: 10px;
		margin-bottom: 10px;
		border: 1px solid #dddddd;
	}

	.choice-product-list .item .delete-box {
		position: absolute;
		width: 20px;
		height: 20px;
		top: -10px;
		right: -10px;
		font-size: 20px;
		cursor: pointer;
		color: #999999;
	}

	.choice-product-list .item .delete-box:hover {
		color: rgb(255, 51, 0);
		
	}

	.choice-product-list .item.plus-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.choice-product-list .item.plus-btn>i {
		font-size: 30px;
		color: #cccccc;
	}

	.choice-product-list img {
		width: 100%;
		height: 100%;
	}
</style>