<template>
  <div>
    <div class="tips-border">
      <div class="tips_tit pb">操作提示</div>
      <div class="tips_txt">申请中请联系平台客服进行审核</div>
    </div>
    <div class="table-wrap" v-if="dataList!=''">
      <el-row>
        <el-col :span="8" v-for="(item,index) in dataList" :key="index">
          <div class="service-item d-b-c">
            <div class="d-s-c">
              <div class="service_img"><img :src="item.logo" alt=""> </div>
              <div>
                <div class="service-item-top">{{item.name}}</div>
                <div class="service-item-btm">{{item.describe}}</div>
              </div>
            </div>
            <div>
              <div v-if="item.status==0" class="apply_off">申请中</div>
              <div @click="toApply(item.service_security_id,1)" v-if="item.status==2" class="apply_btn">申请开通</div>
              <div v-if="item.status==1" class="d-s-c">
                <span class="apply_off">已开通</span><div @click="open(item.service_security_id)" class="apply_btn">退出</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {security,quit,apply} from '@/api/shop.js';
  export default {
    data() {
      return {
        dataList:[]
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
        getData(){
          let self=this;
          security({
              },
              true
            )
            .then(data => {
              console.log(data);
              self.dataList=data.data.list
              console.log(self.dataList);
            })
            .catch(error => {

            });
        },
        open(id) {
          ElMessageBox.confirm('确定要退出吗?', '信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.toApply(id,0);
            ElMessage({
              type: 'success',
              message: '操作成功'
            });
          }).catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消退出'
            });
          });
        },
        toApply(id,n){
          let self=this;
          let service_security_id=id;
          if(n==0){
          quit({
                service_security_id
              },
              true
            )
            .then(data => {
             self.getData();
            })
            .catch(error => {

            });
          }
          if(n==1){
            apply({
                  service_security_id
                },
                true
              )
              .then(data => {
                self.getData();
                ElMessage({
                  type: 'success',
                  message: '操作成功'
                });
              })
              .catch(error => {

              });
          console.log("申请")
          }
        }
    }
  }
</script>

<style>
  .tips-border {
    border: 1px solid #CACACA;
    padding: 15px;
    margin-bottom: 20px;
  }

  .tips_tit {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .tips_txt {
    line-height: 25px;
    color: #666;
    font-size: 14px;
  }
  .service-item{
        background-color: #f7f9fb;
        box-shadow: inherit;
        border-radius: 2px;
        padding: 20px;
        margin-right: 10px;
        margin-bottom: 10px;
  }
  .service-item .service_img{
        margin-right: 10px;
  }
  .service-item .service_img img{
      width: 42px;
      height: 42px;
  }
  .service-item-top {
    font-size: 16px;
    font-weight: 600;
    line-height: 25px
  }

  .service-item-btm {
    color: #999999;
    font-size: 12px;
    line-height: 25px
  }
  .apply_btn{
    background-color: #ff8143;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 5px;
  }

  .apply_off{
    color: #ff8143
  }
</style>
