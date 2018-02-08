<template>
  <div class="container">
    <div class="image">
      <img :src="src" alt="">
    </div>
    <vue-core-image-upload
      inputOfFile="file"
      class="btn btn-primary"
      :crop="false"
      @imageuploaded="imageuploaded"
      :max-file-size="5242880"
      url="http://api.mokekeji.com/upload/file">
    </vue-core-image-upload>
  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload'
  export default {
    props: ['value'],
    data () {
      return {
        src: this.value
      }
    },
    methods: {
      imageuploaded (res) {
        this.src = res.url
        this.$emit('input', res.url)
      }
    },
    components: {
      VueCoreImageUpload
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    border: 1px solid rgba(0,0,0,0.12);
    .image{
      width:100%;
      height:100%;
    }
  }
  .box{
    width: 100px;
    height: 100px;
    border:1px solid black;
  }
</style>
