// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import VueSweetAlert from 'vue-sweetalert'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.use(VueSweetAlert)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
