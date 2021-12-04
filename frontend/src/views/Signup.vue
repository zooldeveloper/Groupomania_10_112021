<template>
    <div class="container">
        <div id="banner">
          <!-- <img src="../assets/images/banner1.jpeg" alt="business district"> -->
        </div>
        <div id="signup">
            <h1>Sign up</h1> 
            <form action="" method="post">
                <div class="form_group">
                    <div class="fullname fullname__firstname">
                        <label for="firstname"><font-awesome-icon icon="user-circle" size="lg"/></label>
                        <input class="user_field" type="text" id="firstname" name="firstname" placeholder="Your First Name">
                    </div>
                    <div class="fullname">
                        <label for="lastname"><font-awesome-icon icon="user-circle" size="lg"/></label>
                        <input class="user_field" type="text" id="lastname" name="lastname" placeholder="Your Last Name">
                    </div>
                </div>
                <div class="form_group">
                    <label for="email"><font-awesome-icon icon="envelope" size="lg"/></label>
                    <input type="text" id="email" name="email" placeholder="Email: example@gmail.com">
                </div>
                <div class="form_group">
                    <div class="password password__first-field">
                        <label for="password"><font-awesome-icon icon="unlock" size="lg"/></label>
                        <input type="password" id="password" name="password" placeholder="Enter a password">
                    </div>
                    <div  class="password">
                        <label for="passwordConfirm"><font-awesome-icon icon="lock" size="lg"/></label>
                        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password">
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account ? Sign in</p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Signup',

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
    #banner {
      width: 35%;
      height: 80vh;
      background-image: url("../assets/images/banner1.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      // opacity: 0.5;
    }
    #signup {
      width: 35%;
      border: 2px solid darken($quaternary-color, $percentage2);
      height: 80vh;
      background-color: #fff;
      h1 {
        margin-top: 50px;
        position: relative;
        color: $primary_color;
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
          left: 20%;
          border-left: 55px solid #000;
        }
        &::after {
        right: 20%;
        border-right: 55px solid #000;
        }
      }
      form {
        padding: 40px 7%;
        .form_group {
          margin-bottom: 40px;
          position: relative;
           display: flex;
           justify-content: space-between;
          .fullname, .password {
            display: flex;
            justify-content: center;
            position: relative;
            &__firstname, &__first-field {
              margin-right: 7px;
            }
            .user_field {
              width: 74%;
            }
          }
          label {
            position: absolute;
            left: 15px;
            bottom: 12px;
            margin-right: 10px;
          }
          input {
            width: 90%;
            height: 40px;
            padding-left: 45px;
            border-radius: 10px;
            border: 2px solid darken($quaternary-color, $percentage3);
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
        }
      }
    }
  }

</style>
