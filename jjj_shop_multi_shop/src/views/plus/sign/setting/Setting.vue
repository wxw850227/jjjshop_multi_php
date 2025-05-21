<template>
  <div v-if="!loading">
    <el-form
      size="small"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <div class="open-sign">
        <span class="gray9">是否开启签到有礼</span>
        <el-switch v-model="form.is_open" class="ml10"></el-switch>
      </div>
      <div v-show="form.is_open" class="mt16">
        <!--每日签到固定奖励-->
        <div class="common-form">每日签到固定奖励</div>

        <el-form-item label="每日签到送" prop="ever_sign">
          <div class="max-w460 d-s-c">
            <div class="flex-1">
              <el-input
                v-model="form.ever_sign"
                placeholder="0"
                type="number"
              ></el-input>
            </div>
            <span class="ml10">积分</span>
          </div>
        </el-form-item>
        <el-form-item label="递增奖励">
          <el-col>
            <el-radio v-model="form.is_increase" :label="true">有</el-radio>
            <el-radio v-model="form.is_increase" :label="false">无</el-radio>
          </el-col>
          <div v-if="form.is_increase" class="max-w460 border p-0-20 pt16 mt10">
            <el-form-item
              label="第二天起递增奖励"
              label-width="120px"
              prop="increase_reward"
            >
              <div class="d-s-c">
                <div class="flex-1">
                  <el-input
                    v-model="form.increase_reward"
                    placeholder="请输入第二天起递增积分数"
                    min="0"
                    type="number"
                  ></el-input>
                </div>
                <span class="ml10">积分</span>
              </div>
            </el-form-item>
            <el-form-item label="第" label-width="120px" prop="no_increase">
              <div class="d-s-c">
                <div class="flex-1">
                  <el-input
                    v-model="form.no_increase"
                    placeholder="请输入第几天不再递增"
                    min="0"
                    type="number"
                  ></el-input>
                </div>
                <span class="ml10">天起不再递增</span>
              </div>
            </el-form-item>
          </div>
        </el-form-item>
        <!--连续签到额外奖励-->
        <div class="common-form">
          连续签到额外奖励
          （达到额外奖励最大天数时，继续签到不会再获得额外奖励，断签后重新开始计算）
        </div>
        <el-form-item label="额外奖励">
          <div class="reward-list max-w460">
            <div
              class="reward-item pr border"
              v-for="(item, reward_index) in form.reward_data"
              :key="reward_index"
            >
              <el-button
                class="delete-reward"
                @click="deleteRewardClick(reward_index)"
                type="danger"
                size="small"
                icon="Close"
                circle
              ></el-button>
              <el-form-item
                label="连续签到"
                :prop="'reward_data.' + reward_index + '.day'"
                :rules="rules.day"
              >
                <div class="d-s-c">
                  <div class="flex-1">
                    <el-input
                      v-model="item.day"
                      placeholder="请输入连续签到天数"
                      class="max-w460"
                      type="number"
                      min="0"
                    ></el-input>
                  </div>
                  <span class="ml10 pr16">天</span>
                </div>
              </el-form-item>
              <el-form-item label="积分奖励">
                <div class="d-s-c">
                  <div>
                    <el-checkbox v-model="item.is_point"></el-checkbox>
                  </div>
                  <div v-if="item.is_point">
                    <el-form-item
                      label="送"
                      label-width="40px"
                      :prop="'reward_data.' + reward_index + '.point'"
                      :rules="rules.point"
                      style="margin-bottom: 0"
                    >
                      <div class="d-s-c">
                        <div class="flex-1">
                          <el-input
                            v-model="item.point"
                            placeholder="请输入连续签到天数的积分"
                            type="number"
                            min="0"
                          ></el-input>
                        </div>
                        <span class="ml10 pr16">积分</span>
                      </div>
                    </el-form-item>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <el-col>
            <el-button size="small" icon="Plus" @click="addReward"
              >添加</el-button
            >
          </el-col>
        </el-form-item>
        <!--规则-->
        <div class="common-form">规则</div>
        <el-form-item label="规则说明：">
          <div class="edit_container">
            <Uediter
              :text="ueditor.text"
              :config="ueditor.config"
              ref="ue"
              @contentChange="contentChangeFunc"
            ></Uediter>
          </div>
        </el-form-item>
      </div>
      <!--提交-->
      <div class="common-button-wrapper">
        <el-button
          type="primary"
          size="small"
          @click="onSubmit"
          :disabled="loading"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import { getData, saveData } from "@/api/sign.js";
