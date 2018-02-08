<template>
  <v-container class="container" fuild>
    <div class="smallContainer" v-if = 'params'>
      <tk-flex center middle>
        <v-subheader class = 'tk-grid-2'>标题</v-subheader>
        <v-text-field class = 'fill' v-model="params.title"></v-text-field>
      </tk-flex>
      <tk-flex>
        <v-btn @click.native="addDesc">增加描述</v-btn>
        <v-btn @click.native="addCreate">增加开发报价</v-btn>
        <v-btn @click.native="addImage">增加流程图</v-btn>
        <v-btn @click.native="addAction">增加功能列表</v-btn>
        <v-btn @click.native="addPage">换页</v-btn>
      </tk-flex>
      <div>
        <tk-flex column v-for="(item, key) in params.items" :key="key">
          <tk-flex column v-if="!item.img && !item.table && item.type === 'content'">
            <tk-flex between>
              <v-text-field class="tk-grid-2" style="margin-right: 20px" v-model="item.title" placeholder = '项目描述标题'></v-text-field>
              <v-btn @click.native = 'removeMoudle(key)'>删除</v-btn>
            </tk-flex>
            <textarea name="textarea" cols="100" v-model="item.content" rows="5" class="textArea" placeholder="项目描述信息"></textarea>
          </tk-flex>
          <v-divider v-if="item.type === 'pageBreaker'" class = 'primary'></v-divider>
          <tk-flex right>
            <v-btn v-if="item.type === 'pageBreaker'" sm2 @click.native = 'removePage(key)'>删除此页</v-btn>
          </tk-flex>
          <div v-if="item.img">
            <tk-flex middle between>
              <tk-flex>
                <v-text-field class="tk-grid-6" v-model="item.title"></v-text-field>
              </tk-flex>
              <v-btn @click.native = 'removeMoudle(key)'>删除</v-btn>
            </tk-flex>
            <textarea name="textarea" cols="150" rows="5" class="textArea fill" v-model="item.content" placeholder="流程图描述信息"></textarea>
            <uploader v-model = 'item.img'></uploader>
          </div>
          <v-divider v-if="item.table" inset></v-divider>
          <tk-flex column v-if="item.table" style="padding-top: 50px;">
            <tk-flex between>
              <tk-flex>
                <v-text-field class="tk-grid-2" style="margin-right: 20px" v-model="item.title"></v-text-field>
              </tk-flex>
              <v-btn @click.native = 'removeMoudle(key)'>删除功能模块</v-btn>
            </tk-flex>
            <my-tree :model.sync = 'item.table.body'></my-tree>
          </tk-flex>
        </tk-flex>
        <tk-flex column middle v-if="params.budget">
          <v-subheader class="tk-grid-2">开发报价说明</v-subheader>
          <textarea name="textarea" v-model="params.budget.description" cols="150" rows="5" class="textArea tk-grid-6" placeholder="开发报价说明"></textarea>
        </tk-flex>
        <tk-flex wrap v-if="params.budget">
          <span class="tk-grid-2">项目开发预算及开发周期</span>
          <tk-flex class="fill" v-for="(item, key) in params.budget.items" :key="key">
            <v-subheader>开发类目</v-subheader>
            <v-text-field v-model="item.name"></v-text-field>
            <v-subheader >类目摘要</v-subheader>
            <v-text-field v-model="item.description"></v-text-field>
            <v-subheader >开发周期</v-subheader>
            <v-text-field v-model="item.days"></v-text-field>
            <v-subheader >费用</v-subheader>
            <v-text-field v-model="item.price"></v-text-field>
            <v-btn primary dark @click.native="add">
              <tk-icon>add</tk-icon>
            </v-btn>
            <v-btn primary dark @click.native="remove(key)">
              <tk-icon>remove</tk-icon>
            </v-btn>
          </tk-flex>
        </tk-flex>
        <tk-flex center>
          <v-btn primary dark @click.native = 'update' v-if = 'updateFlag'>更新任务书</v-btn>
          <v-btn primary dark @click.native = 'save' v-else = 'updateFlag'>保存任务书</v-btn>
          <v-btn primary dark @click.native="create">生成任务书</v-btn>
          <v-btn primary dark @click.native="deletePDF">删除任务书</v-btn>
          <v-dialog v-model="dialog" persistent>
            <v-btn primary dark slot="activator">复制任务书</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">请输入新任务书名称</span>
              </v-card-title>
              <v-card-text>
                <v-text-field label="名称" required v-model="copyName"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue--text darken-1" flat @click.native="copy">复制</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </tk-flex>
      </div>
    </div>
  </v-container>
