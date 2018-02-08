<template>
  <div class="con" :class = '[$route.fullPath === "/question" ? "border" : "box"]'>
    <tk-flex middle class = 'header'>
        <img src="../assets/img/logo_question.png" class = 'logo' alt="" v-if = 'screenWidth >= 768 '>
        <img src="../assets/mobile_img/logo_s.png" class = 'logo' alt="" v-else>
        <div class="title" v-if = '$route.fullPath === "/question"'>产品满意度调查问卷</div>
        <div class="logo-introduction" v-else>
          专业跨平台app开发<br />
          <span>默客  &nbsp;&nbsp;以代码发声</span>
        </div>
      <div class="fill"></div>
      <a href="http://www.mokekeji.com/" v-if = '$route.fullPath !== "/question"'>返回首页</a>
    </tk-flex>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        screenWidth: 0
      }
    },
    mounted () {
      this.screenWidth = window.innerWidth
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style';
  .con{
    background: $white;
    &.border{
      border-bottom: 1px solid $primary-color;
    }
    &.box{
      margin-bottom:7px;
      box-shadow: 0px 4px 7px 0 rgba(0, 0, 0, 0.19);
    }
    .header{
      overflow: hidden;
      max-width:1200px;
      margin:0 auto;
      height:76px;
      a{
        color: #666;
      }
      @media  screen and (max-width:768px){
        height:48px;
      }
      .logo{
        width: 138px;
        height:45px;
        margin-right:10px;
        @media  screen and (max-width:768px){
          width:69px;
          height:22.5px;
        }
      }
      .logo-introduction{
        @media  screen and (max-width:768px){
          padding-left:10px;
          font-size:14px;
          line-height:1em;
        }
        border-left: 1px solid #999;
        padding-left: 20px;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.25;
        letter-spacing: 1.2px;
        text-align: left;
        color: #666;
        vertical-align: middle;
        margin-top: 2px;
        span{
          line-height: 1.43;
          font-size: 14px;
          letter-spacing: 4.7px;
          text-align: left;
        }
      }
      .title{
        border-left:1px solid #666;
        padding-left:1em;
      }
      @media  screen and (max-width:768px){
        padding: 0 $gutter-max;
      }
    }
  }
</style>
