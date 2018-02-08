<template>
  <v-footer class="footer" id="contact">
    <div class="footer_container">
      <div class="logo-name fl">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <div class="tk-grid-2 fl">
        <div class="desc">石家庄瑾思科技</div>
        <div class="desc">备案 冀ICP备17015011号-1. </div>
      </div>
      <div class="tk-grid-2 fl">
        <div class="desc">联系我们</div>
        <div class="desc">联系人：赵经理</div>
        <div class="desc">电话：0311-66561251</div>
      </div>
      <div class="tk-grid-2 fl">
        <div class="desc">邮箱：contact@mokekeji.com</div>
        <div class="desc">地点：河北省石家庄长安区东胜广场C座14层</div>
      </div>
      <div class="company-tell">
        <img src="../assets/mobile_img/kefu.png" class="company-tell-img">
      </div>
      <div class="company-introduction">
        石家庄瑾思科技
      </div>
    </div>
  </v-footer>
</template>
<script>
  export default{
    data () {
      return {
        screenWidth: ''
      }
    },
    mounted () {
      this.screenWidth = window.innerWidth
    }
  }
</script>
<style lang='scss' scoped>
  .footer{
    overflow:hidden;
    height:216px;
    background-color: #262626 !important;
    @media screen and (max-width: 768px) {
      width: 100%;
      background-color: #252525;
      text-align: center;
      line-height: 2em;
      height: auto;
      overflow: hidden;
    }
    .footer_container{
      margin: 62px auto;
      width:80%;
      .fl{
        float:left;
        text-align:center;
        @media screen and (max-width: 768px) {
          display:none;
        }
        &.logo-name{
          text-align:left;
          margin-right:5%;
          margin-left:20%;
        }
        .desc{
          width: 100%;
          font-size: 9px;
          line-height: 2em;
          text-align: left;
          color: #e0e0e0;
        }
      }
      .company-tell-img {
        margin: 35px auto 15px;
        display: block;
        height:19px;
        @media screen and (min-width: 768px) {
          display:none;
        }
      }
      .company-introduction {
        padding: 0 1em;
        box-sizing: border-box;
        font-size: 16px;
        text-align:center;
        color: rgba(255, 255, 255, .5);
        @media screen and (min-width: 768px) {
          display:none;
        }
      }
    }
  }
</style>
