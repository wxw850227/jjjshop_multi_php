<template>
  <div class="left-menu-wrapper">
    <!--主菜单-->
    <div class="menu-wrapper">
      <div class="home-login">
        <div
          :class="
            active_menu != null ? 'home-icon' : 'home-icon router-link-active'
          "
          @click="choseMenu(null)"
        >
          <span class="icon iconfont icon-tubiaozhizuomoban-"></span>
        </div>
      </div>
      <div class="nav-wrapper">
        <div class="first-menu-content">
          <ul class="nav-ul">
            <li
              :class="
                active_menu == index
                  ? 'menu-item router-link-active'
                  : 'menu-item'
              "
              v-for="(item, index) in menuList"
              :key="index"
              @click="choseMenu(item)"
            >
              <div class="item-box">
                <span
                  :class="'icon iconfont menu-item-icon ' + item.icon"
                ></span>
                <span>{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--子菜单-->
    <div class="child-menu-wrapper">
      <div class="child-menu right-animation">
        <ul v-if="active_menu != null">
          <li
            :class="
              active_child == index
                ? 'router-link router-link-active'
                : 'router-link'
            "
            v-for="(item, index) in menuList[active_menu]['children']"
            :key="index"
            @click="choseMenu(item)"
          >
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent, watch } from "vue";
import { useUserStore } from "@/store";
import { useRoute } from "vue-router";
import router from "../../router";
export default defineComponent({
  setup(props, { emit }) {
    const route = useRoute();
    const { bus_emit } = useUserStore();
    const state = reactive({
      route,
      /*选中的菜单*/
      active_menu: null,
      /*子菜单选择*/
      active_child: 0,
      /*菜单数据*/
      menuList: [
        {
          name: "插件",
          icon: "icon-chajian",
          path: "/plugs",
          children: [
            {
              name: "全部插件",
              icon: null,
              path: "/plugs/plugs/Index",
            },
          ],
        },
        {
          name: "后台权限",
          icon: "icon-quanxianguanli",
          path: "/access",
          children: [
            {
              name: "权限列表",
              icon: null,
              path: "/access/Index",
            },
          ],
        },
        {
          name: "商户权限",
          icon: "icon-shanghuguanli",
          path: "/supplieraccess",
          children: [
            {
              name: "权限列表",
              icon: null,
              path: "/supplieraccess/Index",
            },
          ],
        },
        {
          name: "商城",
          icon: "icon-fenqifenqishangcheng2",
          path: "/shop",
          children: [
            {
              name: "商城列表",
              icon: null,
              path: "/shop/Index",
            },
          ],
        },
        {
          name: "消息",
          icon: "icon-xiaoxi2",
          path: "/message",
          children: [
            {
              name: "消息列表",
              icon: null,
              path: "/message/Index",
            },
          ],
        },
        {
          name: "地区",
          icon: "icon-diqu",
          path: "/region",
          children: [
            {
              name: "地区列表",
              icon: null,
              path: "/region/Index",
            },
          ],
        },
        {
          name: "设置",
          icon: "icon-icon-test1",
          path: "/setting",
          children: [
            {
              name: "设置",
              icon: null,
              path: "/setting/service/index",
            },
          ],
        },
        {
          name: "密码",
          icon: "icon-authority1",
          path: "/password",
          children: [
            {
              name: "修改密码",
              icon: null,
              path: "/password/Index",
            },
          ],
        },
      ],
    });

    /*菜单*/
    const selectMenu = async (to) => {
      // console.log(to);
      let menu_name = "首页";
      let menupath = "/" + to.path.split("/")[1];
      for (let i = 0; i < state.menuList.length; i++) {
        if (menupath == state.menuList[i]["path"]) {
          menu_name = state.menuList[i]["name"];
          state.active_menu = i;
          let path = to.path;
          if (state.menuList[i]["children"]) {
            let childs = state.menuList[i]["children"];
            for (let c = 0; c < childs.length; c++) {
              if (path == childs[c]["path"]) {
                menu_name = childs[c]["name"];
                state.active_child = c;
                break;
              } else {
                state.active_child = 0;
              }
            }
          }
          break;
        } else {
          state.active_menu = null;
        }
      }
      console.log("menu_name111111111111111111",menu_name)
      emit("selectMenu", state.active_menu);
      bus_emit("MenuName", menu_name);
    };

    watch(
      () => route,
      (to, from) => {
        console.log(to.path.split("/"));
        const toDepth = to.path.split("/").length;
        console.log(from);
        const fromDepth = from ? from.path.split("/").length : 0;
        state.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
        console.log(11111111111);
        selectMenu(to);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    selectMenu(route);

    return {
      ...toRefs(state),
      selectMenu,
      route,
    };
  },
  methods: {
    /*点击菜单跳转*/
    choseMenu(item) {
      if (item != null) {
        let path = item.path;
        router.push(path);
      } else {
        router.push("/Home");
      }
    },
  },
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
