<template>
  <div>
    <h1>Edit the Post</h1>
    <form @submit.prevent="editPost">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title" class="form-control">
      </div>
      <div class="form-group">
        <label for="picture">Post Picture (url)</label>
        <input type="text" id="picture" v-model="post.post_picture" class="form-control">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <quill-editor id="content" v-model="post.content"></quill-editor>
      </div>
      <button class="btn btn-primary">Edit Post</button>
    </form>
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
    },
    methods: {
      editPost() {
        let _this = this
        firebase.database().ref('/posts/' + this.postId).update({
          title: this.post.title,
          content: this.post.content,
          post_picture: this.post.post_picture
        }).then( () => {
          _this.$swal('Edited the post!')
          this.$router.push('/admin/posts')
        })
      }
    }
  }
</script>
