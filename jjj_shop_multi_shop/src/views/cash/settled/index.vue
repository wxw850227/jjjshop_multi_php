<template>
    <div v-loading="loading" style="min-height: 400px;">
      <!--汇总-->
      <Total v-if="!loading"></Total>
      <!--访问统计-->
     <Transaction v-if="!loading"></Transaction>
    </div>
</template>

<script>
import {settled} from '@/api/cash.js';
import Total from './part/Total.vue';
import Transaction from './part/Transaction.vue';
export default{
	components:{
		Total,
		Transaction,
	},
	data(){
		return{
			/*是否正在加载*/
			loading:true,
			/*数据对象*/
			dataModel:{}
		};
	},
	provide: function () {
		return {
			dataModel: this.dataModel
		};
	},
	created() {
		this.getData();
	},
	methods:{
		/*获取数据*/
		getData() {
			let self = this;
			settled({}, true)
				.then(res => {
					Object.assign(self.dataModel, res.data);
					self.loading = false;
				})
				.catch(error => {});
		}
	}
};
</script>

<style>
</style>
