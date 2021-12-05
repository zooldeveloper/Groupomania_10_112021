<template>
    <div class="container">
        <div id="banner">
          <img src="../assets/images/icon-left-font-monochrome-black.svg" alt="Groupomania icon">
          <h1>Because we care about your needs</h1>
        </div>
        <div id="signup">
            <h2 v-if="mode === 'sign up'">Sign Up</h2>
            <h2 v-else>Log In</h2> 
            <form action="" method="post">
                <div class="form-group" v-if="mode === 'sign up'">
                    <div class="fullname fullname__firstname">
                        <label for="firstname"><font-awesome-icon icon="user-circle" size="lx"/></label>
                        <input class="fullname__field" type="text" id="firstname" name="firstname" placeholder="Your First Name">
                    </div>
                    <div class="fullname">
                        <label for="lastname"><font-awesome-icon icon="user-circle" size="lx"/></label>
                        <input class="fullname__field" type="text" id="lastname" name="lastname" placeholder="Your Last Name">
                    </div>
                </div>
                <div class="form-group" :class="[mode === 'log in' ? 'emailContainer' : '']">
                    <label for="email"><font-awesome-icon icon="envelope" size="lx"/></label>
                    <input type="text" id="email" name="email" placeholder="Email: example@gmail.com">
                </div>
                <div class="form-group">
                    <div class="password password__first-field" v-if="mode === 'sign up'">
                        <label for="password"><font-awesome-icon icon="unlock" size="lx"/></label>
                        <input class="password__field" type="password" id="password" name="password" placeholder="Enter a password">
                    </div>
                    <div  class="password">
                        <label for="passwordConfirm"><font-awesome-icon icon="lock" size="lx"/></label>
                        <input class="password__field" type="password" id="passwordConfirm" name="passwordConfirm" :placeholder="placeholderValue()">
                    </div>
                </div>
                <div class="form-input terms" v-if="mode === 'sign up'">
                  <input type="checkbox" name="terms-of-use" id="terms" value="read and agreed">
                  <label for="terms">I have read and agree to the terms of use</label>
                </div>
                <button type="submit" v-if="mode === 'sign up'">Create account</button>
                <button type="submit" v-else>Log in</button>
            </form>
            <p v-if="mode === 'sign up'">Already have an account ? <span @click='switchToLogIn()'>Log In</span></p>
            <p v-else>No account yet ? <span @click='switchToSignUp()'>Sign Up</span></p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Signup',
  data() {
    return {
      mode: 'sign up',
      placeholder: ''
    }
  },
  computed: {},
  methods: {
      switchToLogIn() {
        this.mode = 'log in'
      },
      switchToSignUp() {
        this.mode = 'sign up'
      },
      placeholderValue() {
        if(this.mode === 'sign up') {
           return this.placeholder = 'Confirm your password';
        } else {
           return this.placeholder = 'Enter your password'
        }
      }
    }

}
</script>

<style lang="scss" scoped>

    @import '@/assets/sass/variables.scss';

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom right, lighten($primary_color, $percentage1), lighten($secondary_color, $percentage1));
     // Presentation banner part //
    #banner {
      width: 35%;
      height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0 10px;
      &::before {
        content: '';
        background-image: url("../assets/images/banner1.jpeg");
        background-size: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.7;
      }
      img {
        width: 90%;
        position: relative;
        margin-bottom: 30px;
      }
      h1 {
        position: relative;
        color: #fff;
      }
    }
    // User registration form //
    #signup {
      width: 35%;
      border: 2px solid darken($quaternary-color, $percentage2);
      height: 80vh;
      background-color: #fff;
      h2 {
        margin-top: 70px;
        position: relative;
        color: $primary_color;
        font-size: 2rem;
        &::before, &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        width: 0;
        height: 0;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        }
        &::before{
          left: 18%;
          border-left: 55px solid #000;
        }
        &::after {
        right: 18%;
        border-right: 55px solid #000;
        }
      }
      form {
        padding: 30px 7% 20px;
        .form-group {
          margin-bottom: 25px;
          position: relative;
           display: flex;
           justify-content: space-between;
          .fullname, .password {
            display: flex;
            justify-content: center;
            position: relative;
            width: 100%;
            &__firstname, &__first-field {
              margin-right: 15px;
            }
            &__field, &__field{
              width: 95%;
            }
          }
          label {
            position: absolute;
            left: 12px;
            bottom: 12px;
            margin-right: 10px;
          }
          input {
            width: 100%;
            height: 40px;
            padding-left: 30px;
            border-radius: 10px;
            border: 2px solid darken($quaternary-color, $percentage3);
          }
        }
        .terms {
            margin-bottom: 25px;
            text-align: left;
            input[type="checkbox"] {
              margin-right: 10px; 
              cursor: pointer;
              // border: 2px solid $primary_color;
            }
        }
        button {
          width: 100%;
          height: 40px;
          border-radius: 10px;
          background-color: $secondary_color;
          border: none;
          color: #fff;
          font-size: 1.2rem;
          cursor: pointer;
        }
      }
      p {
        span {
          color: $primary_color;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    @media screen and (max-width: 1024px) {
        #banner {
          display: none;
        }
        #signup {
          width: 70vh;
        }
    }
    @media screen and (max-width: 425px) {
      #signup {
        height: 95vh;        
        h2 {
          margin: 25px 0 0 !important;
          &::before {
            left: 10% !important;
          }
          &::after {
            right: 10% !important;
          }
        }
        .form-group  {
          flex-direction: column ;
          margin-bottom: 0px !important;
          .fullname, .password {
            margin-bottom: 25px !important;
          }
          .password__first-field{
              margin-top: 25px !important;
          }
          input {
            width: inherit !important;
          }
        }
        .emailContainer {
            margin: 50px 0 25px 0 !important;
        }
      }
    }
  }

</style>
