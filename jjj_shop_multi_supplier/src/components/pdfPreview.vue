<template>
    <!-- <div class="pdf-preview">
        <div class="pdf-wrap"> -->
            <!-- <vue-pdf-embed 
                :source="state.source"
                :style="scale"
                class="vue-pdf-embed"
                :page="state.pageNum" 
            /> -->
            <!-- <vue-pdf-embed v-for="i in 4" :source="state.source " :key="i" :page="i"></vue-pdf-embed> -->
        <!-- </div> -->
        <!-- <div class="page-tool">
            <div class="page-tool-item" @click="lastPage">上一页</div>
            <div class="page-tool-item" @click="nextPage">下一页</div>
            <div class="page-tool-item">{{state.pageNum}}/{{state.numPages}}</div>
            <div class="page-tool-item" @click="pageZoomOut">放大</div>
            <div class="page-tool-item" @click="pageZoomIn">缩小</div>
        </div> -->
    <!-- </div> -->
    <iframe
        src="https://qn-cdn.jjjshop.net/20230406142606996.pdf"
        type="application/x-google-chrome-pdf"
        width="100%"
        height="400px"
    />
</template>
<script setup>
import { reactive, onMounted, computed } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { createLoadingTask } from "vue3-pdfjs/esm"; 
const props = defineProps({
    pdfUrl: {
        type: String,
        required: true
    }
})
const state = reactive({
    source: props.pdfUrl,
    pageNum: 1,
    scale: 1, // 缩放比例
    numPages: 0, // 总页数
});
onMounted(() => {
    const loadingTask = createLoadingTask(state.source);
    loadingTask.promise.then((pdf) => {
        state.numPages = pdf.numPages;
    });
});
const scale = computed(() => `transform:scale(${state.scale})`)
function lastPage() {
    if (state.pageNum > 1) {
        state.pageNum -= 1;
    }
}
function nextPage() {
    if (state.pageNum < state.numPages) {
        state.pageNum += 1;
    }
}
function pageZoomOut() {
    if (state.scale < 2) {
        state.scale += 0.1;
    }
}
function pageZoomIn() {
    if (state.scale > 1) {
        state.scale -= 0.1;
    }
}
function loadPdfHandler(){
    state.source.then((pdf)=>{
        console.log("pdf",pdf)
    })
}

</script>
<style lang="css" scoped>
.pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    box-sizing: border-box;
    background: rgb(66, 66, 66);
}

.vue-pdf-embed {
    text-align: center;
    width: 515px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
}

.pdf-preview {
    position: relative;
    height: 100vh;
    padding: 20px 0;
    box-sizing: border-box;
    background-color: e9e9e9;
}
.pdf-wrap{
    overflow-y:auto ;
}
.vue-pdf-embed {
    text-align: center;
    width: 515px;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
    box-sizing: border-box;
}

.page-tool {
    position: absolute;
    bottom: 35px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    background: rgb(66, 66, 66);
    color: white;
    border-radius: 19px;
    z-index: 100;
    cursor: pointer;
    margin-left: 50%;
    transform: translateX(-50%);
}
.page-tool-item {
    padding: 8px 15px;
    padding-left: 10px;
    cursor: pointer;
}
</style>