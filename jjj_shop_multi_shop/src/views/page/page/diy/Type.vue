<template>
	<div v-if="defaultData!=null">
		<div class="common-form">组件库</div>
		<div class="min-group">
			<div v-for="(group,key) in typeList" :key="key">
				<div class="hd">{{ typename(key) }}</div>
				<div class="bd">
					<div class="item" v-for="(item,index) in group.children" @click="$parent.onAddItem(item.type)">
						<p class="p-icon icon iconfont icon-tuichu"></p>
						<p class="p-txt">{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			/*类别列表*/
			typeList: null
		};
	},
	props: {
		defaultData: Object
	},
	created() {
		this.init();
	},
	// filters: {

	// 	/*组名转换成中文*/
	// 	typename: function(type) {
	// 		let name = '';
	// 		if (type == 'media') {
	// 			name = '媒体组件';
	// 		} else if (type == 'shop') {
	// 			name = '商城组件';
	// 		} else if (type == 'tools') {
	// 			name = '工具组件';
	// 		}
	// 		return name;
	// 	}

	// },
	methods: {

		/*初始化数据*/
		init() {
			let tempList = {};
			console.log(11111111);
			console.log(this.defaultData);
			for (let key in this.defaultData) {
				let item = this.defaultData[key];
				if (!tempList.hasOwnProperty(item.group)) {
					tempList[item.group] = {};
					tempList[item.group].children = [];
				}
				tempList[item.group].children.push(item);
			}
			this.typeList = tempList;
			console.log(this.typeList);
		},
		typename(type){
			let name = '';
			if (type == 'media') {
				name = '媒体组件';
			} else if (type == 'shop') {
				name = '商城组件';
			} else if (type == 'tools') {
				name = '工具组件';
			}
			return name;
		}
	}
};
</script>
<style lang="scss" scoped>
	// @import '@/styles/page/diy.scss'; 
</style>