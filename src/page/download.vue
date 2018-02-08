<template>
  <v-container>
    <div class="con">
      <div class="con_title" v-if = 'project'>
        <div class="bg">
          <div class="con_header">{{ project.name }}</div>
          <a :href="project.demoUrl" class="text-hidden desc"><span>测试地址:{{project.demoUrl}}</span></a>
          <div class="copy">版本: {{project.demoVersion}}</div>
        </div>
      </div>
      <v-list>
        <v-list-tile tag="ul" v-for = '(item,key) in arr' :key = 'key' class = 'list'>
          <v-list-tile-content class = 'con_body'>
            <v-divider v-if = 'key!== 0'></v-divider>
            <div class="con_title">{{item.name}}</div>
            <div class="con_time">更新于: {{item.created_at |time}}</div>
            <vue-markdown class="bg desc markdown">{{item.body}}</vue-markdown>
            <div class="subhead down">
              下载
            </div>
            <tk-flex>
              <v-btn  @click.native = 'download(it)' v-for = '(it, k) in item.download' :key = 'k'>{{it.title}}</v-btn>
            </tk-flex>
            <div class="subhead down">
              部署
            </div>
            <tk-flex>
              <v-btn @click.native = 'deploy(item)'>部署到测试地址</v-btn>
            </tk-flex>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <tk-cover center middle :show = 'complete' :hideOnClick="false" color="rgba(0,0,0,.56)">
      <tk-flex column middle center class="shadow_con">
        <tk-loading :center = 'false' type = 'bounce' color="#00a0ea"></tk-loading>
        <div class="show_desc">{{ context }}</div>
      </tk-flex>
    </tk-cover>
  </v-container>
</template>
<script>
  import myContainer from '~components/container'
  import messageBox from '~components/popup/'
  import VueMarkdown from 'vue-markdown'
  export default {
    data () {
      return {
        arr: [],
        context: '',
        complete: false,
        projectName: 'fangzhihui',
        project: null
      }
    },
    activated () {
      this.$tkAjax.get(`/gitoauth/${this.projectName}`).then(({ data }) => {
        this.arr = data
      }).catch(() => {
        messageBox({
          alert: false,
          message: '未能获取版本列表'
        })
      })
      this.getProjectInfo()
    },
    filters: {
      time (opt) {
        let date = new Date(opt)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        date = date.toLocaleDateString()
        return year + '年' + month + '月' + day + '日'
      }
    },
    components: {
      myContainer, VueMarkdown
    },
    methods: {
      getProjectInfo () {
        this.$tkAjax.get(`/project/getByPath/${this.projectName}`).then(({ data }) => {
          this.project = data
        }).catch(() => {
          messageBox({
            alert: false,
            message: '未能获取版本信息'
          })
        })
      },
      deploy (opt) {
        this.complete = true
        this.context = '正在部署项目...'
        this.$tkAjax.post('project/deploy', {
          path: this.projectName,
          tag: opt.name
        }).then(() => {
          this.complete = false
          this.getProjectInfo()
          messageBox({
            alert: false,
            message: '项目部署成功'
          })
        }).catch(() => {
          this.complete = false
          messageBox({
            alert: false,
            message: '项目部署失败'
          })
        })
      },
      download (opt) {
        this.context = '正在生成链接...'
        this.complete = true
        this.$tkAjax.get(opt.link).then(({ data }) => {
          this.complete = false
          window.location.href = data.url
        }).catch(() => {
          this.complete = false
          messageBox({
            alert: false,
            message: '文件下载失败'
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style';
  .con{
    max-width:1200px;
    min-height:67vh;
    margin:15px auto;
    background:#fff;
    @media  screen and (max-width:768px){
      padding:0 $gutter;
      background-clip: content-box;
    }
    .bg{
      background-color: #f4f8fa;
      width:100%;
    }
    .con_title{
      .bg {
        padding: 20px 65px;
        .con_header{
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 1.4px;
          width:100%;
          text-align: center;
          color: #363636;
        }
        .desc{
          &:before{
            content: '';
            display: block;
            border-radius: 12px;
            width:12px;
            height:12px;
            margin-right:15px;
            background-color:$warnColor
          }
          &:hover {
            span{
              color: $primary-color;
              border-bottom: 1px solid $primary-color;
            }
          }
          span {
            line-height:1.5em;
            display: inline-block;
            border-bottom: 1px solid transparent;
          }
          width: auto;
          display:flex;
          align-items: center;
          margin: 18px 0 4px;
          font-size:20px;
          color: #666;
          font-weight: bold;
        }
        .copy{
          font-size:16px;
          color:#999;
          margin-bottom:3px;
          margin-left: 27px;
        }
        @media screen  and (max-width: 768px){
          padding:10px $gutter;
          .desc{
            font-size:14px;
            &:before{
              content: '';
              display:none;
            }
          }
          .copy{
            margin-left:0;
          }
        }
      }
    }
    .list{
      &:nth-child(2){
        .border{
          display:none;
        }
      }
      &:last-child{
        padding-bottom: 40px;
      }
      margin-top:20px;
      .list_tile{
        height:auto !important;
      }
      .con_body{
        flex:1;
        padding: 0 50px;
        .border{
          border-bottom:1px dashed $list-border-color;
        }
        @media  screen and (max-width:768px){
          padding: 0 $gutter;
        }
        .con_title{
          font-size: 32px;
          font-weight: bold;
          line-height: 2.2;
          letter-spacing: 1.4px;
          color: $primary-color;
        }
        .con_time{
          font-size: 16px;
          line-height: 2.2;
          letter-spacing: 0.7px;
          color: #666666;
        }
        .desc{
          min-height: 60px;
          padding:32px 10px 16px;
          display:flex;
          flex-direction: column;
          justify-content: center;
          line-height:1.2;
          white-space: pre-line;
          width:100%;
          font-size:16px;
          border-left: 2px solid $primary-color;
          @media  screen and (max-width:768px){
            line-height:30px;
          }
        }
        .down{
          font-weight: bold;
          line-height: 2.5;
          letter-spacing: 1.2px;
        }
      }
    }

  }
  .shadow_con{
    width: 150px;
    height:150px;
    .show_desc{
      font-size: 16px;
      color: rgba(255, 255, 255, .8);
      margin-top: 36px;
    }
  }
</style>
