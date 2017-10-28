<template>
  <div>
    <h1>New Post</h1>
    <form @submit.prevent="savePost">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="post.title" class="form-control">
      </div>
      <div class="form-group">
        <label for="picture">Post Picture (url)</label>
        <input type="file" multiple id="picture"
               @change="filesChange($event.target.files[0].name, $event.target.files[0])"
               class="input-file"
               accept="image/*">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <quill-editor id="content" v-model="post.content"></quill-editor>
      </div>
      <button class="btn btn-primary">Save Post</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          content: '',
          picture: '',
          picture_name: '',
        }
      }
    },
    methods: {
      savePost() {
        firebase.storage().ref('images/' + this.post.picture_name).put(this.post.picture)
          .then(snapshot => {
            firebase.database().ref().child('posts').push({
              title: this.post.title,
              content: this.post.content,
              post_picture: snapshot.metadata.downloadURLs[0]
            }).key
          })
        this.$swal('Saved new post!')
        this.$router.push('/admin/posts')
      },
      filesChange(name, file) {
        this.post.picture_name = name
        this.post.picture = file
      }
    }
  }
</script>
