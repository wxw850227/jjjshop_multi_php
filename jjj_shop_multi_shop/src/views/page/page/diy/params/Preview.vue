<template>
    <div>
        <div class="common-form">
            <span>{{ curItem.name }}</span>
        </div>
        <el-form size="small" :model="curItem" label-width="100px">
            <!--显示数量-->
            <el-form-item label="显示数量：">
                <el-input v-model="curItem.params.showNum" class="w-auto"></el-input>
            </el-form-item>
            <!-- 文字颜色 -->
            <el-form-item label="时间颜色：">
                <div class="d-s-c">
                    <el-color-picker v-model="curItem.style.countdown_color"></el-color-picker>
                    <el-button type="button" style="margin-left: 10px;"
                        @click.stop="$parent.onEditorResetColor(curItem.style, 'countdown_color', '#ff4c01')">重置
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="价格颜色：">
                <div class="d-s-c">
                    <el-color-picker v-model="curItem.style.color"></el-color-picker>
                    <el-button type="button" style="margin-left: 10px;"
                        @click.stop="$parent.onEditorResetColor(curItem.style, 'color', '#ff4c01')">重置
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="时间背景颜色：">
                <div class="d-s-c">
                    <el-color-picker v-model="curItem.style.countdown_back_color"></el-color-picker>
                    <el-button type="button" style="margin-left: 10px;"
                        @click.stop="$parent.onEditorResetColor(curItem.style, 'countdown_back_color', '#fef7e4')">重置
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="背景颜色：">
                <div class="d-s-c">
                    <el-color-picker v-model="curItem.style.background_color"></el-color-picker>
                    <el-button type="button" style="margin-left: 10px;"
                        @click.stop="$parent.onEditorResetColor(curItem.style, 'background_color', '#ff4c01')">重置
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="背景顶部图片：">
              <el-col class="diy-notice-icon">
                <img v-img-url="curItem.style.background_image" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'background_image')">
              </el-col>
              <el-col>建议尺寸710×90</el-col>
            </el-form-item>
            <el-form-item label="倒计时脚标：">
              <el-col class="diy-notice-icon">
                <img v-img-url="curItem.style.top_image" alt="" @click="$parent.onEditorSelectImage(curItem.style, 'top_image')">
              </el-col>
              <el-col>建议尺寸102×38</el-col>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        data() {
            return {
            };
        },
        props: ['curItem', 'selectedIndex'],
        created() {

        },
        methods: {

        }
    };
</script>

<style>
</style>
