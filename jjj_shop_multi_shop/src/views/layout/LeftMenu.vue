<template>
	<div class="left-menu-wrapper">
		<!--主菜单-->
		<div class="menu-wrapper">
			<div class="home-login">
				<div :class="active_menu != null ? 'home-icon' : 'home-icon router-link-active'"
					@click="choseMenu(1,null, null)">
					<span class="icon iconfont icon-tubiaozhizuomoban-"></span>
				</div>
			</div>
			<div class="d-c-c">
				<span class="p-10-0 blue fb tc">{{ userInfo.shop_name || '三勾总店'}}</span>
			</div>
			<div class="nav-wrapper mt10">
				<div class="first-menu-content">
					<ul class="nav-ul">
						<template v-for="(item, index) in menuList" :key="index">
							<li :class="active_menu == index ? 'menu-item router-link-active' : 'menu-item'"
								@click="choseMenu(2,item, index)" v-if="item.is_menu==1">
								<div class="item-box">
									<span :class="'icon iconfont menu-item-icon ' + item.icon"></span>
									<span>{{ item.name }}</span>
								</div>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
		<!--子菜单-->
		<div class="child-menu-wrapper">
			<div class="child-menu right-animation">
				<ul v-if="active_menu != null">
					<template v-for="(item, index) in menuList[active_menu]['children']" :key="index">
						<li :class="active_child == index ? 'routre-link router-link-active' : 'router-link'" @click="choseMenu(3,item, index)" v-if="item.is_menu==1">
							<span class="name">{{ item.name }}</span>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {
	useUserStore
} from '@/store';
import {
	reactive,
	toRefs,
	defineComponent,
	nextTick
} from 'vue';
import {
	useRoute
} from 'vue-router';
export default defineComponent({
	components: {},
	setup(props, {
		emit
	}) {
		const {
			userInfo,
			bus_emit,
			menus,
			renderMenus,
		} = useUserStore();
		const route = useRoute();
		const state = reactive({
			route,
			/*传到顶部的标题*/
			munu_name: '首页',
			/*选中的菜单*/
			active_menu: null,
			/*子菜单选择*/
			active_child: 0,
			/*菜单数据*/
			menuList: renderMenus,
			/*商城名称*/
			shop_name: '',
			menus
		});

		/*菜单*/
		const selectMenu = (to) => {
			console.log("to",to)
			console.log("menuList",state.menuList)
			let menupath = to.path;
			let active_menu = null;
			let active_child = null;
			if(state.menuList && state.menuList.length > 0){
				for(let i = 0; i < state.menuList.length; i++){
					if(state.menuList[i].path == menupath){
						active_menu = i;
						break;
					}
					for(let j = 0; j < state.menuList[i].children.length; j++){
						if(state.menuList[i].children[j].path == menupath){
							active_menu = i;
							active_child = j;
							break;
						}
					}
					if(!active_menu && !active_child){
						if(state.menuList[i].childrenList.includes(menupath)){
							active_menu = i;
							break;
						}
					}
				}
				state.active_menu = active_menu;
				state.active_child = active_child;
				emit('selectMenu', active_menu);
			}
			nextTick(()=>{
				bus_emit('MenuName', to.meta && to.meta.showMenuTitle || to.meta.title); 
			})
			
			// state.munu_name = '首页';
			// let menupath = to.path.toLowerCase();
			// state.menuList.unshift({
			// 	access_id: 0,
			// 	alias: "home",
			// 	app_id: 10001,
			// 	children: [],
			// 	icon: "icon-shangping",
			// 	is_menu: 1,
			// 	is_route: 1,
			// 	is_show: 1,
			// 	meta: {
			// 		title: '首页',
			// 		topTree: '/'
			// 	},
			// 	name: "home",
			// 	parent_id: 0,
			// 	path: "/home",
			// 	plus_category_id: 0,
			// 	redirect_name: "/home"
			// })
			// 
			// let active = null;
			// for (let i = 0; i < state.menuList.length; i++) {
			// 	let item = state.menuList[i];
			// 	let slPath = await slantingBar(item['path']);
			// 	let slName = await slantingBar(item['redirect_name']);
			// 	/*判断主菜单选择*/
			// 	if (menupath == slPath || menupath == slName) {
			// 		state.munu_name = item['name'];
			// 		state.active_child = 0;
			// 		active = i;
			// 		break;
			// 	} else {
			// 		/*判断子菜单选择*/
			// 		if (item['children']) {
			// 			let childs = item['children'];
			// 			for (let c = 0; c < childs.length; c++) {
			// 				let child = childs[c];
			// 				if (menupath == await slantingBar(child['path'])) {
			// 					active = i;
			// 					state.munu_name = child['name'];
			// 					state.active_child = c;
			// 					break;
			// 				} else {
			// 					if (child['children']) {
			// 						let name = await hasChild(menupath, child['children']);
			// 						if (name != null) {
			// 							active = i;
			// 							state.munu_name = name;
			// 							state.active_child = c;
			// 							break;
			// 						}
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			// state.menuList = state.menus;
			// state.active_menu = active;
			// emit('selectMenu', active);
			// bus_emit('menuName', state.munu_name);
		};
			/*判断字符串第一个是否斜杠*/
		/* const slantingBar = async (str) => {
			str = str.toLowerCase();
			if (str.length > 0) {
				if (str.substr(0, 1) == '/') {
					return str;
				} else {
					return '/' + str;
				}
			} else {
				return str;
			}
		}; */
			/*判断子菜单有没有*/
		/* const hasChild = async (path, list) => {
			let name = null;
			for (let i = 0, length = list.length; i < length; i++) {
				let item = list[i];
				if (path == await slantingBar(item['path'])) {
					name = item['name'];
					break;
				} else {
					if (item['children'] != null && item['children'].length > 0) {
						name = await hasChild(path, item['children']);
						if (name != null) {
							break;
						}
					}
				}
			}
			return name;
		}; */

		selectMenu(route);
		return {
			...toRefs(state),
			userInfo,
			selectMenu,
			bus_emit
		};
	},
	mounted(){},
	methods: {
		/*点击菜单跳转*/
		choseMenu(type,item,index) {
			if(type == 1){
				this.active_menu = null;
				this.active_child = null;
				this.$router.push('/');
				this.$emit('selectMenu', null);
        		this.bus_emit('MenuName', '首页');
			}else if(type == 2){
				this.active_menu = index;
				this.active_child = 0;
				this.$router.push(item.redirect_name);
        		this.bus_emit('MenuName', item.name);
				if(item.children){
					this.$emit('selectMenu', false);
				}
			}else if(type == 3){
				console.log("item",item)
				let path = item.path;
				if(item.redirect_name){
					path = item.redirect_name;
				}
				this.active_child = index;
        		this.bus_emit('MenuName', item.name);
				this.$router.push(path);
			}
		}
	}
});
</script>
<style>
	.home-login .icon-tubiaozhizuomoban- {
		color: #3a8ee6;
		font-size: 28px;
	}

	.menu-item-icon.icon.iconfont {
		font-size: 20px;
	}

	.menu-item .item-box {
		display: flex;
	}
</style>