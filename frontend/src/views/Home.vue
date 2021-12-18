<template>
    <div class="home">
        <Header/>
        <main>
            <!-- Make post section -->
            <section id="makepost">
                <form>
                    <div class="makepost__div"> 
                        <img src="../assets/images/banner1.jpeg" alt="user image">
                        <textarea class="makepost__posttextarea" name="" id="" placeholder="What would you like to share?"></textarea>
                    </div>
                    <div class="makepost__div makepost__fileinput">
                          <label for="myImage">Uplaod a file
                                <font-awesome-icon icon='image' color='#76c8d3' size="lg"/>
                                <input type="file" id="myImage">
                          </label>
                          <button type="submit">Post it  <font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                    </div>
                </form>
            </section>
            <!-- User post section -->
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
                    <!-- Likes and comments section -->
                    <div class="userpost__interation">
                        <div class="userpost__likes">
                            <span><font-awesome-icon icon='thumbs-up' color='#76c8d3' size="lg"/> 5</span>
                            <span><font-awesome-icon icon='thumbs-down' color='#F08E8A' size="lg"/> 10</span>
                        </div>
                        <div class="comments">
                            <span><font-awesome-icon icon='comment-dots' color='#71838F' size="lg"/> 2</span>
                        </div>
                    </div>
                    <div class="userpost__comments">
                      <div class="userpost__userinfo">
                          <img class="userpost__userimage" src="../assets/images/banner2.jpeg" alt="user image">
                      <div class="userpost__username-postdate">
                          <h3>Teddy Jam</h3>
                          <small>Posted on March 04, 2021 </small>
                      </div>
                      </div>
                      <div class="userpost__comment">
                        <p>This is my first comment !</p>
                        <span><font-awesome-icon icon='ellipsis-h' color='#71838F' size="lg"/></span>                    
                    </div>
                    <div class="userpost__userinfo">
                          <img class="userpost__userimage" src="../assets/images/banner1.jpeg" alt="user image">
                      <div class="userpost__username-postdate">
                          <h3>Ayoub Ali</h3>
                          <small>Posted on April 11, 2021 </small>
                      </div>
                      </div>
                          <div class="userpost__comment">
                            <p>Lorem ipsum dolor sit amet. Id enim rerum et consectetur eaque non iusto officia qui quia ut praesentium harum qui nulla minima !</p>
                            <span><font-awesome-icon icon='ellipsis-h' color='#71838F' size="lg"/></span>                    
                          </div>
                          <form class="userpost__commentsform">
                              <img class="userpost__userimage" src="../assets/images/banner2.jpeg" alt="user image">
                              <textarea class="userpost__commenttextarea" name="" id="" placeholder="Your comment!"></textarea>
                              <button class="userpost__btn" type="submit"><font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                          </form>
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
  .home {
    margin-top: 130px;
    section {
      margin: 30px 0;
      box-shadow: 0px 5px 15px $border-color;
    }
    form {
      @include flexbox(space-between);
      flex-direction: column;
      padding: 20px 0;
      border-radius: 7px;
      font-size: 1.2rem;
      position: relative;
    }
    h2, h3 {
      margin: 0;
      width: 110px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    textarea {
      border-color: $border-color;
      outline: none;
      font-family: Arial, Helvetica, sans-serif;
    }
    button {
      border: none;
      cursor: pointer;
      background-color: transparent;
      font-size: 1.2rem;
      font-weight: 200;
      font-family: sans-serif;
    }
    input {
      display: none;
      visibility: hidden;
    }
    label {
      cursor: pointer;
    }


    // Main section
    main {
      max-width: 600px;
      margin: 0 auto;
      #makepost {
        margin-bottom: 50px;
        .makepost {         
          &__div {
            width: 90%;
            @include flexbox(space-between);
          }
          &__posttextarea {
            resize: vertical;
            width: 85%;
            min-height: 60px;
            margin-left: 15px;
            padding: 7px;
            border-radius: 15px;
          }
          &__fileinput {
            margin-top: 30px; 
            padding-top: 20px;
            border-top: 1px solid $border-color;
            @include flexbox(space-around);
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

          // Likes & comments section
          &__interation {
            margin: 25px 0;
            padding: 0 30px 7px;
            border-bottom: 1px solid $border-color;
            @include flexbox(space-between);
          }
          &__likes {
            span {
              margin-right: 13px;
            }
          }
          &__comments {
            .userpost__userimage {
              width: 40px;
              height: 40px;
            }
            p {
              text-align: left;
              margin-top: 0 !important;
            }
          }
          &__comment {
            margin: 7px;
            @include flexbox(space-between, start);
          }
          &__commentsform {
            flex-direction: row;
            justify-content: space-evenly;
          }
          &__commenttextarea {
            width: 80%;
            padding: 10px 45px 0 10px;
            border-radius: 25px;
            resize: none;
          }
          &__btn {
            position: absolute;
            right: 18px;
          }
        }      
      }
    }
  }
</style>