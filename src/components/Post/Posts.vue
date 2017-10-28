<template>
  <div>
    <h1>All Admin Posts</h1>
    <router-link :to="{ name: 'newPost' }">
      <button class="btn btn-primary">New Post</button>
    </router-link>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Title</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for=" (post, postId ) in posts">
        <td>
          <router-link :to="{name: 'post', params: {id: postId} }">{{ post.title }}</router-link>
        </td>
        <td>
          <router-link :to="{name: 'editPos', params: {id: postId} }">
            <i class="fa fa-edit"></i>
          </router-link>
          <a href="#">
            <i class="fa fa-trash-o" @click="deletePost(postId)"></i>
          </a>
        </td>
      </tr>
      </tbody>
    </table>
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
      })
    },
    methods: {
      deletePost(id) {
        let _this = this
        firebase.database().ref('/posts/' + id).remove().then(function (snapshot) {
          _this.$swal('Deleted the post')
        })
      }
    }
  }
</script>

<style>
  i {
    cursor: pointer;
  }
</style>
