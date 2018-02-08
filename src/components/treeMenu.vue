<template>
  <v-layout column class = 'layout'>
    <v-layout column v-for="(item, key) in modelData" :key = 'key'>
       <tk-flex between>
          <tk-flex right>
            <v-text-field name="input-1" label= '模块名称' v-model = 'item.name' v-if = 'typeof item === "object"'></v-text-field>
            <v-text-field name="input-1" label= '模块名称' v-model = 'modelData[key]' v-if = 'typeof item !== "object"'></v-text-field>
          </tk-flex>
        <tk-flex>
          <v-btn @click.native = 'addMoudle(item)'>添加同级元素</v-btn>
          <v-btn @click.native = 'addChildMoudle(item, key)'>添加子级元素</v-btn>
          <v-btn @click.native = 'removeMoudle(key)'>删除模块</v-btn>
        </tk-flex>
       </tk-flex>
      <tree-menu :model.sync = 'item.children' v-if = 'item.children'></tree-menu>
    </v-layout>
  </v-layout>
</template>
<script>
  import Vue from 'vue'
  export default {
    data () {
      return {
        modelData: this.model
      }
    },
    name: 'treeMenu',
    props: ['model'],
    methods: {
      addChildMoudle (opt, key) {
        if (!opt.children) opt.children = []
        let item = {
          name: ''
        }
        opt.children.push(item)
        Vue.set(opt, opt)
        this.$forceUpdate()
      },
      addMoudle () {
        let item = {
          name: ''
        }
        this.modelData.push(item)
        this.$forceUpdate()
      },
      removeMoudle (key) {
        this.modelData.splice(key, 1)
        this.$forceUpdate()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/scss/style';
  .layout{
    padding-left:$gutter-max;
  }
</style>
