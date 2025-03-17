<template>
    <el-dialog v-model="show" title="试卷详情" width="800" :before-close="close" class="noBg">
        <el-scrollbar height="400px">
            <el-form :model="form" label-width="110px" :rules="rules" ref="formRef">
                <el-card shadow="never">
                    <template #header>
                        <div class="cardHeader">
                            基本信息
                        </div>
                    </template>
                    <el-form-item label="试卷分类" prop="name">
                        三级安全教育试卷>asdad
                    </el-form-item>
                    <el-form-item label="试卷名称" prop="name">
                        55555
                    </el-form-item>
                    <el-form-item label="是否保密" prop="name">
                        <el-radio-group v-model="form.type333" disabled>
                            <el-radio :label="1">分值统计</el-radio>
                            <el-radio :label="2">比例统计</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="难度系数" prop="name">
                        <el-radio-group v-model="form.type333" disabled>
                            <el-radio :label="1">1-及易</el-radio>
                            <el-radio :label="2">2-较易</el-radio>
                            <el-radio :label="2">3-一般</el-radio>
                            <el-radio :label="2">4-较难</el-radio>
                            <el-radio :label="2">5-极准</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="时长设置" prop="name">
                        60分钟,考生必须在设置的考试时间的时间内完成考试。
                    </el-form-item>
                    <el-form-item label="评估方式" prop="name">
                        <el-radio-group v-model="form.type333" disabled>
                            <el-radio :label="1">分值统计</el-radio>
                            <el-radio :label="2">比例统计</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="评估值" prop="name">
                        <span v-if="true">60(%)比例，通过。按总分计算百分比统计评估结果。</span>
                        <span v-else>60分，可通过考核。</span>
                        
                    </el-form-item>
                    <el-form-item label="试卷说明" prop="name">
                        暂无
                    </el-form-item>
                </el-card>
                <el-card shadow="never" class="mt-defaul">
                    <template #header>
                        <div class="cardHeader">
                            选题设置
                        </div>
                    </template>
                    <el-form-item label="试题筛选" prop="fileId">
                        <el-radio-group v-model="form.type222">
                            <el-radio :label="0">不限</el-radio>
                            <el-radio :label="1">单选题</el-radio>
                            <el-radio :label="2">多选题</el-radio>
                            <el-radio :label="3">判断题</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-button type="danger" link>总题数(43道)</el-button>
                    <el-button type="danger" link class="mr-small">总分数(213分) </el-button>
                    <span class="mr-small">单选题(7) </span>
                    <span class="mr-small">多选题(7) </span>
                    <span class="mr-small">判断题(7) </span>

                    <el-table :data="form.exam" border style="margin-top: 6px">
                        <el-table-column prop="name" label="试题名称" width="400" />
                        <el-table-column prop="img" label="题目图片">
                            <template #default="{ row }">
                                <img :src="row.img" class="tableImg" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="试题类型" />
                        <el-table-column prop="score" label="分值" />
                        <el-table-column prop="difficulty" label="难度" />
                    </el-table>
                </el-card>
            </el-form>
        </el-scrollbar>

        <template #footer>
            <el-button @click="close"> 取消 </el-button>
        </template>
    </el-dialog>
</template>
<script>
import { reactive, toRefs, defineComponent, ref } from 'vue';
import { appointFileAdd, appoinFiletEdit } from '@/api/enterprise';
export default defineComponent({
	components: {},
	setup() {
		const state = reactive({
			show: false,
			form: {},
		});
		const open = () => {
			state.form = {
				exam:[
					{
						name: '建设项目安全设施的施工应当由取得相应资质的施工单位进行，并与建设项目主体工程同时施工。 （）',
						img: 'https://img2.baidu.com/it/u=3852445477,1258821849&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1682269200&t=b20b8a4126b5b36b6646d2a5729477a7',
						type: '判断题',
						score: 3,
						difficulty: '一般'
					}
				]
			};
			state.show = true;
		};
		return {
			...toRefs(state),
			open,
		};
	},
	methods: {
		close(){
			this.show = false;
		}
	}
});
</script>
<style scoped></style>
    