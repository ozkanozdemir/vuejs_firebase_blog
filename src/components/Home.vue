<template>
  <div>
    <div v-for="( post, postId ) in posts">
      <img :src="post.post_picture" class="img-rounded" width="100%" :alt="post.title">
      <router-link :to="{name: 'Post', params: {id: postId} }">
        <h1>{{ post.title }}</h1>
      </router-link>
      <p v-html="post.content"></p>
    </div>
  </div>
</template>

<script>
  export default {
    data()
    {
      return {posts: []}
    },
    created() {
      let _this = this
      firebase.database().ref('/posts').on("value", function (snapshot) {
        _this.posts = snapshot.val()
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    }
  }
</script>
