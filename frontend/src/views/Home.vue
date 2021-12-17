<template>
    <div class="container">
        <Header/>
        <main>
            <section id="makepost">
                <form>
                    <div> 
                        <img src="../assets/images/banner1.jpeg" alt="user image">
                        <textarea name="" id="" placeholder="What would you like to share?"></textarea>
                    </div>
                    <div class="makepost__fileinput">
                          <label for="myImage">Uplaod a file
                                <font-awesome-icon icon='image' color='#76c8d3' size="lg"/>
                                <input type="file" id="myImage">
                          </label>
                          <button type="submit">Post it  <font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                    </div>
                </form>
            </section>
            <section id="userpost">
                <div class="userpost__wrapper">
                    <div class="userpost__userinfo">
                        <img class="userpost__userimage" src="../assets/images/banner1.jpeg" alt="user image">
                    <div class="userpost__username-postdate">
                        <h2>Ayoub Ali</h2>
                        <small>Posted on March 24, 2021 </small>
                    </div>
                    </div>
                    <div class="userpost__post">
                        <p>This is the first post of our new social platform !</p>
                        <img class="userpost__imagepost" src="../assets/images/banner1.jpeg" alt="user image">
                    </div>
                </div>
            </section>
        </main>
  </div>
    
</template>

<script>
import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  },
  // mounted() {
  //   const token = document.cookie;
  //   if (!token) {
  //     this.$router.push({ name: 'Entry' })
  //   }
  // }
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

// Commun styles
  section {
    margin: 30px 0;
    box-shadow: 0px 5px 15px $border-color;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  // Main section
  main {
    max-width: 600px;
    margin: 0 auto;
    #makepost {
      margin-bottom: 50px;        
      form {
        @include flexbox(space-between);
        flex-direction: column;
        padding: 20px 0;
        border-radius: 7px;
        font-size: 1.2rem;
        div {
          width: 90%;
          @include flexbox(space-between);
        }
        .makepost__fileinput {
           margin-top: 30px; 
           padding-top: 20px;
           border-top: 1px solid $border-color;
           @include flexbox(space-around);
        }
        textarea {
          resize: vertical;
          width: 85%;
          min-height: 60px;
          margin-left: 15px;
          border-color: $border-color;
          padding: 7px;
          outline: none;
        }
        label {
          cursor: pointer;
        }
        input {
          display: none;
          visibility: hidden;
        }
        button {
          border: none;
          cursor: pointer;
          background-color: transparent;
          font-size: 1.2rem;
          font-weight: 200;
          font-family: sans-serif;
        }
      }
    }

   // Userpost section
    #userpost {
      .userpost {
        &__wrapper {
          padding: 20px;
        } 
        &__userinfo {
            @include flexbox(flex-start);
        }
        &__userimage {
          float: left;  
        }
        &__username-postdate {
          margin-left: 15px;
          h2 {
            width: 110px;
             margin: 0;
          }
        }
        &__post {
          margin-top: 30px;
          p {
            text-align: left;
            font-size: 1.2rem;
          }
        }
        &__imagepost {
          width: 100%;
          height: auto;
          border-radius: 0%;
        }
      } 
    }
  }
  
</style>