</template>
<script>
  import uploader from '~components/uploader'
  import myTree from '~components/treeMenu'
  import messageBox from '~components/popup/'
  export default {
    data () {
      return {
        params: null,
        updateFlag: false,
        copyName: null,
        dialog: false
      }
    },
    activated () {
      this.$tkAjax.get(`/proposal/${this.$route.params.name}`).then(({ data }) => {
        this.params = data.data
        this.updateFlag = true
      }).catch(() => {
        this.params = {
          title: null,
          items: []
        }
      })
    },
    methods: {
      save () {
        this.$tkAjax.post('/proposal', {
          name: this.$route.params.name,
          data: this.params
        }).then(() => {
          messageBox({
            alert: false,
            message: '任务书保存成功'
          })
        }).catch(() => {
          messageBox({
            alert: false,
            message: '任务书保存失败'
          })
        })
      },
      update () {
        this.$tkAjax.put(`/proposal/${this.$route.params.name}`, {
          name: this.$route.params.name,
          data: this.params
        }).then(({ data }) => {
          messageBox({
            alert: false,
            message: '任务书更新成功'
          })
        }).catch(() => {
          messageBox({
            alert: false,
            message: '任务书更新失败'
          })
        })
      },
      create () {
        window.location.href = `http://api.mokekeji.com/proposal/view/${this.$route.params.name}`
      },
      copy () {
        this.$tkAjax.post('/proposal', {
          name: this.copyName,
          data: this.params
        }).then(() => {
          messageBox({
            alert: false,
            message: '任务书复制成功'
          }).then(() => {
            this.$router.push(`/createPdf/${this.copyName}`)
            this.$router.go(0)
          })
        }).catch(() => {
          messageBox({
            alert: false,
            message: '任务书复制失败'
          })
        })
      },
      deletePDF () {
        this.params = {}
        this.$tkAjax.put(`/proposal/${this.$route.params.name}`, {
          name: this.$route.params.name,
          data: this.params
        }).then(({ data }) => {
          messageBox({
            alert: false,
            message: '任务书删除成功'
          }).then(() => {
            this.$router.push(`/createPdf/${this.$route.params.name}`)
            this.$router.go(0)
          })
        }).catch(() => {
          messageBox({
            alert: false,
            message: '任务书删除失败'
          })
        })
      },
      add () {
        let budgetObj = {
          name: null,
          description: null,
          days: null,
          price: null
        }
        this.params.budget.items.push(budgetObj)
        this.$forceUpdate()
      },
      remove (key) {
        this.params.budget.items.splice(key, 1)
        this.$forceUpdate()
      },
      addCreate () {
        this.params.budget = {
          description: null,
          items: [{
            name: null,
            description: null,
            days: null,
            price: null
          }]
        }
        this.$set(this.params, this.params)
      },
      addImage () {
        let obj = {
          type: 'content',
          title: null,
          content: null,
          img: true
        }
        this.params.items.push(obj)
      },
      addAction () {
        let obj = {
          type: 'content',
          title: null,
          table: {
            header: [
              '模块',
              '功能',
              '子功能'
            ],
            body: [
              {
                name: null
              }
            ]
          }
        }
        this.params.items.push(obj)
      },
      addPage () {
        let obj = {
          type: 'pageBreaker'
        }
        this.params.items.push(obj)
      },
      removePage (index) {
        this.params.items.splice(index, 1)
      },
      addDesc () {
        let obj = {
          type: 'content',
          title: null,
          content: null
        }
        this.params.items.push(obj)
      },
      removeMoudle (key) {
        this.params.items.splice(key, 1)
      }
    },
    components: {
      uploader, myTree
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/scss/style';
  .divider{
    margin: 20px 0;
  }
  .container {
    background: $white;
    padding:0 !important;
    .smallContainer {
      overflow: hidden;
      max-width:1200px;
      margin:0 auto;
      height:100%;
      padding:0 $gutter-max;
      @media  screen and (max-width:768px){
        padding: 0 $gutter-max;
      }
      .textArea {
        border:1px solid rgba(0,0,0,0.12);
        width:100%;
        resize: none;
        margin: 10px 0;
        padding: $gutter-min;
      }
      .pageBreaker {
        width:100%;
        height: 1px;
        background-color: black;
        margin: 20px 0;
      }
    }
  }
</style>
