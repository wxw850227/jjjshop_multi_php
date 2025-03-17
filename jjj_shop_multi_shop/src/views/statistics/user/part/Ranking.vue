<template>
  <div class="member-rangking">
    <div class="common-form mt30">排行榜</div>
    <div class="d-b-s">
      <div class="flex-1">
        <div class="f16">用户消费榜</div>
        <div class="pt16">
          <ul>
            <li class="d-b-c p-10-0 border-b-d" v-for="(item, index) in dataModel.payRanking" :key="index">
              <div class="d-s-c">
                <span class="key-box">{{ index + 1 }}</span>
                <img class="ml10 photo" v-img-url="item.avatarUrl" :alt="item.nickName" />
                <span class="ml4">{{ item.nickName }}</span>
              </div>
              <div class="red">
                ￥
                <span class="fb">{{ item.expend_money }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1 p-0-30">
        <div class="f16">积分排行榜</div>
        <div class="pt16">
          <ul>
            <li class="d-b-c p-10-0 border-b-d" v-for="(item, index) in dataModel.pointsRanking" :key="index">
              <div class="d-s-c">
                <span class="key-box">{{ index + 1 }}</span>
                <img class="ml10 photo" v-img-url="item.avatarUrl" :alt="item.nickName" />
                <span class="ml4">{{ item.nickName }}</span>
              </div>
              <div class="orange">
                <span class="fb">{{ item.total_points }}</span>
                积分
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1">
        <div class="f16">邀请人排行榜</div>
        <div class="pt16">
          <ul>
            <li class="d-b-c p-10-0 border-b-d" v-for="(item, index) in dataModel.inviteRanking" :key="index">
              <div class="d-s-c">
                <span class="key-box">{{ index + 1 }}</span>
                <img class="ml10 photo" v-img-url="item.avatarUrl" :alt="item.nickName" />
                <span class="ml4">{{ item.nickName }}</span>
              </div>
              <div class="blue">
                <span class="fb">{{ item.total_invite }}</span>
                人
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      /*是否正在加载*/
      loading: true
    };
  },
  inject: ['dataModel'],
  created() {},
  methods: {}
};
</script>

<style scoped="scoped">
.member-rangking .key-box {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  text-align: center;
  color: red;
  font-weight: bold;
  line-height: 20px;
}
.member-rangking .photo {
  height: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
