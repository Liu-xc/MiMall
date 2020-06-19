<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
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
      <div class="ads-box"></div>
      <div class="banner"></div>
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
.index {
  .swiper-box {
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>