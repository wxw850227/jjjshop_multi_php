import{_ as e,C as a,z as s,L as t,a as l,B as d,o,c as u,w as A,n,h as i,d as c,e as r,t as M,f,g,r as z,F as m,i as B,k as E,j as p,H as F,l as y}from"./index-73db7405.js";import{_ as P}from"./recommendProduct.4b8a4520.js";import{r as x}from"./uni-app.es.55ebdd9f.js";const T=e({components:{recommendProduct:P},data:()=>({isloadding:!0,sign:{},loadding:!0,indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,menus:[],detail:{balance:0,points:0,grade:{name:""}},is_recycle:0,orderCount:{},coupon:0,setting:{},user_type:"",msgcount:0,sessionKey:""}),onPullDownRefresh(){this.getData()},onShow(){this.getData(),this.getTabBarLinks()},onLoad(){},methods:{getData(){let e=this;e.isloadding=!0,e._get("user.index/detail",{url:e.url},(function(s){s.data.getPhone?e.bindMobile():(e.detail=s.data.userInfo,e.sign=s.data.sign,e.coupon=s.data.coupon,e.orderCount=s.data.orderCount,e.menus=s.data.menus,e.setting=s.data.setting,e.is_recycle=s.data.userInfo.is_recycle,e.msgcount=s.data.msgcount,e.loadding=!1,a(),e.isloadding=!1)}))},bindMobile(){this.gotoPage("/pages/user/modify-phone/modify-phone")},jumpPage(e){let a=this;e.startsWith("/")?a.gotoPage(e):a[e]()},scanQrcode:function(){this.gotoPage("/pages/user/scan/scan")},getPhoneNumber(e){var a=this;if("getPhoneNumber:ok"!==e.detail.errMsg)return!1;s({title:"加载中"}),t({success(s){a._post("user.user/bindMobile",{session_key:a.sessionKey,encrypted_data:e.detail.encryptedData,iv:e.detail.iv},(e=>{l({title:"绑定成功"}),a.detail.mobile=e.data.mobile}),!1,(()=>{d()}))}})}}},[["render",function(e,a,s,t,l,d){const T=B,b=i,Q=E,h=p,w=x(F("recommendProduct"),P),k=y("request-loading"),C=y("tabBar");return o(),u(b,{class:n(["user-index",e.theme()||""]),"data-theme":e.theme()},{default:A((()=>[l.loadding?f("",!0):(o(),u(b,{key:0},{default:A((()=>[c(b,{class:"user-header"},{default:A((()=>[c(b,{class:"user-header-inner"},{default:A((()=>[c(b,{class:"user-info"},{default:A((()=>[c(b,{class:"photo"},{default:A((()=>[c(T,{src:l.detail.avatarUrl,mode:"aspectFill"},null,8,["src"])])),_:1}),c(b,{class:"info"},{default:A((()=>[c(b,{class:"d-c-c mb23"},{default:A((()=>[c(b,{class:"name"},{default:A((()=>[r(M(l.detail.nickName),1)])),_:1}),l.detail.grade_id>0&&l.detail.grade?(o(),u(Q,{key:0,class:"ml20 grade"},{default:A((()=>[r(M(l.detail.grade.name),1)])),_:1})):f("",!0)])),_:1}),c(b,{class:"tel d-s-c"},{default:A((()=>[c(Q,{class:"f26"},{default:A((()=>[r("ID:"+M(l.detail.user_id),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),c(b,{class:"my-order"},{default:A((()=>[c(b,{class:"list d-a-c flex-1"},{default:A((()=>[c(b,{class:"item d-c-c d-c",onClick:a[0]||(a[0]=e=>d.jumpPage("/pages/user/my-wallet/my-wallet"))},{default:A((()=>[c(b,{class:"red_mini"},{default:A((()=>[r(M(l.detail.balance),1)])),_:1}),c(Q,{class:"pt16 f24 gray3"},{default:A((()=>[r("账号余额")])),_:1})])),_:1}),c(b,{class:"item order_center d-c-c d-c",onClick:a[1]||(a[1]=e=>d.jumpPage("/pages/user/points/points"))},{default:A((()=>[c(b,{class:"red_mini"},{default:A((()=>[r(M(l.detail.points),1)])),_:1}),c(Q,{class:"pt16 f24 gray3"},{default:A((()=>[r(M(e.points_name()),1)])),_:1})])),_:1}),c(b,{class:"item d-c-c d-c",onClick:a[2]||(a[2]=e=>d.jumpPage("/pages/user/my-coupon/my-coupon"))},{default:A((()=>[c(b,{class:"red_mini"},{default:A((()=>[r(M(l.coupon),1)])),_:1}),c(Q,{class:"pt16 f24 gray3"},{default:A((()=>[r("优惠券")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),l.detail.mobile?f("",!0):(o(),u(b,{key:0,class:"bind_phone"},{default:A((()=>[c(b,{class:"bind_content"},{default:A((()=>[c(b,{class:"bind_txt"},{default:A((()=>[r("点击绑定手机号，确保账户安全")])),_:1}),c(h,{class:"bind_btn",onClick:d.bindMobile},{default:A((()=>[r("去绑定")])),_:1},8,["onClick"])])),_:1})])),_:1})),c(b,{class:"my-assets"},{default:A((()=>[c(b,{class:"my-assets-all"},{default:A((()=>[c(b,{class:"f30 fb"},{default:A((()=>[r("我的订单")])),_:1}),c(b,{class:"gray9 f26",onClick:a[3]||(a[3]=e=>d.jumpPage("/pages/order/myorder?dataType=all"))},{default:A((()=>[r("全部订单"),c(Q,{class:"icon iconfont icon-jiantou"})])),_:1})])),_:1}),c(b,{class:"d-b-c w100"},{default:A((()=>[c(b,{class:"item",onClick:a[4]||(a[4]=e=>d.jumpPage("/pages/order/myorder?dataType=payment"))},{default:A((()=>[c(b,{class:"icon-box pr"},{default:A((()=>[c(T,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEDElEQVRoQ+1ZXWgcVRT+zmwjNPVvZ2Y3IChoFURKwZndQh6qtEoVUfFlS1FoaVWUitCHPigIpm/6kEIt/iD+FRWsTxYfFLTio2bnzqYpzaPxoWBxZjZtWmyadO6RO8zGNdlN4vZmNot7nna5957zfXPuPffccwg9LtTj+NEn0G0PNnuAHMepENELAMoAbu8CuHkAvwM4BeCoEOKPlTAkBFzXvY2IvmLmx1dakOH4DBHt8Tzvu+VsKgLkuu73AHYtmngFQJwhYGVqE4ANTTbnADwkhPi1HQ4F/lkAXzZNeFtKOVqr1YKMwaNSqeSmpqZ2MvN7AO5N7Z8RQjwIgFvhUQR+ArAjHXxLCPF61sAX23Nd9y4A5wDcrMYMw9hWrVar7QioraJch1wuZ4+NjUXdJqDsO47zMREdSLG8IoRQXlkiygMN11wWQty6HsArDKVSaYSZ31S/ieiI53kjKxG4JIToRuhs+c36BLq9lfoe6LYHHMfZT0SfpDheFEJ81FOHmIHctGW9rEDno+gDapMVNIdRbVGIgYF6sVg24rio05MxcMWQsmpOT19q6NVOIDLNXWQYnwK4Qyf4Jl2zDLxhheFockc0XWQ37IHQsu43iHwAG9cI/IJaYt6bj6LPtRKoFwrvgvlgauUCgLZZZEcEiTaDeUu69pwZhlu0Eohs+zQBOxMDRE+YQbBsLv9fSVwYGtp0Uxyr3E1JbIbhBq0E6rb9M4CHE/zAjnwYqv8dCQPGxUJhnwTIDIITjShUt+2FtNoMQ1q3BKYtay8TnUiTuQP5IFCBAT1DoG7bzwH4IiGQHtieIsAA1QuF3cRM+TA8SemLbE09ENn2jwQ8km76p80w/LajA9BmUWDbt+SAmXT4uhmGA3rPgGW9A6JXUwPqTf0LAKmLBAMPEHBfoo/5rBlFW7USuFgsbpZSnmk8UXUBb6WHifZYQXBSK4HkkBUK28Gsosfda0RgBsyvmVH0fnLAdaYSDcBpDN8KZq1PVCnltb8GB8fvPH/+asPWmhDQ8eVd1x1g5kNK1+zs7LHJyUlV5Foi65ZAqVR6npmTRwwzv+T7/oe9RqBfVtGxlTvW8b+sSqzb0iIzj/i+f6TdIV4o7s7Pzw9NTEz82bHfNS50XfczAPtSlQeFEMnFtVhUW+kHIno0HRgVQhzWiKMjVeVy+R4p5VkAg6kCVwih3tot74EKgK+bRo7HcXx0fHxc9aoyleHh4Y1zc3OPATgGQPUIVGXa8zxP9exaStJiKpVKp5j5qUzRrs7YVWbe7vu+WI6AavIpV6k20zOr05vJrLqUcnetVju9nLV/Nbodx3kybbNuA6CqarlMoP5j5DKA34joG8Mwjq+mW9Tv1GfsoaVRqNsAbtR+z2+hvwGDxzBPjdwcsgAAAABJRU5ErkJggg==",mode:""}),null!=l.orderCount.payment&&l.orderCount.payment>0?(o(),u(Q,{key:0,class:"dot d-c-c"},{default:A((()=>[r(M(l.orderCount.payment),1)])),_:1})):f("",!0)])),_:1}),c(Q,null,{default:A((()=>[r("待付款")])),_:1})])),_:1}),c(b,{class:"item",onClick:a[5]||(a[5]=e=>d.jumpPage("/pages/order/myorder?dataType=delivery"))},{default:A((()=>[c(b,{class:"icon-box pr"},{default:A((()=>[c(T,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABF1BMVEUAAAAzMzMyMjIuLi4yMjIzMzMzMzMzMzMxMzMvMTHpDQ3uExMxMjIzMzP4ERHpERHuFBT1Dw/uFBTtExPuExNLLS0yMjIyMjIzMzPvExP1EhLuExMyMjIzMzPuExM2MTEeLi4sJCTwExMsMzPyEBAsLCzvDQ0zMzMqMzPuFBT5EBDuExNEMDA9MjLuERE6Ly/nAAAnNDTnEhLuFBQqNDToEhIwMzMuMzMmNTX6EBDuExPxEhIzMzMyMjLtERHvExM1MjL8Dg7aFBT5ERHuFBTqERHsEhLuFBQoNDTeFRXfExPuExM4MjLuExMnNjbsExPuFBQrMzPuFBTaExNHMTFHLy/yExNTKSlNJiYzMzPvExMlNTX2EhI+afzwAAAAWXRSTlMA9/4WsvH761kJE+Oxc/rhpRD4NZko1bhL+fn8+c6+OBYH6XAvFwzt69iXfiUeHRkH/f3y8e3iwLeioZt+ZlFI+vrj4t7Nx7Kxq6CSiYR7bWdkW0QvKyglFGECX+sAAAGXSURBVEjH7ZXXcoJAFIZhhVURaxRFEHuLPSYxGkt67x3w/Z8jDG03kwlZb3KR5Ltgfg58sxxg9lB/lWImzdLfwqYzRVvI5KAKIDCBYKDrAyvpum4cnboKcxlbSEMoMDxjwu9sA3p0xptpjx7ZZeOyAGHaFlhVyFd9FoX2hVh6LBSMlDrXDvJGsKjmBZW1BRkwPsohvh45rFhpvB99RZ36GCDbkQY8JiQToTUzcbFINIUJPKBdgSERmB8VeLxpXGh/1UPPrb/tZjHhGQk9fIXcLOBwr2DCVjjgMsshQZX9Do1GYomEjXrD7yKrSIBsnbXYZEVcMM5t6ixEAhCm5bBF+eYEf6Qrpx4uTwW86U7Qofeh6aegS4fstZL+Gv0ut8qXrnC3yqTCTYiFRaskico8liUUhkpJS0his0kqSJIWulRETVqSCcadR3dc5VTUiIRaq5RoPtQo6iU2zB53PASH7nVy0TdDazwvEghULe4EzhAJBJzfLPAkAu8KMukK8qfd2wO0e6P54AWaD2gCeYAm0Koz7h8y3gGyMTiEPF/SMQAAAABJRU5ErkJggg==",mode:""}),null!=l.orderCount.delivery&&l.orderCount.delivery>0?(o(),u(Q,{key:0,class:"dot d-c-c"},{default:A((()=>[r(M(l.orderCount.delivery),1)])),_:1})):f("",!0)])),_:1}),c(Q,{class:""},{default:A((()=>[r("待发货")])),_:1})])),_:1}),c(b,{class:"item",onClick:a[6]||(a[6]=e=>d.jumpPage("/pages/order/myorder?dataType=received"))},{default:A((()=>[c(b,{class:"icon-box pr"},{default:A((()=>[c(T,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAyVBMVEUAAAAtLS0yMjIzMzMzMzMzMzMzMzMzMzMyMjIzMzPuFBTsExPuFBQzMzPqExMzMzPuFBQzMzPuFBTuFBTuFBQyMjIzMzMtLS3uFBTuFBTuFBTuFBQyMjI0NDTxFRXtEhLsDg4zMzMzMzMzMzMzMzPvFBTuFBQzMzPuFBTvFBTuFBTuFRXtFBQ0NDTuFBQzMzMyMjLtEhLwFBQ1MzPuFBTuFRXtExMzMzMyMjIzMzPtFBQ0NDTtFhY2Li43NzftEhL/JCQzMzPuFBS91jauAAAAQXRSTlMAEbvx0rQexGZV1yf5zjcwLPnzsq+UYQv76eRgUSYjHBHt6ODWzcCqqJiNenJsUU06OTHp2rmfjIRoZWM6IRcOBzLye0UAAAEkSURBVEjH7c3XcoMwEIXhjSFxXLABF9wA997i9J6z7/9QYWIjmWRG4Jv4hu9qR9KvpTP5XNpV/5TAG3Fxd0pQyDOXSKXcye1tfwUfh4tOOfJch7CJBgNxocvE1SDlSmYYfK3b3VsImhsGEyC7ut7brMfjF/KDwKRlvrV4P5yvssAkDHroOxSaM7fa5oj5rd1knolzp49eOAcLSLi5Z24+3DFPW9yomiQEKyKBLCpF5gYHipUdJQioMLU5IP6PDcif2T//FyhhQN25Hbz3KDaQxaJZ9UgdqEUDCwbFM2DJEXWKUwcMOSfzKuoakqiRlEE8jY5cAuULpeGf4IqU9DRIgzQ4X1ADnknFtTCkI1sA2YyCBjxRdEUcw6GIum5BYfDo0H/5BmxNbfnAnR7cAAAAAElFTkSuQmCC",mode:""}),null!=l.orderCount.received&&l.orderCount.received>0?(o(),u(Q,{key:0,class:"dot d-c-c"},{default:A((()=>[r(M(l.orderCount.received),1)])),_:1})):f("",!0)])),_:1}),c(Q,null,{default:A((()=>[r("待收货")])),_:1})])),_:1}),c(b,{class:"item",onClick:a[7]||(a[7]=e=>d.jumpPage("/pages/order/myorder?dataType=comment"))},{default:A((()=>[c(b,{class:"icon-box pr"},{default:A((()=>[c(T,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAD00lEQVRoQ+2Zz4sbZRjHv8++cWlB625m2gZE0LVgD1tcZgYlJ1OUIir2oAiC+OMk9Q+wBUEQRBEEb+LNHzfZi3gQxVrUy5I4SRZCc1IUbJcsu5lsN7GLk515ZEISkslO8k4yO9mFvKeEeX58vu+ved95CMe80THnx0xAVCPIgGikUsl7K5UdApqycUeOgK7rj7iu+4AQYk42aJCd4zg3i8Xilv955ezZM/P7+9dBdAHALUF08f6trT9k8gUKMAzjRWb+AMB5mUCSNncSicRyNpu91bFvwbvuz2Be7olxWxBlZEQcKEDX9fcAvC8JFcrsnG2//E2ptOo51VOp003HueGD78STEjEgQNf1SwB+9FHVAbihSAeNnRPMv75Wqbz61sbG3QD4LIAnwozEgABN034hoifbQf4hopdM08xNCN/nHgD/+eL29ts1RbkKoo9kRfgFkK7r+wBaC5aInjNN8/u44AlgL5elKNdkRfQJyGQyiXq93t3C5ufnlbW1NSsqAcN6vgPfySUrYqgAx3EW19fXd6IQEAZ+mAhbiEdTm5v/dmxiETAOfFeEqn4L4HLnP7vusmJZN2MTMBG8olwB0Wc9M2CXXfdBxbJ2YxEQNbzLfEmtVr2tttsObQrFAd/aKXvV+HehcRdxXPCHIiBO+MgFxA0fuYCaqmYZeLxnWraOB/6XlP+9Yh2w2/QuWE3TzjWbzWqpVKr5fSNbA9Vk8hTNzd2JGt4wjHeY+WMAO0IILZfL/XUou1BtYWGBE4luD1Ei8fBipfL3sLf4qJ73fA3D+J2ZjfbZ7HXTNL8+EgJk4D1QXdfXATzm/WbmNwuFwpdTFyALfyQFhIE/cgLCwk9VgMQRfPegs43fL7Y1sKWq9wmge0ocIUAKPtYR8JLVVPUnBp4eAW+5zM/6T5VBPrGNQGubA4SVTJ6fE+KeIKB95j9Pb297XzmkWqwCpIhCGs0ERHWpD9nxXfPZCMxGYNy50/abTaFjPYWEEGoul6tOOAsmcu+dQgDeyOfzXwXeB7zPLL6v05dN0/xuIoIJnNPpdNK27dsATrQvNM8UCoW+2sVAfcAwjOvM/FQ774bruq8Ui8XfJuAYy3VlZeUhIcQXADLtAHt7e3tnyuVyY9gIeFe4iwBu+LLeRYjK4VjE/U5ex57qAyX60DTNd/2xg2pk1wD0VkkiYBo/BBH9wMwv5PP5gfJrYJVS07TnicirUrYu1FNqmwA+XVpa+mR1ddU5iGFknTidTp8EcNK27YnrxLKdIITgRqPxX7lc9goZrbJTUBspQDbptOxmAqbV8528/wOCn+FeFwB2PQAAAABJRU5ErkJggg==",mode:""}),null!=l.orderCount.comment&&l.orderCount.comment>0?(o(),u(Q,{key:0,class:"dot d-c-c"},{default:A((()=>[r(M(l.orderCount.comment),1)])),_:1})):f("",!0)])),_:1}),c(Q,null,{default:A((()=>[r("待评价")])),_:1})])),_:1}),c(b,{class:"item",onClick:a[8]||(a[8]=e=>d.jumpPage("/pages/order/refund/index/index"))},{default:A((()=>[c(b,{class:"icon-box pr"},{default:A((()=>[c(T,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAn1BMVEUAAAAzMzMzMzMyMjIyMjIuLi4zMzPwFBTtFRXuFRXtFBQzMzMzMzMzMzMyMjI0NDQzMzPuFBQ0NDQzMzPuFBQzMzPuFBQzMzMyMjLwExPsExP1FxfuFBQzMzMzMzPuFBQzMzMzMzPuExPuFBTtFBTvFhbwExMzMzMzMzPuFBTuFBTtExPtFBTvExMzMzPzFxfuERHrFBT/AAAzMzPuFBQlycWVAAAAM3RSTlMAw4i7MxCqMlWIZvLhzyAM5GET7uje176VQRoH99jGtLGFhFI4LyD088LBn4BQGRYPDQRjQMYTAAABA0lEQVRIx+3Vy3KCMBiG4Z9QyvksgqBWbWvPx4/7v7bC2JFkMAbGlY7PJlnknUmy+eliGCzDTsbCIecX6PgDigJwNb2VPwOMlCKkAe0ELjxSArT9XgfGBSsgMHpCecBwkFskkiDxcNgiEYOuWN/2rVKgEAOFzxTRqIA0gA/8GxVfCIY4MYiYSgSMfPQ1+A8eTdMsiSpTUEmDt7oxN+m1FkylwUvd+qCJGMwrWbB9t207bm62sTmbh3P61p97y7KaG381K6eUBnd1a0bTWjAZHfzKgu/YcZwZUdmsnXh7Jt+6JJUlH2R4CkiuP2jWgJvrx+SuMMpCH2q+QVzBPBznMYMuxh/ZpF+lQeKJcwAAAABJRU5ErkJggg==",mode:""}),null!=l.orderCount.refund&&l.orderCount.refund>0?(o(),u(Q,{key:0,class:"dot d-c-c"},{default:A((()=>[r(M(l.orderCount.refund),1)])),_:1})):f("",!0)])),_:1}),c(Q,null,{default:A((()=>[r("退款/售后")])),_:1})])),_:1})])),_:1})])),_:1}),c(b,{class:"menu-wrap"},{default:A((()=>[c(b,{class:"my-assets-all p-0-30"},{default:A((()=>[c(b,{class:"f30 fb"},{default:A((()=>[r("我的服务")])),_:1})])),_:1}),c(b,{class:"group-bd f-w"},{default:A((()=>[(o(!0),g(m,null,z(l.menus,((e,a)=>(o(),u(b,{class:n("item "+e.icon+"-box"),key:a,onClick:a=>d.jumpPage(e.link_url)},{default:A((()=>[c(b,{class:"icon-round d-c-c"},{default:A((()=>[c(T,{class:"icon-round",src:e.image_url,mode:""},null,8,["src"])])),_:2},1024),c(Q,{class:"name"},{default:A((()=>[r(M(e.title),1)])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1}),c(b,null,{default:A((()=>[c(w,{location:20})])),_:1})])),_:1})),c(k,{loadding:l.isloadding},null,8,["loadding"]),c(C)])),_:1},8,["data-theme","class"])}],["__scopeId","data-v-c4f0954b"]]);export{T as default};
