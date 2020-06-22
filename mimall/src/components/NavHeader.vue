<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-else @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>购物车
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item, index) in phoneList" :key="index">
                  <!-- 当使用v-bind时，双引号内的是JS代码，字符串拼接需要加引号 -->
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <!-- 过滤器的使用,不需要使用this.语法 -->
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product" v-for="i in 6" :key="i">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6a6548361871303764d6c66142074524.png"
                        alt
                      />
                    </div>
                    <div class="pro-name">小米CC9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product" v-for="i in 6" :key="i">
                  <a href target="_blank">
                    <div class="pro-img">
                      <img
                        src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0112cb7e2ea8489fbd36ce3a781d5232.jpg"
                        alt
                      />
                    </div>
                    <div class="pro-name">小米CC9</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      username: '',
      phoneList: []
    }
  },
  filters: {
    currency (val) {
      if (!val) return '0.00';
      return '￥' + val.toFixed(2) + '元'
    }
  },
  mounted () {
    this.getProductList()
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    getProductList () {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then((res) => {
        this.phoneList = res.list
      })
    },
    goToCart () {
      // 动态路由通过this.$router.params或this.$router.query取参数
      this.$router.push('/cart')
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();

      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: white;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, '../../static/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        overflow: hidden;
        background-color: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &::before {
            content: '';
            @include bgImg(55px, 55px, '../../static/imgs/mi-logo.png');
            transition: margin 0.4s;
          }
          &::after {
            content: '';
            @include bgImg(55px, 55px, '../../static/imgs/mi-home.png');
          }
          &:hover::before {
            margin-left: -55px;
          }
        }
      }
      .header-menu {
        display: inline-block;
        padding-left: 210px;
        width: 643px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            overflow: hidden;
            position: absolute;
            z-index: 10;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            transition: all 0.3s 0.3s;

            .product {
              position: relative;
              background-color: #ffffff;
              float: left;
              width: 16.6%;
              height: 220px;
              cursor: pointer;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                height: 111px;
                width: auto;
                margin-top: 20px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &::before {
                content: '';
                position: absolute;
                top: 28px;
                right: 0;
                height: 100px;
                width: 1px;
                border-left: 1px solid $colorF;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
    }
  }
  .header-search {
    width: 320px;
    .wrapper {
      height: 50px;
      border: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      input {
        box-sizing: border-box;
        border: none;
        border-right: 1px solid #e0e0e0;
        width: 264px;
        height: 50px;
        outline: none;
        padding-left: 14px;
      }
      a {
        @include bgImg(18px, 18px, '../../static/imgs/icon-search.png');
        margin-left: 18px;
      }
    }
  }
}
</style>