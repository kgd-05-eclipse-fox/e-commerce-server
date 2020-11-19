<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <div class="login-panel bg-white text-left">
          <br><br><br><br>
          <h1 class="display-3 font-weight-bold">Register</h1>
          <p class="font-weight-bold">Please register your self</p>
          <form action="">
            <div class="form-group">
              <label for="email" class="input-label">Email</label>
              <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <label for="password" class="input-label">Password</label>
              <input type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <button class="btn btn-primary" @click="login">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'LandingPage',
  data () {
    return {
      card: 'login',
      loginPayload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const { email, password } = this.loginPayload
      this.$store
        .dispatch('login', { email, password })
        .then((result) => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('user', result.data.email)
          this.$store.commit('isLogin', true)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          this.$router.push('/')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message + '!'
          })
        })
    }
  },
  props: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  margin-top: 10px;
  background-color: #2c3e50;
  color: #42b983;
}

.btn:hover {
  background-color: #42b983;
  color: #2c3e50;
}

.display-1 {
  margin-top: 40px;
}

.landing-body {
  display: flex;
  justify-content: center;
}

.landing-card {
  background-color: #311d1d3d;
  box-shadow: 1px 1px 15px 5px rgba(0, 0, 0, 0.65);
  margin: 10px;
  padding: 10px 5em;
  width: 30%;
}

.row {
  margin-top: 2em;
}
</style>
