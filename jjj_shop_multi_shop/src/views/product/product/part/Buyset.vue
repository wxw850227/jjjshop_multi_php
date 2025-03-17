<template>
	<div class="basic-setting-content pl16 pr16">
		<!--其他设置-->
		<div class="common-form">其他设置</div>
		<el-form-item label="商品属性：">
			<el-radio-group v-model="form.model.is_virtual">
				<el-radio :label="0">实物商品</el-radio>
				<el-radio :label="1">虚拟商品(无需发货)</el-radio>
				<el-radio :label="2">计次商品(无需发货)</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="运费模板：" prop="model.delivery_id" v-if="form.model.is_virtual==0">
			<el-radio-group v-model="form.model.is_delivery_free" disabled>
				<el-radio :label="0">包邮</el-radio>
				<el-radio :label="1">运费模板</el-radio>
			</el-radio-group>
			<el-select v-model="form.model.delivery_id" v-if="form.model.is_delivery_free == 1" disabled>
				<el-option v-for="item in form.delivery" :value="item.delivery_id" :key="item.delivery_id"
					:label="item.name"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="初始销量：">
			<el-input type="number" min="0" v-model="form.model.sales_initial" class="max-w460"></el-input>
		</el-form-item>
		<el-form-item label="商品排序：" :rules="[{ required: true, message: ' ' }]" prop="model.product_sort">
			<el-input type="number" min="0" v-model="form.model.product_sort" class="max-w460"></el-input>
		</el-form-item>
		<el-form-item label="限购数量：" :rules="[{ required: true, message: ' ' }]" prop="model.limit_num">
			<el-input type="number" min="0" v-model="form.model.limit_num" class="max-w460"></el-input>
			<div class="gray9">每个会员购买的最大数量，0为不限购</div>
		</el-form-item>
		<el-form-item label="发货类型：" v-if="form.model.is_virtual==1">
			<el-radio-group v-model="form.model.virtual_auto">
				<el-radio :label="1">自动</el-radio>
				<el-radio :label="0">手动</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="虚拟内容：" :rules="[{ required: true, message: '请填写虚拟内容' }]" prop="model.virtual_content"
			v-if="form.model.is_virtual==1">
			<el-input type="text" v-model="form.model.virtual_content" class="max-w460"></el-input>
			<div class="gray9">虚拟物品内容</div>
		</el-form-item>
		<el-form-item label="会员等级限制：">
			<el-select v-model="form.model.grade_ids" multiple placeholder="请选择" style="width: 460px;">
				<el-option v-for="item in form.gradeList" :key="item.grade_id" :label="item.name"
					:value="item.grade_id">
				</el-option>
			</el-select>
			<div class="gray9">仅设置的等级会员可购买，不设置则都可以购买</div>
		</el-form-item>
		<!--积分设置-->
		<div class="common-form mt50">积分设置</div>
		<el-form-item label="是否开启积分赠送：">
			<el-radio-group v-model="form.model.is_points_gift">
				<el-radio :label="1">开启</el-radio>
				<el-radio :label="0">关闭</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="是否允许使用积分抵扣：">
			<el-radio-group v-model="form.model.is_points_discount">
				<el-radio :label="1">允许</el-radio>
				<el-radio :label="0">不允许</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item v-if="form.model.is_points_discount == 1" label="最大抵扣积分数量："
			:rules="[{ required: true, message: ' ' }]" prop="model.max_points_discount">
			<el-input type="number" min="0" v-model="form.model.max_points_discount" class="max-w460"></el-input>
		</el-form-item>
		<!--会员折扣设置-->
		<div class="common-form mt50">会员折扣设置</div>
		<el-form-item label="是否开启会员折扣：">
			<el-radio-group v-model="form.model.is_enable_grade">
				<el-radio :label="1">开启</el-radio>
				<el-radio :label="0">关闭</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="会员折扣设置：">
			<el-radio-group v-model="form.model.is_alone_grade">
				<el-radio :label="0">默认折扣</el-radio>
				<el-radio :label="1">单独设置折扣</el-radio>
			</el-radio-group>
			<div class="gray9" v-if="form.model.is_alone_grade==0">默认折扣：默认为用户所属会员等级的折扣率</div>
		</el-form-item>

		<el-form-item label="折扣佣金类型：" v-if="form.model.is_alone_grade==1">
			<el-radio-group v-model="form.model.alone_grade_type" @change="changeGradeType">
				<el-radio :label="10">百分比</el-radio>
				<el-radio :label="20">固定金额</el-radio>
			</el-radio-group>
		</el-form-item>

		<el-form-item label="" v-if="form.model.is_alone_grade==1">
			<div class="max-w460 ww100">
				<el-table :data="form.gradeList" border size="mini" style="width: 100%">
					<el-table-column prop="name" label="会员等级">
					</el-table-column>
					<el-table-column prop="name" label="折扣">
						<template v-slot="scope">
							<div class="d-s-c">
								<el-input v-model="scope.row.product_equity" type="number"
									placeholder="请输入折扣"></el-input>
								<span class="ml10">{{ grade_unit }}</span>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-form-item>
		<!--分销设置-->
		<div class="common-form mt50" v-if="form.basicSetting.is_open == 1">分销设置</div>
		<el-form-item label="是否开启分销：" v-if="form.basicSetting.is_open == 1">
			<el-radio-group v-model="form.model.is_agent">
				<el-radio :label="0">关闭</el-radio>
				<el-radio :label="1">开启</el-radio>
			</el-radio-group>
		</el-form-item>
		<template v-if="form.model.is_agent === 1">
			<el-form-item label="分销规则：" v-if="form.basicSetting.is_open == 1">
				<el-radio-group v-model="form.model.is_ind_agent">
					<el-radio :label="0">平台规则</el-radio>
					<el-radio :label="1">单独规则</el-radio>
				</el-radio-group>
				<div class="gray9">平台规则：层级({{form.basicSetting.level}}级)
					<span v-if="form.basicSetting.level >= 1"
						style="padding-left: 10px;">1级佣金({{form.agentSetting.first_money}}%)</span>
					<span v-if="form.basicSetting.level >= 2"
						style="padding-left: 10px;">2级佣金({{form.agentSetting.second_money}}%)</span>
					<span v-if="form.basicSetting.level >= 3"
						style="padding-left: 10px;">3级佣金({{form.agentSetting.third_money}}%)</span>
				</div>
			</el-form-item>
			<template v-if="form.model.is_ind_agent === 1 && form.basicSetting.is_open == 1">
				<el-form-item label="分销佣金类型：">
					<el-radio-group v-model="form.model.agent_money_type" @change="changeMoneyType">
						<el-radio :label="10">百分比</el-radio>
						<el-radio :label="20">固定金额</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="单独分销设置：">
					<el-input type="number" min="0" v-model="form.model.first_money" class="max-w460">
						<template #prepend>
							一级佣金：
						</template>
						<template #append>
							{{ unit }}
						</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="form.basicSetting.level >= 2">
					<el-input type="number" min="0" v-model="form.model.second_money" class="max-w460">
						<template #prepend>
							二级佣金：
						</template>
						<template #append>
							{{ unit }}
						</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="form.basicSetting.level >= 3">
					<el-input type="number" min="0" v-model="form.model.third_money" class="max-w460">
						<template #prepend>
							三级佣金：
						</template>
						<template #append>
							{{ unit }}
						</template>
					</el-input>
				</el-form-item>
			</template>
		</template>

	</div>
</template>

<script>
export default {
	data() {
		return {
			unit: '%',
			grade_unit: '%'
		};
	},
	created() {
		if (this.form.model.alone_grade_type == '20') {
			this.grade_unit = '元';
		}
		if (this.form.model.agent_money_type == '20') {
			this.unit = '元';
		}
	},
	inject: ['form'],
	methods: {
		/*换算单位*/
		changeMoneyType: function(val) {
			if (val == '10') {
				this.unit = '%';
			} else {
				this.unit = '元';
			}
		},
		/*换算单位*/
		changeGradeType: function(val) {
			if (val == '10') {
				this.grade_unit = '%';
			} else {
				this.grade_unit = '元';
			}
		}
	}
};
</script>

<style></style>