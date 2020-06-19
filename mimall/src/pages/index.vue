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
      <div class="product-box"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ServiceBar from '../components/ServiceBar'
export default {
  name: 'index',
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
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
      ]
    }
  },
  methods: {
    getImgs (list) {
      for (let item of list) {
        const img = item.img
        item.img = require(`../../static/imgs${img}`)
      }
      return list
    }
  },
  mounted () {
    this.slideList = this.getImgs(this.slideList)
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
}
</style>