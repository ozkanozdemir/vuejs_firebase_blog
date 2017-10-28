<template>
  <div>
    Post
  </div>
</template>
<template>
  <div>
    <img :src="post.post_picture" class="img-responsive" :alt="post.title">
    <h1>{{ post.title }}</h1>
    <p v-html="post.content"></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: '',
        postId: this.$route.params.id
      }
    },
    created() {
      let _this = this
      firebase.database().ref('/posts/' + _this.postId).once('value').then(function (snapshot) {
        _this.post = snapshot.val();
      })
    }
  }
</script>
