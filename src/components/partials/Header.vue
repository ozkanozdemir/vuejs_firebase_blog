<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            Menu <i class="fa fa-bars"></i>
          </button>
          <router-link to="/"><a class="navbar-brand">Vue Blog</a></router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/" activeClass="active" tag="li" exact><a>Home</a></router-link>
            <router-link to="/about" activeClass="active" tag="li"><a>About</a></router-link>
            <router-link to="/contact" activeClass="active" tag="li"><a>Contact</a></router-link>
            <li class="dropdown" v-if="isLogged">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Admin <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <router-link to="/admin/posts" activeClass="active" tag="li" exact><a>My Posts</a></router-link>
                <router-link to="/admin/post/new" activeClass="active" tag="li"><a>New Post</a></router-link>
                <li role="separator" class="divider"></li>
                <li><a href="#" @click="signOut()">Logout</a></li>
              </ul>
            </li>
            <li v-else>
              <a href="#" data-toggle="modal" data-target="#loginModal">Login</a>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container -->
    </nav>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div class="site-heading">
              <h1>Clean Blog</h1>
              <hr class="small">
              <span class="subheading">A Clean Blog Theme by Start Bootstrap</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Sign In</h4>
          </div>
          <div class="modal-body">
            <form @submit.prevent="signIn">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" id="email" name="email" class="form-control"/>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" v-model="password" id="password" name="password" class="form-control"/>
              </div>
              <button class="btn btn-primary">Login</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        isLogged: false
      }
    },
    created() {
      let _this = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          _this.isLogged = true
        } else {
          _this.isLogged = false
        }
      });
    },
    methods: {
      signOut() {
        let _this = this
        firebase.auth().signOut().then(function () {
          $("#loginModal").modal("hide")
          _this.isLogged = false
          _this.$router.push('/')
        }).catch(function (error) {
          console.log('Sign out error : ' + error)
        });
      },
      signIn() {
        let _this = this

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .catch(function (error) {
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
          })
          .then(function (user) {
            $("#loginModal").modal("hide")
            _this.isLogged = true

          });
      }
    }
  }
</script>

<style>
  .intro-header {
    background-image: url('../../assets/img/home-bg.jpg');
  }
</style>
