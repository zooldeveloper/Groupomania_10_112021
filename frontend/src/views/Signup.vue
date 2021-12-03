<template>
  <div class="container">
    <div id="banner">
      <!-- <img src="../assets/images/banner1.jpeg" alt="business district"> -->
    </div>
    <div id="signup">
      <h1>Sign up</h1> 
      <form action="" method="post">
        <div class="form_group">
          <label for="firstname"><font-awesome-icon icon="user-circle"/></label>
          <input type="text" id="firstname" name="firstname" placeholder="First Name">
        </div>
        <div class="form_group">
          <label for="lasstname"><font-awesome-icon icon="user-circle"/></label>
          <input type="text" id="lastname" name="lastname" placeholder="Last Name">
        </div>
        <div class="form_group">
          <label for="email"><font-awesome-icon icon="envelope"/></label>
          <input type="text" id="email" name="email" placeholder="Email: example@gmail.com">
        </div>
        <div class="form_group">
          <label for="password"><font-awesome-icon icon="unlock"/></label>
          <input type="text" id="password" name="password" placeholder="Your password">
        </div>
        <div class="form_group">
          <label for="passwordConfirm"><font-awesome-icon icon="lock"/></label>
          <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm your password">
        </div>
        <button type="submit">Submit</button>
      </form>
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
    background-color: $secondary_color;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 5rem;
    #banner {
      width: 40%;
      height: 80vh;
      background-image: url("../assets/images/banner1.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      // opacity: 0.5;
    }
    #signup {
      width: 40%;
      border: 2px solid darken($secondary_color, 10%);
      height: 80vh;
      background-color: $white;
      h1 {

      }
      .form_group {
        margin-bottom: 40px;
        position: relative;
        label {
          position: absolute;
          left: 24%;
          bottom: 12px;
          margin-right: 10px;
          
          font-awesome-icon {
            font-size: 50px;
            
          } 
        }
        input {
          width: 50%;
          height: 40px;
          padding-left: 45px;
         
        }
      }
    }
  }

</style>
