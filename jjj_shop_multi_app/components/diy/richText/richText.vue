<template>
	<view>
		<view class="diy-richText" :style="{background: itemData.style.background, padding: itemData.style.paddingTop + 'px ' + itemData.style.paddingLeft + 'px'}"
		  v-html="formatContent(itemData.params.content)">
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	export default {
		data() {
			return {
				
			}
		},
		props:['itemData'],
		created(){
		},
		methods: {
			formatContent(e){
				return utils.format_content(e);
			}
		}
	}
</script>

<style>

</style>
