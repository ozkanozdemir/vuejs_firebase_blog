import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import About from '@/components/About'
import Contact from '@/components/Contact'

import Post from '@/components/Post/Post.vue'
import Posts from '@/components/Post/Posts.vue'
import NewPost from '@/components/Post/New.vue'
import EditPost from '@/components/Post/Edit.vue'
import DeletePost from '@/components/Post/Delete.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/post/:id', name: 'post', component: Post },

    { path: '/admin/posts', name: 'posts', component: Posts, meta: { requiresAuth: true} },
    { path: '/admin/post/new', name: 'newPost', component: NewPost, meta: { requiresAuth: true} },
    { path: '/admin/post/edit/:id', name: 'editPost', component: EditPost, meta: { requiresAuth: true} },
    { path: '/admin/post/delete/:id', name: 'deletePost', component: DeletePost, meta: { requiresAuth: true} },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth === true)) {
    const user = firebase.auth().currentUser

    if (!user)
      next({path: '/'})
    else
      next()
  } else {
    next()
  }
})

export default router
