<template>
  <v-container class = 'container'>
    <div class="con">
      <div class="con_title">
        {{ projectName }}（评估中）
      </div>
      <div class="con_body">
        <v-list two-line class = 'list_body'>
          <v-list-tile v-for = '(item, key) in message' :key = 'key'>
            <v-list-tile-action>
              <tk-icon type="custom" class = 'photo' v-if = 'item.identity === "custom"'>touxiang</tk-icon>
            </v-list-tile-action>
            <v-list-tile-content :class = '["con_list", item.identity === "custom"? "li_custom": "li_seller"]'>
              <tk-flex middle class="desc">
                <span>{{item.name}}</span>
                <div class="li_con" v-if = 'item.identity === "custom"'>
                  <tk-icon type="custom" class = 'icon'>phone-line</tk-icon><span>{{item.phoneNumber}}</span>
                </div>
              </tk-flex>
              <div class="message" :class = '[item.identity === "custom"? "custom": "seller"]'>
                {{item.message}}
              </div>
            </v-list-tile-content>
            <v-list-tile-action>
              <tk-icon type="custom" v-if = 'item.identity !== "custom"' class = 'photo'>user__easyico</tk-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
      <div class="input">
        <div class="input_title">如需补充和回复请在下面输入</div>
        <textarea v-model = 'content' placeholder = '请输入您的需求和补充。' class = 'textarea'></textarea>
        <tk-flex class="input_bottom" right middle>
          <v-btn small primary class.native="submit">提交</v-btn>
        </tk-flex>
      </div>
      <div class="tip">
        <tk-icon type="custom">time</tk-icon>
        当有新的消息回复时，会自动发送至您的手机。
      </div>
    </div>
  </v-container>
</template>
<script>
  import myContainer from '~components/container'
  export default {
    data () {
      return {
        projectName: this.$route.query.project === 'fangzhihui' ? '房智汇' : '项目名称',
        content: '',
        message: [{
          identity: 'custom',
          phoneNumber: '客户电话',
          message: '123',
          name: '客户身份'
        }]
      }
    },
    components: {
      myContainer
    }
  }
</script>
<style lang='scss' scoped>
  @import '../assets/scss/style';
  .container{
    background: $white !important;
    @media screen and (max-width: 768px){
      padding: 0 $gutter !important;
    }
    .con{
      max-width:1200px;
      margin:15px auto;
      background: $background-color;
      .con_title{
        font-size: 18px;
        font-weight: bold;
        line-height: 55px;
        text-align:center;
        background-color: #f4f8fa;
      }
      .con_body{
        padding:0 62px;
        box-sizing: content-box;
        @media screen and (max-width: 768px){
          padding: 0 $gutter ;
        }
        .list_body{
          .photo{
            width:55px;
            height:55px;
          }
          background: transparent;
          .con_list {
            margin-bottom:20px;
            .desc{
              font-size: 12px;
              font-weight: bold;
              line-height: 1.69;
              text-align: left;
              color: #363636;
              .li_con{
                .icon{
                  width:20px;
                  height:20px;
                }
                color: #6a6a6a;
                margin-left: 15px;
              }
            }
            &.li_custom{
              margin-left: 15px;
              align-items: flex-start;
            }
            &.li_seller{
              margin-right:15px;
              align-items:flex-end;
            }
            .message{
              border-radius:8px;
              padding:8px;
              &.seller{
                background: $white;
              }
              &.custom{
                background:#cdf1f6;
              }
            }
          }
        }
      }
      .input{
        margin-top: 20px;
        width: calc(100% - 124px);
        margin:0 auto;
        background:#fff;
        border: 1px solid #dcdcdc;
        @media screen and (max-width:768px){
          width:100%;
        }
        .input_title{
          font-size: 14px;
          line-height: 2.6;
          text-align: left;
          text-indent: 1em;
          color: #a6a6a6;
          border-bottom: 1px solid #dcdcdc;
          @media screen and (max-width:768px){
            font-size: 14px;
          }
        }
        .textarea{
          padding: 1em;
          width:100%;
          height:173px;
          box-sizing: content-box;
        }
        .input_bottom{
          border-top:1px solid #dcdcdc;
          height:44px;
          padding:0 10px;
          .submit{
            margin:0;
            width:210px;
            height:25px;
            font-size:12px;
            border-radius: $button-border-radius;
            background-color: #f74d62;
            color: #fff;
          }
        }
      }
      .tip{
        margin-left:72px;
        padding-bottom:76px;
        font-size: 12px;
        line-height: 1.56;
        text-align: left;
        line-height:3em;
        color: #f74d62;
      }
    }
  }

</style>
