<template>
    <el-drawer v-model="show" :with-header="false" :size="1100">
        <div class="name">试卷名称</div>
        <div class="sub"> 考试时长:60分钟 总分值:213分 总题数:43题 </div>
        <div class="title" v-if="form.radio && form.radio.length > 0">
            一、单选题： 
        </div>
        <div class="exam" v-for="(v,index) in form.radio" :key="v">
            <el-row class="con">
                <el-row align="middle">
                    <div>{{index + 1}}、</div>
                    <div class="flexAuto">
                        非煤矿矿山建设项目；生产、储存危险化学品（包括使用长输管道输送危险化学品）的建设项目；生产、储存烟花爆竹的建设项目；金属冶炼建设项目；使用危险化学品从事生产并且使用量达到规定数量的化工建设项目（属于危险化学品生产的除外，简称化工建设项目）之外的其他建设项目，生产经营单位应当对其进行（  ），形成书面报告备查。 
                        <span>(5分)</span>
                    </div>
                </el-row>
            </el-row>
            <div class="option">
                <div>A.安全现状评价</div>
                <div>B.安全预评价</div>
                <div>C.安全生产条件和设施进行综合分析</div>
                <div>D.安全验收评价</div>
            </div>
            <div class="answer">
                <div><span class="pre">正确答案</span><span class="result">A</span></div>
                <div><span class="pre">分值</span><span class="result">5分</span></div>
                <div><span class="pre">解析</span> 暂无</div>
            </div>
        </div>
        <div class="title" v-if="form.check && form.check.length > 0">
            二、多选题： 
        </div>
        <div class="exam" v-for="(v,index) in form.check" :key="v">
            <el-row class="con">
                <el-row align="middle">
                    <div>{{(form.radio && form.radio.length || 0) + index + 1}}、</div>
                    <div class="flexAuto">
                        非煤矿矿山建设项目；生产、储存危险化学品（包括使用长输管道输送危险化学品）的建设项目；生产、储存烟花爆竹的建设项目；金属冶炼建设项目；使用危险化学品从事生产并且使用量达到规定数量的化工建设项目（属于危险化学品生产的除外，简称化工建设项目）之外的其他建设项目，生产经营单位应当对其进行（  ），形成书面报告备查。 
                        <span>(5分)</span>
                    </div>
                </el-row>
            </el-row>
            <div class="option">
                <div>A.安全现状评价</div>
                <div>B.安全预评价</div>
                <div>C.安全生产条件和设施进行综合分析</div>
                <div>D.安全验收评价</div>
            </div>
            <div class="answer">
                <div><span class="pre">正确答案</span><span class="result">A,D,E</span></div>
                <div><span class="pre">分值</span><span class="result">5分</span></div>
                <div><span class="pre">解析</span> 暂无</div>
            </div>
        </div>
        <div class="title" v-if="form.judge && form.judge.length > 0">
            三、判断题： 
        </div>
        <div class="exam" v-for="(v,index) in form.judge" :key="v">
            <el-row class="con">
                <el-row align="middle">
                    <div>{{(form.radio && form.radio.length || 0) + (form.check && form.check.length || 0) + index + 1}}、</div>
                    <div class="flexAuto">
                        非煤矿矿山建设项目；生产、储存危险化学品（包括使用长输管道输送危险化学品）的建设项目；生产、储存烟花爆竹的建设项目；金属冶炼建设项目；使用危险化学品从事生产并且使用量达到规定数量的化工建设项目（属于危险化学品生产的除外，简称化工建设项目）之外的其他建设项目，生产经营单位应当对其进行（  ），形成书面报告备查。 
                        <span>(5分)</span>
                    </div>
                </el-row>
            </el-row>
            <div class="option">
                <div>A.正确</div>
                <div>B.错误</div>
            </div>
            <div class="answer">
                <div><span class="pre">正确答案</span><span class="result">A</span></div>
                <div><span class="pre">分值</span><span class="result">5分</span></div>
                <div><span class="pre">解析</span> 暂无</div>
            </div>
        </div>
    </el-drawer>
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
				radio:[{},{},{},{},{},{}],
				check:[{},{},{},{},{},{}],
				judge:[{},{},{},{},{},{}],
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
<style scoped lang="scss">
.exam{
    background: rgba(64,158,255,.1);
    border-radius: 4px;
    border: 1px solid #c6e2ff;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    color: #606266;
}
.name{
    font-size: 16px;
    font-weight: bold;
}
.sub{
    margin:6px 0 10px 0;
}
.title{
    font-size: 16px;
    color: #409eff;
    line-height: 40px;
    font-weight: bold;
}
.con{
    font-weight: bold;
    font-size: 14px;
    div,span{
        font-size: inherit;
    }
}
.option{
    margin-top: 20px;
    margin-bottom: 12px;
    div{
        line-height: 20px;
    }
}
.answer{
    background: #ffffff;
    padding: 10px;
    border: 1px solid #c6e2ff;
    border-radius: 5px;
    margin-bottom: 10px;
    .pre{
        font-weight: bold;
        margin-right: 6px;
    }
    div{
        margin-bottom: 6px;
    }
    div:last-child{
        margin-bottom: 0;
    }
    .result{
        color: green;
        font-weight: bold;
    }
}

</style>
    