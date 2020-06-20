<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="item in productClass" :key="item">
              <a href="javascript:;">{{item}}</a>
              <div class="children">
                <ul v-for="i in 6" :key="i">
                  <li v-for="j in 4" :key="j">
                    <a href="/#/product/30">
                      <img src="../../static/imgs/item-box-1.png" alt />
                      小米CCC9
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in slideList" :key="item.img">
            <a :href="'/#/product/'+item.id">
              <img :src="item.img" alt />
            </a>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a href="/#/product/30" v-for="i in 4" :key="i">
          <img src="../../static/imgs/ads/ads-1.png" alt />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="../../static/imgs/banner-1.png" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img src="../../static/imgs/mix-alpha.jpg" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneLIst" :key="i">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span :class="{'new-pro': j%2===0, 'kill-pro': j%2===1}">新品</span>
                <div class="item-img">
                  <img :src="item.mainImage" alt />
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price | currency}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      @submit="gotoCart"
      @cancel="()=>{this.showModal=false}"
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ServiceBar from '../components/ServiceBar'
import Modal from '../../src/components/Modal'
export default {
  name: 'index',
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      showModal: false,
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: .94
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      slideList: [
        {
          id: '42',
          img: '/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/slider/slide-3.jpg'
        },
        {
          id: '',
          img: '/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/slider/slide-5.jpg'
        }
      ],
      productClass: [
        '手机 电话卡', '电话 盒子', '笔记本 平板', '家电 插线板', '出行 穿戴', '智能 路由器', '电源 配件', '生活 箱包'
      ],
      menuList: [
        {
          id: 30,
          img: '../../static/imgs/item-box-1.png',
          name: '小米CCC9'
        }
      ],
      adsList: [
        {
          id: 33,
          img: '../../static/imgs/ads/ads-1.png'
        }
      ],
      phoneLIst: []
    }
  },
  methods: {
    getImgs (list) {
      for (let item of list) {
        const img = item.img
        item.img = require(`../../static/imgs${img}`)
      }
      return list
    },
    async init () {
      await this.axios.get('/products', {
        params: {
          categoray: {
            categoryId: 100012,
            pageSize: 8
          }
        }
      }).then((res) => {
        this.phoneLIst = [res.list.slice(0, 4), res.list.slice(4, 8)]
      })
      this.getPhoneListImg()
    },
    getPhoneListImg () {
      let list = this.phoneLIst
      for (let arr of list) {
        for (let item of arr) {
          const flag = item.mainImage.search('http') === -1
          if (flag) {
            item.mainImage = item.imageHost + '/' + item.mainImage
          }
        }
      }
      this.phoneLIst = list
    },
    addCart (id) {
      this.showModal = !!id
      return;
      // this.axios.post('/carts', {
      //   productId: id,
      //   selected: true
      // }).then(() => {
      // }).catch(() => {
      // })
    },
    gotoCart () {
      this.$router.push('/cart')
    }
  },
  filters: {
    currency (val) {
      if (!val) return '0.00';
      return '￥' + val.toFixed(2) + '元'
    }
  },
  mounted () {
    this.slideList = this.getImgs(this.slideList)
    this.init()
  },
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
@import './../assets/scss/base.scss';

.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 451px;
      }
      .swiper-button-prev {
        left: 274px;
      }
    }
    .nav-menu {
      box-sizing: border-box;
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #80808085;

      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: white;
            padding-left: 30px;
            &::after {
              content: '';
              position: absolute;
              right: 30px;
              top: 17px;
              @include bgImg(10px, 15px, '../../static/imgs/icon-arrow.png');
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            right: 0;
            border: 1px solid #e5e5e5;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
  .ads-box {
    margin-top: 20px;
    @include flex();
    a {
      display: inline-block;
      width: 290px;
      height: 167px;
    }
  }
  .banner {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .product-box {
    background: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: 22px;
      height: 21px;
      line-height: 21px;
      color: #333;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        display: flex;
        flex-direction: column;
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background: white;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              text-align: center;
              line-height: 24px;
              color: white;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background: #e82626;
              }
            }
            .item-img {
              img {
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: 14px;
                color: #333;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px;
              }
              .price {
                font-size: $fontJ;
                color: #f20a0a;
                font-weight: bold;
                cursor: pointer;
                &::after {
                  content: '';
                  @include bgImg(
                    22px,
                    22px,
                    '../../static/imgs/icon-cart-hover.png'
                  );
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>