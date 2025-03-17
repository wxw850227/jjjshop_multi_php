import {
	createApp
} from 'vue'
import router from "./router";
import "../static/css/app.css";
import "../static/css/common.css";
import {
	createPinia
} from 'pinia'
const pinia = createPinia();
import {
	setupRouter
} from "@/router";
import {
	setup
} from '../plugins/elementPlus';
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import tagGroup from "./components/tagGroup.vue";
import {
	loadDirectives
} from "@/directive"
import VueUeditorWrap from 'vue-ueditor-wrap'
import filters from '@/filters/index.js' 
// import * as echarts from 'echarts'
const app = createApp(App);
/** 加载自定义指令 */
loadDirectives(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(VueUeditorWrap)
app.use(pinia)
app.use(router)
app.mount('#app')
app.component("tagGroup", tagGroup)
app.config.globalProperties.$filter = filters;
// app.config.globalProperties.$echarts = echarts; 
setupRouter(app);
setup(app);