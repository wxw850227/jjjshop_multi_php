<template>
  <div class="pb50" v-loading="loading">
    <!--内容-->
    <div class="product-content">
      <!--基本信息-->
      <div class="common-form">基本信息</div>
      <div class="table-wrap">
        <el-row>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">订单号：</span>
              {{ detail.order_no }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">买家：</span>
              {{ detail.user.nickName }}
              <span>用户ID：({{ detail.user.user_id }})</span>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">订单金额 (元)：</span>
              {{ detail.order_price }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">运费金额 (元)：</span>
              {{ detail.express_price }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16" v-if="detail.coupon_money > 0">
              <span class="gray9">优惠券抵扣 (元)：</span>
              {{ detail.coupon_money }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16" v-if="detail.points_money > 0">
              <span class="gray9">积分抵扣 (元)：</span>
              {{ detail.points_money }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16" v-if="detail.fullreduce_money > 0">
              <span class="gray9">满减金额 (元)：</span>
              {{ detail.fullreduce_money }}
            </div>
          </el-col>
          <el-col :span="5" v-if="detail.order_source == 70">
            <div class="pb16">
              <span class="gray9">定金：</span>
              {{ detail.advance.pay_price }}
            </div>
          </el-col>
          <el-col :span="5" v-if="detail.order_source == 70">
            <div class="pb16">
              <span class="gray9">尾款：</span>
              {{ detail.total_price }}
            </div>
          </el-col>
          <el-col
            :span="5"
            v-if="detail.order_source == 70 && detail.advance.reduce_money"
          >
            <div class="pb16">
              <span class="gray9">尾款立减：</span>
              {{ detail.advance.reduce_money }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">实付款金额 (元)：</span>
              {{ detail.pay_price }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">支付方式：</span>
              {{ detail.pay_type.text }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">配送方式：</span>
              {{ detail.delivery_type.text }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="pb16">
              <span class="gray9">交易状态：</span>
              {{ detail.order_status.text }}
            </div>
          </el-col>
          <el-col
            :span="5"
            v-if="
              detail['pay_status']['value'] == 10 &&
              detail['order_status']['value'] == 10 &&
              detail['order_source'] == 10
            "
            v-auth="'/order/order/updatePrice'"
          >
            <el-button @click="editClick(detail)" size="small"
              >修改价格</el-button
            >
          </el-col>
        </el-row>
      </div>
      <!--编辑-->
      <Add
        v-if="open_edit"
        :open_edit="open_edit"
        :order="userModel"
        @close="closeDialogFunc($event, 'edit')"
      ></Add>

      <!--商品信息-->
      <div class="common-form mt16">商品信息</div>
      <div class="table-wrap">
        <el-table
          size="small"
          :data="detail.product"
          border
          style="width: 100%"
        >
          <el-table-column prop="product_name" label="商品" width="400">
            <template #default="scope">
              <div class="product-info">
                <div class="pic">
                  <img v-img-url="scope.row.image.file_path" />
                </div>
                <div class="info">
                  <div class="name">{{ scope.row.product_name }}</div>
                  <div class="gray9" v-if="scope.row.product_attr != ''">
                    {{ scope.row.product_attr }}
                  </div>
                  <div class="orange" v-if="scope.row.refund">
                    {{ scope.row.refund.type.text }}-{{
                      scope.row.refund.status.text
                    }}
                  </div>
                  <div class="price">
                    <span
                      :class="{
                        'text-d-line': scope.row.is_user_grade == 1,
                        gray6: scope.row.is_user_grade != 1,
                      }"
                      >￥ {{ scope.row.product_price }}</span
                    >
                    <span class="ml10" v-if="scope.row.is_user_grade == 1">
                      会员折扣价：￥ {{ scope.row.grade_product_price }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="product_no" label="商品编码"></el-table-column>
          <el-table-column
            prop="product_weight"
            label="重量 (Kg)"
          ></el-table-column>
          <el-table-column prop="total_num" label="购买数量">
            <template #default="scope">
              <p>x {{ scope.row.total_num }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="total_price" label="商品总价(元)">
            <template #default="scope">
              <p>￥ {{ scope.row.total_price }}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--收货信息-->
      <div v-if="detail.delivery_type.value == 10">
        <div class="common-form mt16">收货信息</div>
        <div class="table-wrap">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">收货人：</span>
                {{ detail.address.name }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">收货电话：</span>
                {{ detail.address.phone }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">收货地址：</span>
                {{ detail.address.region.province }}
                {{ detail.address.region.city }}
                {{ detail.address.region.region }}
                {{ detail.address.detail }}
              </div>
            </el-col>
            <el-col
              :span="5"
              v-if="
                detail.delivery_status.value != 20 &&
                detail.order_status.value == 10
              "
            >
              <div class="pb16">
                <el-button link type="primary" size="small" @click="changeAdd">
                  修改地址</el-button
                >
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="25">
              <div class="pb16">
                <span class="gray9">备注：</span>
                {{ detail.buyer_remark }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--自提门店信息-->
      <template v-if="detail.delivery_type.value == 20">
        <div class="common-form mt16">自提用户信息</div>
        <div class="table-wrap" v-if="detail.extract">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">联系人：</span>
                {{ detail.extract.linkman }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">联系电话：</span>
                {{ detail.extract.phone }}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="25">
              <div class="pb16">
                <span class="gray9">备注：</span>
                {{ detail.buyer_remark }}
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="common-form mt16">自提信息</div>
        <div class="table-wrap" v-if="detail.extract">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">门店ID：</span>
                {{ detail.extractStore.store_id }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">门店名称：</span>
                {{ detail.extractStore.store_name }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">联系人：</span>
                {{ detail.extractStore.linkman }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">联系电话：</span>
                {{ detail.extractStore.phone }}
              </div>
            </el-col>
            <el-col :span="15">
              <div class="pb16">
                <span class="gray9">门店地址：</span>
                {{ detail.extractStore.region.province }}-
                {{ detail.extractStore.region.city }}-
                {{ detail.extractStore.region.region }}-
                {{ detail.extractStore.address }}
              </div>
            </el-col>
          </el-row>
        </div>
      </template>

      <!--无需发货-->
      <template v-if="detail.delivery_type.value == 30">
        <div class="common-form mt16">用户信息</div>
        <div class="table-wrap">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">联系手机：</span>
                {{ detail.user.mobile }}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="25">
              <div class="pb16">
                <span class="gray9">备注：</span>
                {{ detail.buyer_remark }}
              </div>
            </el-col>
          </el-row>
        </div>
      </template>

      <!--付款信息-->
      <div class="table-wrap" v-if="detail.pay_status.value == 20">
        <div class="common-form mt16">付款信息</div>
        <div class="table-wrap">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">应付款金额：</span>
                {{ detail.pay_price }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">支付方式：</span>
                {{ detail.pay_type.text }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">支付流水号：</span>
                {{ detail.transaction_id }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">付款状态：</span>
                {{ detail.pay_status.text }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">付款时间：</span>
                {{ detail.pay_time }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--取消信息-->
      <div
        class="table-wrap"
        v-if="detail.order_status.value == 20 && detail.cancel_remark != ''"
      >
        <div class="common-form mt16">取消信息</div>
        <div class="table-wrap">
          <el-row>
            <el-col :span="5">
              <div class="pb16">
                <span class="gray9">商家备注：</span>
                {{ detail.cancel_remark }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <!--  用户取消订单 -->
      <div
        v-if="detail.pay_status.value == 20 && detail.order_status.value == 21"
        v-auth="'/order/operate/confirmCancel'"
      >
        <div class="common-form mt16">用户取消订单</div>
        <p class="red pb16">
          当前买家已付款并申请取消订单，请审核是否同意，如同意则自动退回付款金额（微信支付原路退款）并关闭订单。
        </p>
        <el-form size="small" ref="forms" :model="forms">
          <el-form-item label="审核状态">
            <div>
              <el-radio v-model="forms.is_cancel" :label="1">同意</el-radio>
              <el-radio v-model="forms.is_cancel" :label="0">拒绝</el-radio>
            </div>
          </el-form-item>

          <!-- <el-form-item><el-button type="primary" @click="confirmCancel()">确认审核</el-button></el-form-item> -->
        </el-form>
      </div>

      <!--发货信息-->
      <div
        v-if="
          detail.pay_status.value == 20 &&
          detail.delivery_type.value == 10 &&
          [20, 21].indexOf(detail.order_status.value) === -1
          && !(detail.assemble_status == 10 || detail.assemble_status == 30)
        "
        v-auth="'/order/order/delivery'"
      >
        <div v-if="detail.delivery_status.value == 10">
          <!-- 去发货 -->
          <div class="common-form mt16">去发货</div>
          <el-form size="small" ref="form" :model="form" label-width="100px">
            <el-form-item label="物流公司">
              <el-select v-model="form.express_id" placeholder="请选择快递公司">
                <el-option
                  :label="item.express_name"
                  v-for="(item, index) in expressList"
                  :key="index"
                  :value="item.express_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物流单号">
              <el-input v-model="form.express_no" class="max-w460"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-else>
          <div class="common-form mt16">发货信息</div>
          <div class="table-wrap">
            <el-row>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">物流公司：</span>
                  {{ detail.express.express_name }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">物流单号：</span>
                  {{ detail.express_no }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">发货状态：</span>
                  {{ detail.delivery_status.text }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">发货时间：</span>
                  {{ detail.delivery_time }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!--门店自提核销-->
      <div
        v-if="
          detail.delivery_type.value == 20 &&
          detail.pay_status.value == 20 &&
          detail.order_status.value != 21 &&
          detail.order_status.value != 20
        "
        v-auth="'/order/operate/extract'"
      >
        <div class="common-form mt16">门店自提核销</div>
        <div v-if="detail.delivery_status.value == 10">
          <el-form
            size="small"
            ref="extract_form"
            :model="extract_form"
            label-width="100px"
          >
            <el-form-item label="门店核销员">
              <el-select
                v-model="extract_form.order.extract_clerk_id"
                placeholder="点击选择"
              >
                <el-option
                  :label="item.real_name"
                  v-for="(item, index) in shopClerkList"
                  :key="item.clerk_id"
                  :value="item.clerk_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="买家取货状态 ">
              <el-radio v-model="extract_form.order.extract_status" :label="1"
                >已取货</el-radio
              >
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onExtract(detail.order_id)"
                >确认核销</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div v-else class="table-wrap">
          <template v-if="detail.extractClerk">
            <el-row>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">自提门店名称：</span>
                  {{ detail.extractStore.store_name }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">核销员：</span>
                  {{ detail.extractClerk.real_name }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">核销状态：</span>
                  <template v-if="detail.delivery_status.value == 20">
                    已核销
                  </template>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">核销时间：</span>
                  {{ detail.delivery_time }}
                </div>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
      <!--虚拟物品发货-->
      <div
        v-if="
          detail.delivery_type.value == 30 &&
          detail.pay_status.value == 20 &&
          detail.order_status.value != 21 &&
          detail.order_status.value != 20
        "
        v-auth="'/order/order/delivery'"
      >
        <div class="common-form mt16">虚拟商品发货</div>
        <div v-if="detail.delivery_status.value == 10">
          <el-form
            size="small"
            ref="virtual_form"
            :model="virtual_form"
            label-width="100px"
          >
            <el-form-item label="发货信息">
              <el-input
                v-model="virtual_form.virtual_content"
                class="max-w460"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onVirtual(detail.order_id)"
                >确认发货</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div v-else class="table-wrap">
          <template v-if="detail.virtual_content">
            <el-row>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">发货信息：</span>
                  {{ detail.virtual_content }}
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">发货状态：</span>
                  <template v-if="detail.delivery_status.value == 20">
                    已发货
                  </template>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="pb16">
                  <span class="gray9">发货时间：</span>
                  {{ detail.delivery_time }}
                </div>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
    <div class="common-button-wrapper">
      <el-button size="small" type="info" @click="cancelFunc"
        >返回上一页</el-button
      >
      <!--确认发货-->
      <template
        v-if="
          detail.pay_status.value == 20 &&
          detail.delivery_type.value == 10 &&
          [20, 21].indexOf(detail.order_status.value) === -1
          && !(detail.assemble_status == 10 || detail.assemble_status == 30)
        "
      >
        <el-button
          size="small"
          type="primary"
          @click="onSubmit"
          v-if="detail.delivery_status.value == 10"
          >确认发货
        </el-button>
      </template>
      <!--用户取消-->
      <template
        v-if="detail.pay_status.value == 20 && detail.order_status.value == 21"
      >
        <el-button size="small" type="primary" @click="confirmCancel()"
          >确认审核</el-button
        >
      </template>
    </div>
    <changeAddress
      :isChange="isChange"
      :addressData="addressData"
      @closeDialog="closeAddress"
    ></changeAddress>
  </div>
</template>

<script>
import {
  orderdetail,
  delivery,
  confirm,
  extract,
  virtual,
  updateAddress,
} from "@/api/order.js";
import Add from "./dialog/Add.vue";
import changeAddress from "@/components/order/changeAddress.vue";
import { deepClone } from "@/utils/base.js";
export default {
  components: {
    Add,
    changeAddress,
  },
  data() {
    return {
      active: 0,
      /*是否加载完成*/
      loading: true,
      /*订单数据*/
      detail: {
        pay_status: [],
        pay_type: [],
        delivery_type: [],
        user: {},
        address: [],
        product: [],
        order_status: [],
        extract: [],
        extract_store: [],
        express: [],
        delivery_status: [],
        extractClerk: [],
      },
      /*是否打开添加弹窗*/
      open_add: false,
      /*一页多少条*/
      pageSize: 20,
      /*一共多少条数据*/
      totalDataNumber: 0,
      /*当前是第几页*/
      curPage: 1,
      /*发货*/
      form: {
        /*订单ID*/
        express_id: null,
        /*订单号*/
        express_no: "",
      },
      forms: {
        is_cancel: 1,
      },
      extract_form: {
        order: {
          extract_status: 1,
        },
      },
      /*虚拟商品发货*/
      virtual_form: {
        virtual_content: "",
      },
      order: {},
      delivery_type: 0,
      /*配送方式*/
      exStyle: [],
      /*门店列表*/
      shopList: [],
      /*当前编辑的对象*/
      userModel: {},
      /*时间*/
      create_time: "",
      /*快递公司列表*/
      expressList: [],
      shopClerkList: [],
      /*是否打开编辑弹窗*/
      open_edit: false,
      isChange: false,
      addressData: {
        name: "",
        phone: "",
        region: {
          province: "",
          province_id: 0,
          city: "",
          city_id: 0,
          region: "",
          region_id: 0,
          detail: "",
        },
      },
    };
  },
  created() {
    /*获取列表*/
    this.getParams();
  },
  methods: {
    next() {
      if (this.active++ > 4) this.active = 0;
    },
    /*获取参数*/
    getParams() {
      let self = this;
      // 取到路由带过来的参数
      const params = this.$route.query.order_id;
      orderdetail(
        {
          order_id: params,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          self.detail = data.data.detail;
          self.expressList = data.data.expressList;
          self.shopClerkList = data.data.shopClerkList;
          self.addressData = self.detail.address;
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*发货*/
    onSubmit() {
      let self = this;
      let param = self.form;
      if (param.express_id == null) {
        ElMessage.error("请选择物流公司");
        return;
      }
      if (param.express_no == "") {
        ElMessage.error("请填写物流单号");
        return;
      }
      let order_id = this.$route.query.order_id;
      delivery(
        {
          param: param,
          order_id: order_id,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，发货成功",
            type: "success",
          });
          self.getParams();
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*确认取消*/
    confirmCancel() {
      let self = this;
      let order_id = this.$route.query.order_id;
      let is_cancel = self.forms.is_cancel;
      confirm(
        {
          order_id: order_id,
          is_cancel: is_cancel,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，审核成功",
            type: "success",
          });
          self.getParams();
        })
        .catch((error) => {
          self.loading = false;
        });
    },

    /*核销*/
    onExtract(e) {
      let self = this;
      let extract_form = self.extract_form;
      extract_form.order_id = e;
      extract(
        {
          extract_form,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，操作成功",
            type: "success",
          });
          self.getParams();
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    /*虚拟商品发货*/
    onVirtual(e) {
      let self = this;
      let virtual_form = self.virtual_form;
      if (virtual_form.virtual_content == "") {
        ElMessage.error("请填写发货信息");
        return;
      }
      virtual_form.order_id = e;
      virtual(
        {
          order_id: virtual_form.order_id,
          virtual_content: virtual_form.virtual_content,
        },
        true
      )
        .then((data) => {
          self.loading = false;
          ElMessage({
            message: "恭喜你，操作成功",
            type: "success",
          });
          self.getParams();
        })
        .catch((error) => {
          self.loading = false;
        });
    },
    /*打开编辑*/
    editClick(item) {
      this.userModel = deepClone(item);
      this.open_edit = true;
    },

    /*关闭弹窗*/
    closeDialogFunc(e, f) {
      if (e && e == "edit") {
        this.open_edit = e.openDialog;
        this.getParams();
      }
    },

    /*取消*/
    cancelFunc() {
      this.$router.back(-1);
    },
    changeAdd() {
      this.isChange = true;
    },
    closeAddress(e) {
      let self = this;
      if (e == false) {
        self.isChange = false;
        console.log(e);
        return false;
      }
      let params = e.params;
      console.log(params);
      params.order_id = self.$route.query.order_id;
      updateAddress(params, true)
        .then((data) => {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
        })
        .catch((error) => {});
      self.isChange = false;
    },
  },
};
</script>
<style></style>
