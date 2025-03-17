import { createApp } from 'vue';
import router from './router';
import './theme/iconfont.css';
import { createPinia } from 'pinia';
const pinia = createPinia();
import { setupRouter } from '@/router';
import { setup } from '../plugins/elementPlus';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// import tagGroup from './components/tagGroup.vue';
import filters from '@/filters/index'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.config.globalProperties.$filter = filters;
app.use(pinia);
app.use(router);
app.mount('#app');
// app.component('tagGroup',tagGroup);
setupRouter(app);
setup(app);
