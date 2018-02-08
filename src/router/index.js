import Vue from 'vue'
import Router from 'vue-router'
import Index from 'page/index'
import Questionnaire from 'page/questionnaire'
import download from 'page/download'
import Reply from 'page/reply'
import createPdf from 'page/createPdf'
import error from 'page/error'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/question',
      name: 'questionnaire',
      component: Questionnaire
    },
    {
      path: '/download/fangzhihui',
      name: 'download',
      component: download
    },
    {
      path: '/reply',
      name: 'reply',
      component: Reply
    },
    {
      path: '/createPdf/:name',
      name: 'pdf',
      component: createPdf
    },
    {
      name: 'custom',
      path: '/:error',
      component: error
    }
  ]
})
