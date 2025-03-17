<template>
 <div class="diy-service-wrap" :style="{ right: item.style.right + '%', bottom: item.style.bottom + '%' }">
    <div class="diy-service drag optional drag__nomove" @click.stop="$parent.$parent.onEditer(index)" :class="{ selected: index === selectedIndex }">
      <div class="service-icon" :style="{ opacity: item.style.opacity / 100 }"><img v-img-url="item.params.image" alt="" /></div>
      <div class="btn-edit-del"><div class="btn-del" @click.stop="$parent.$parent.onDeleleItem(index)">删除</div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['item', 'index', 'selectedIndex'],
  methods: {}
};
</script>

<style>
.diy-phone-container .diy-phone-item > div.diy-service-wrap {
  position: absolute;
  z-index: 90;
}
.diy-service {
  width: 60px;
  height: 60px;
}
.diy-service .service-icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.diy-service .service-icon img {
  width: 40px;
  height: 40px;
}
</style>
