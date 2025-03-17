<template>
	<div class="sales-product-box mt30">
		<div class="common-form">商品统计</div>
		<div class="d-s-stretch bd-box">
			<div class="d-s-c d-c left-box">
				<Total></Total>
				<LineChart></LineChart>
			</div>
			<Ranking></Ranking>
		</div>
	</div>
</template>

<script>
import Total from './product/Total.vue';
import LineChart from './product/LineChart.vue';
import Ranking from './product/Ranking.vue';
export default {
	components: {
		Total,
		LineChart,
		Ranking
	}
};
</script>

<style>
	.sales-product-box .bd-box {
		border-top: 1px solid #EEEEEE;
	}

	.sales-product-box .left-box {
		width: 69%;
		border-right: 1px solid #EEEEEE;
	}
</style>