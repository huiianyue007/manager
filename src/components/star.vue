<template>
  <tk-flex class="star" middle>
     <div class="empty_icon" ref = 'empty'>
       <tk-icon :type="emptyIcon.type" v-for = 'i in maxSize' :key = 'i' @click.native = 'select($event)' class = 'star_icon' :style = 'emptyIcon.style'>{{emptyIcon.icon}}</tk-icon>
     </div>
     <div class="full_icon active_icon" :style = 'style'>
       <tk-icon :type="fullIcon.type" v-for = 'i in Math.ceil(value)' :key = 'i' @click.native = 'select($event)' class = 'star_icon' :style = 'fullIcon.style'>{{fullIcon.icon}}</tk-icon>
     </div>
  </tk-flex>
</template>
<script>
  export default {
    data () {
      return {
        style: null
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      disable: {
        type: Boolean,
        default: false
      },
      iconSize: {
        type: Number,
        default: 24
      },
      maxSize: {
        type: Number,
        default: 5
      },
      emptyIcon: {
        type: Object,
        default: () => {
          return {
            type: 'default',
            icon: 'star_border'
          }
        }
      },
      fullIcon: {
        type: Object,
        default: () => {
          return {
            type: 'default',
            icon: 'star_border'
          }
        }
      }
    },
    methods: {
      select (opt) {
        if (this.disable) {
          var selected = this.getIconIndex(opt.currentTarget)
          this.$emit('change', selected)
        }
      },
      getIconIndex (opt) {
        let ratingIcons = this.$el.querySelectorAll('.empty_icon > .tk-icon, .full_icon > .tk-icon')
        let selected = -1
        ratingIcons = Array.prototype.slice.call(ratingIcons)
        // find index from iconSelected
        ratingIcons.some((icon, i) => {
          if (icon === opt) {
            selected = (i + 1) % this.maxSize
            selected = !selected ? this.maxSize : selected
            return true
          }
        })
        return selected
      }
    },
    mounted () {
      this.$nextTick(() => {
        let width = this.$refs.empty.offsetWidth
        this.$el.style.width = width + 'px'
        this.style = {
          width: 100 / this.maxSize * this.value + '%',
          marginLeft: `-${width}px`
        }
      })
    },
    watch: {
      value (val) {
        this.$nextTick(() => {
          this.style = {
            width: 100 / this.maxSize * val + '%',
            marginLeft: `-${this.$refs.empty.offsetWidth}px`
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/scss/style';
  .full_icon{
    color: $primary-color;
    display: inherit;
    overflow:hidden;
    margin-top:1px;
    .tk-icon{
      flex: 1 0 auto;
      color: inherit;
    }
  }
  .star_icon{
    margin: 0 3px;
    @media screen and (max-width: 768px){
      margin: 0
    }
  }
  .empty_icon{
    color: $primary-color-dark;
  }
</style>