import Uediter from "@/components/UE.vue";
export default {
  components: {
    /*编辑器*/
    Uediter,
  },
  data() {
    /*判断额外奖励*/
    let validate_reward_data = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("请添加至少一项额外奖励！"));
      } else {
        callback();
      }
    };

    /*连续签到天数*/
    let validate_day = (rule, value, callback) => {
      if (this.form.reward_data.lenght < 1) {
        callback();
      } else {
        if (value === "") {
          callback(new Error("天数不能为空！"));
        }
        callback();
      }
    };

    /*连续签到天数的积分数*/
    let validate_point = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入连续签到积分数！"));
      } else {
        callback();
      }
    };

    return {
      /*富文本配置*/
      ueditor: {
        text: "",
        config: {
          initialFrameWidth: 400,
          initialFrameHeight: 500,
        },
      },
      /*表单数据对象*/
      form: {
        is_open: false,
        is_increase: false,
        increase_reward: 0,
        no_increase: 0,
        ever_sign: 0,
        reward_data: [],
      },
      /*是否正在加载*/
      loading: true,
      /*验证规则*/
      rules: {
        /*每日签到*/
        ever_sign: [
          {
            required: true,
            message: "每日签到送积分有误",
            trigger: "blur",
          },
        ],
        /*第二天起递增*/
        increase_reward: [
          {
            required: true,
            message: "请输入第二天起递增积分数",
            trigger: "blur",
          },
        ],
        /*第几天不再递增*/
        no_increase: [
          {
            required: true,
            message: "请输入第几天不再递增",
            trigger: "blur",
          },
        ],
        /*连续签到额外奖励*/
        reward_data: [
          {
            validator: validate_reward_data,
            required: true,
            trigger: "blur",
          },
        ],
        /*连续签到*/
        day: [
          {
            validator: validate_day,
            required: true,
            trigger: "blur",
          },
        ],
        /*连续签到积分数*/
        point: [
          {
            validator: validate_point,
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    /*获取列表*/
    this.getData();
  },
  methods: {
    contentChangeFunc(e) {
      this.ueditor.text = e;
    },
    /*获取列表*/
    getData() {
      let self = this;
      self.loading = true;
      getData()
        .then((data) => {
          self.loading = false;
          let val = data.data.vars.values;
          if (val.is_increase == true) {
            self.form.is_increase = true;
          }
          if (val.is_open == true) {
            self.form.is_open = true;
            self.form.increase_reward = val.increase_reward;
            self.form.no_increase = val.no_increase;
            self.form.ever_sign = val.ever_sign;
            self.form.ever_sign = val.ever_sign;
            self.ueditor.text = val.content;
            if (val.reward_data) {
              let len = val.reward_data.length;
              for (let i = 0; i < len; i++) {
                let item = val.reward_data[i];
                if (item.is_coupon == true) {
                  item.is_coupon = true;
                } else {
                  item.is_coupon = false;
                }
                if (item.is_point == true) {
                  item.is_point = true;
                } else {
                  item.is_point = false;
                }
              }
              self.form.reward_data = val.reward_data;
            }
          }
        })
        .catch((error) => {});
    },

    /*提交签到有礼*/
    onSubmit() {
      let self = this;
      let params = self.form;
      if (params.is_open) {
        params.content = self.ueditor.text;
      }
      self.loading = true;
      self.$refs.ruleForm.validate((valid) => {
        if (valid) {
          saveData(params, true)
            .then((data) => {
              ElMessage({
                message: "恭喜你，保存成功",
                type: "success",
              });
              self.getData();
            })
            .catch((error) => {});
        }
      });
    },

    /*获取富文本编辑器的内容*/
    getContent: function () {
      if (this.editor) {
        return this.editor.getContent();
      } else {
        return "";
      }
      // return this.$refs.ue.getUEContent();
    },

    /*添加奖励*/
    addReward() {
      let obj = {
        day: 0,
        is_point: false,
        point: 0,
        is_coupon: false,
        coupon: [],
      };
      this.form.reward_data.push(obj);
    },

    /*删除奖励*/
    deleteRewardClick(e) {
      this.form.reward_data.splice(e, 1);
    },
  },
};
</script>

<style scoped="scoped">
.open-sign {
  padding: 20px;
  background: #e2f0ff;
}

.reward-list .reward-item {
  margin-bottom: 10px;
  padding: 20px 20px 0;
}

.reward-list .delete-reward {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
  z-index: 10;
}

.el-button--small.is-circle {
  padding: 4px;
}
</style>
