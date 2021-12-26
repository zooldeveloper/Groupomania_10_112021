<template>
    <div class="container">
        <div id="banner">
          <img src="../assets/images/icon-left-font-monochrome-white.svg" alt="Groupomania icon">
          <h1>Because we care about your needs</h1>
        </div>
        <div id="signup">
            <h2 v-if="mode === 'sign up'">Sign Up</h2>
            <h2 v-else>Log In</h2> 
            <div class="thisClassNameIsNotUsed"></div>
            <form action="" method="post">
                <div class="form-group" v-if="mode === 'sign up'">
                    <div class="fullname fullname__firstname">
                        <label for="firstname"><font-awesome-icon icon="user-circle" size="lx"/></label>
                        <input class="fullname__field" 
                                :class="{success : checkFirstname === false , error: checkFirstname === true}" 
                                type="text" id="firstname" name="firstname" v-model="firstname" placeholder="Your First Name">
                        <small v-if="checkFirstname">{{ errors.firstname.errMsg }}</small>
                    </div>
                    <div class="fullname">
                        <label for="lastname"><font-awesome-icon icon="user-circle" size="lx"/></label>
                        <input class="fullname__field" 
                               :class="{success : checkLastname === false, error: checkLastname === true}" 
                               type="text" id="lastname" name="lastname" v-model="lastname" placeholder="Your Last Name">
                        <small v-if="checkLastname">{{ errors.lastname.errMsg }}</small>
                    </div>
                </div>
                <div class="form-group" :class="[mode === 'log in' ? 'emailContainer' : '']">
                    <label for="email"><font-awesome-icon icon="envelope" size="lx"/></label>
                    <input :class="{success : checkEmail === false, error: checkEmail === true}" 
                           type="text" id="email" name="email" v-model="email" placeholder="Email: example@gmail.com">
                    <small v-if="errors.email.errMsg !== null">{{ errors.email.errMsg }}</small>
                    <small v-else-if="errors.email.reseErrMsg !== null">{{ errors.email.resErrMsg }}</small>
                </div>
                <div class="form-group">
                    <div class="password password__first-field" v-if="mode === 'sign up'">
                        <label for="password"><font-awesome-icon icon="unlock" size="lx"/></label>
                        <input class="password__field" 
                               :class="{success : checkPassword === false, error: checkPassword === true}" 
                               type="password" id="password" name="password" v-model="password" placeholder="Enter a password">
                        <small class="password__bottom" v-if="checkPassword">{{ errors.password.errMsg }}</small>
                    </div>
                    <div  class="password" :class="[checkPassword === true ? 'password__second-field' : '']">
                        <label for="passwordConfirm"><font-awesome-icon icon="lock" size="lx"/></label>
                        <input class="password__field" 
                               :class="{success : checkPasswordConfirm === false, error: checkPasswordConfirm === true}" 
                               type="password" id="passwordConfirm" name="passwordConfirm" v-model="passwordConfirm" :placeholder="placeholderValue()">
                        <small v-if="checkPasswordConfirm">{{ errors.passwordConfirm.errMsg }}</small>
                    </div>
                </div>
                <div class="form-input terms" v-if="mode === 'sign up'">
                  <input @click="isBoxChecked" v-model="terms"
                         type="checkbox" name="terms-of-use" id="terms" value="read and agreed">
                  <label for="terms">I have read and agree to the terms of use</label>
                  <small v-if="!checkTerms" style="color: #ff8000; display:block">{{ errors.terms.errMsg }}</small>
                </div>
                <button type="submit" v-if="mode === 'sign up'" @click.prevent="signUp">Create account</button>
                <button type="submit" v-else @click.prevent="logIn">Log in</button>
            </form>
            <p v-if="mode === 'sign up'">Already have an account ? <span @click='switchToLogIn()'>Log In</span></p>
            <p v-else>No account yet ? <span @click='switchToSignUp()'>Sign Up</span></p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Entry',
  data() {
    return {
      mode: 'sign up',
      placeholder: '',
  
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      passwordConfirm: null,
      terms: false,

      errors: {
        firstname: {
            isNotValid: '',
            errMsg: null
        },
        lastname: {
            isNotValid: '',
            errMsg: null
        },
        email: {
            isNotValid: '',
            errMsg: null,
            resErrMsg: null
        },
        password: {
            isNotValid: '',
            errMsg: null
        },
        passwordConfirm: {
            isNotValid: '',
            errMsg: null
        },
        terms: {
          isChecked: '',
          errMsg: null
        }
      },
    }
  },
  computed: {
    checkFirstname() {
      return this.errors.firstname.isNotValid
    },
    checkLastname() {
      return this.errors.lastname.isNotValid
    },
    checkEmail() {
      return this.errors.email.isNotValid
    },
    checkPassword() {
      return this.errors.password.isNotValid
    },
    checkPasswordConfirm() {
      return this.errors.passwordConfirm.isNotValid
    },
    checkTerms() {
      return this.errors.terms.isChecked
    },
    ...mapState(['successResMsg','emailResMsg', 'passwordResMsg']),
  },
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
      }, 
      signUp () {
        if (this.firstname === null || !this.isUserValid(this.firstname)) {
          this.errors.firstname.errMsg = 'Atleast 3 characters!'
          this.errors.firstname.isNotValid = true
        } else if(this.firstname !== null && this.isUserValid(this.firstname)) { 
          this.errors.firstname.errMsg = null
          this.errors.firstname.isNotValid = false
          }
        if (this.lastname === null || !this.isUserValid(this.lastname)) {
          this.errors.lastname.errMsg = 'Atleast 3 characters!'
          this.errors.lastname.isNotValid = true
        } else { 
          this.errors.lastname.errMsg = null 
          this.errors.lastname.isNotValid = false
        }
        if(this.email === null || !this.isEmailValid(this.email)) {
          this.errors.email.errMsg = 'Valid email required!'
          this.errors.email.isNotValid = true
        } else {
          this.errors.email.errMsg = null 
          this.errors.email.isNotValid = false
        }
        if(this.password === null || !this.isPasswordValid(this.password)) {
          this.errors.password.errMsg = 'Minimum 8 characters: atleast 1 digit, 1 uppercase & lowercase letter!'
          this.errors.password.isNotValid = true
        } else { 
          this.errors.password.errMsg = null 
          this.errors.password.isNotValid = false
        }
        if(this.passwordConfirm === null) {
          this.errors.passwordConfirm.errMsg = 'Please re-enter your password here!'
          this.errors.passwordConfirm.isNotValid = true
        } else if(this.passwordConfirm !== null && this.passwordConfirm !== this.password) {
          this.errors.passwordConfirm.errMsg = 'Passwords do not match!'
          this.errors.passwordConfirm.isNotValid = true
        } else { 
          this.errors.passwordConfirm.errMsg = null 
          this.errors.passwordConfirm.isNotValid = false
        }
        if(this.terms === false) {
          this.errors.terms.errMsg = 'You should accept the terms of use!'
          this.errors.terms.isChecked = false
        } else {
          this.errors.terms.errMsg = null
          this.errors.terms.isChecked = true
        }
        if(this.errors.firstname.errMsg === null && 
          this.errors.lastname.errMsg === null && 
          this.errors.email.errMsg === null && 
          this.errors.password.errMsg === null && 
          this.errors.passwordConfirm.errMsg === null &&
          this.errors.terms.errMsg === null) {
            this.$store.dispatch('creatAccount', {
              firstName: this.firstname, 
              lastName: this.lastname,
              email: this.email,
              password: this.password
            })
          document.querySelector('.thisClassNameIsNotUsed').classList.add('spinner')
          setTimeout(() => { 
            if(this.emailResMsg !== null ) {
              this.email = null
              this.errors.email.resErrMsg = this.emailResMsg
              this.errors.email.isNotValid = true
            } else {
              this.errors.email.resErrMsg = null
              this.errors.email.isNotValid = false
              setTimeout(()=> alert(`Congrats 👏 ${this.successResMsg}`), 100)
              setTimeout(()=> this.switchToLogIn(), 3000)
            }
           document.querySelector('.thisClassNameIsNotUsed').classList.remove('spinner')
          }, 2000)
        }
      },
      logIn(){
        if(this.email === null || !this.isEmailValid(this.email)) {
          this.errors.email.errMsg = 'Valid email required!'
          this.errors.email.isNotValid = true
        } else {
          this.errors.email.errMsg = null 
          this.errors.email.isNotValid = false
        }
        if(this.passwordConfirm === null || !this.isPasswordValid(this.passwordConfirm)) {
          this.errors.passwordConfirm.errMsg = 'Password should be atleast 8 characters!'
          this.errors.passwordConfirm.isNotValid = true
        } else { 
          this.errors.passwordConfirm.errMsg = null 
          this.errors.passwordConfirm.isNotValid = false
        }
        if(this.errors.email.errMsg === null && 
          this.errors.passwordConfirm.errMsg === null) {
            this.$store.dispatch('logIn', {
              email: this.email,
              password: this.passwordConfirm
            })
          document.querySelector('.thisClassNameIsNotUsed').classList.add('spinner') 
          setTimeout(() => { 
            if(this.emailResMsg !== null ) {
              this.errors.email.errMsg  = this.emailResMsg
              this.errors.email.isNotValid = true
              this.passwordConfirm = null
              this.errors.passwordConfirm.isNotValid = true
            } else {   
              this.errors.email.errMsg = null
              this.errors.email.isNotValid = false
            }
            if(this.passwordResMsg !== null) {
              this.errors.passwordConfirm.errMsg = this.passwordResMsg
              this.errors.passwordConfirm.isNotValid = true
            } else {
              this.errors.passwordConfirm.errMsg = null
            }
            if(this.emailResMsg === null && this.passwordResMsg === null) {
              this.$router.push({ name: 'Home' })
              location.reload()
            }
            document.querySelector('.thisClassNameIsNotUsed').classList.remove('spinner')
          }, 2000)
        }
      },
      isUserValid(firstname) {
          return /[A-Za-zÀ-ÿ]{3,}/.test(firstname);
      },
      isEmailValid(email) {
          return /[a-zA-Z0-9-.]+@[a-z]+\.[a-z]{2,3}/.test(email);
      },
      isPasswordValid(password) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
      },
      isBoxChecked() {
        this.errors.terms.errMsg = null
        this.terms = !this.terms
      }
    },
  mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.$router.push({ name: 'Home' })
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
      position: relative;
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
            outline: none;
            border: 2px solid darken($quaternary-color, $percentage3);
          }
          small {
            position: absolute;
            left: 0;
            top: 50px;
            font-size: 0.7rem;
            color: $error_color;
            text-align: start;
          }
          .success {
            border: 2px solid $success_color;
          }
          .error {
            border: 2px solid $error_color;
          }
        }
        .terms {
            margin-top: 45px;
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
      .spinner { 
        width: 100%;
        height: 38vh;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $quaternary-color;
        opacity: 0.9;
         z-index: 1;
        &::after {
          content: '';
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 5px solid transparent;
          border-top-color: $primary_color;
          border-bottom-color: $primary_color;
          z-index: 2;
          animation: spinner 3s linear forwards;
        }

        @keyframes spinner {
          0% { transform: rotate(0turn); }
          100% { transform: rotate(3turn); }
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
          .password__second-field {
            margin-top: 14px !important;
          }
          input {
            width: inherit !important;
          }
        }
        .emailContainer {
            margin: 50px 0 25px 0 !important;
        }
        .spinner {
          height: 76vh;
        }
      }
    }
  }

</style>
