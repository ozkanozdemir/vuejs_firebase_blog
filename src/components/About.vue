<template>
  <div>
    <h1>{{about.title}}</h1>
    <p>{{about.content}}</p>
  </div>
</template>

<script>
  export default {
    data()
    {
      return { about : {}}
    },
    created() {
      let _this = this
      firebase.database().ref('/about/').once('value').then(function(snapshot) {
        _this.about = snapshot.val()
      });

    }
  }
</script>
