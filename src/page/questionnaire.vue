<template>
  <v-container fuild class = 'container'>
    <div class="tkui container-gutter">
      <tk-flex middle class = 'label question'>
        <div class="icon">1</div>
        <div class="fill">
          基于您对产品的体验，总体来说您对我们的满意程度如何
        </div>
      </tk-flex>
      <v-list class = 'table exam' two-line subheader>
        <v-list-tile class = 'list'>
          <v-list-tile-content>
            <v-list-tile-title>项目价格</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <star :maxSize = '5' v-model = 'price'  :fullIcon = 'fullIcon' :emptyIcon = 'emptyIcon' @change = 'addPrice' disable></star>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class = 'list'>
          <v-list-tile-content>
            <v-list-tile-title>我们更新及问题反馈</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <star :maxSize = '5' v-model = 'question' :fullIcon = 'fullIcon' :emptyIcon = 'emptyIcon' @change = 'addQuestion' disable></star>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile  class = 'list'>
          <v-list-tile-content>
            <v-list-tile-title>产品设计及界面UI设计</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <star :maxSize = '5' v-model = 'product' :fullIcon = 'fullIcon' :emptyIcon = 'emptyIcon' @change = 'addProduct' disable></star>
          </v-list-tile-action>

        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile  class = 'list'>
          <v-list-tile-content>
            <v-list-tile-title>最终产品的技术效果</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <star :maxSize = '5' v-model = 'final'  :fullIcon = 'fullIcon' :emptyIcon = 'emptyIcon' @change = 'addFinal' disable></star>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <tk-flex middle class = 'label question'>
        <div class="icon">2</div>
        <div class="fill">
          对于我们您认为，有哪些需要改善的地方
        </div>
      </tk-flex>
      <textarea v-model="proposal" class = 'table textarea exam' placeholder="您对我们有什么意见和建议，请反馈给我们">
            </textarea>
      <tk-flex top class = 'cursor exam' :class = "{'prim': tuijian}" @click.native = 'toogle("tuijian")'>
        <tk-icon type="custom" class = 'icon_size'>{{tuijian ? "squarecheckfill" : "square"}}</tk-icon>
        <div class="fill">您是否会把"默客科技"推荐给您的朋友？</div>
      </tk-flex>
      <tk-flex top class = 'cursor exam' :class = "{'prim': tuisong}" @click.native = 'toogle("tuisong")'>
        <tk-icon type="custom" class = 'icon_size'>{{tuisong ? "squarecheckfill" : "square"}}</tk-icon>
        <div class="fill">是否可以把"Prowered by 默客" 添加在项目启动页</div>
      </tk-flex>
      <div class="exam desc">示例</div>
      <img src="../assets/img/img1_question.png" class = 'exam photo' alt="" v-if = 'screenWidth >= 768 '>
      <img src="../assets/mobile_img/img2.png" class = 'exam photo' alt="" v-else>
      <v-btn primary block class="button primary raised" @click.native = 'submit'>提交</v-btn>
    </div>
  </v-container>
</template>
<script>
  import myFooter from '~components/footer'
  import star from '~components/star'
  export default {
    data () {
      return {
        price: 0,
        product: 0,
        final: 0,
        question: 0,
        proposal: '',
        emptyIcon: {
          type: 'custom',
          icon: 'shoucang',
          style: {
            color: '#ccc'
          }
        },
        fullIcon: {
          type: 'custom',
          icon: 'shoucangfill'
        },
        tuijian: true,
        tuisong: true,
        screenWidth: 0
      }
    },
    methods: {
      addPrice (opt) {
        this.price = opt
      },
      addProduct (opt) {
        this.product = opt
      },
      addFinal (opt) {
        this.final = opt
      },
      addQuestion (opt) {
        this.question = opt
      },
      toogle (opt) {
        this[opt] = !this[opt]
      },
      submit () {
        console.log(this.proposal)
      }
    },
    mounted () {
      this.screenWidth = window.innerWidth
    },
    components: {
      myFooter, star
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style';
  .container{
    background: $white;
    padding:0 !important;
    .container-gutter{
      overflow: hidden;
      max-width:1200px;
      margin:0 auto;
      height:100%;
      @media  screen and (max-width:768px){
        padding: 0 $gutter-max;
      }
      .label{
        &.question{
          margin-top: 70px;
        }
        .icon{
          width:21px;
          height:21px;
          background: #fff;
          border-radius:20px;
          margin-right:10px;
          font-size:12px;
        }
        margin-left:117px;
        @media  screen and (max-width:768px){
          margin-left:0;
          &.question{
            margin-top: 30px;
          }
        }
      }
    }
    .button{
      width:420px;
      margin:20px 0 52px 167px;
      color:#fff;
      background:linear-gradient(175deg, #01f6fb, #00a0eb);
      @media  screen and (max-width:768px){
        width:100%;
        height:44px;
        margin-left:0;
      }
    }
    .table{
      &.textarea{
        height:200px;
      }
      margin-top:20px;
      max-width:680px;
      width:100%;
      background: #fff;
      padding: $gutter;
      outline:none;
      .desc{
        color: #cccccc;
      }
      .tkui-table-row{
        &:hover,&:active{
          background: $table-background-color;
        }
      }
    }
    .exam{
      margin-left: 164px;
      line-height:2em;
      .fill{
        margin-left:10px;
      }
      @media  screen and (max-width:768px){
        margin-left:0;
      }
      &.desc{
        color:#999;
        line-height:2em;
      }
      &.photo{
        display:block;
        width:120px;
        height:auto;
      }
    }
    .prim{
      color: $primary-color;
    }
  }
</style>
