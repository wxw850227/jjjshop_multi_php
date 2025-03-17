<template>
    <!--活动规则-->
    <view class="p30">
        <view class="title">

        </view>
        <view class="content p30 bg-white f30 lh200 radius8"  v-html="detail">

        </view>
    </view>
</template>

<script>
	import utils from '@/common/utils.js';
    export default {
        data() {
            return {
                detail: '',
            }
        },
        mounted(){
            uni.showLoading({
                title: '加载中'
            });
            /*获取优惠券列表*/
            this.getData();
        },
        methods: {
            getData(){
                let self = this;
                self._get('plus.sign.sign/getSign', {}, function (res)
                {
					/*详情内容格式化*/
					res.data.detail =utils.format_content(res.data.detail);
					self.detail = res.data.detail;
                    uni.hideLoading();
                });
            }
        }
    }
</script>

<style>

</style>
