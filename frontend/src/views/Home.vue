<template>
    <div class="home">
        <Header/>
        <main>
            <!-- Make post section -->
            <section id="makepost">
                <form>
                    <div class="makepost__div"> 
                        <img :src="userImage" alt="user image">
                        <textarea class="makepost__posttextarea" v-model="myText" placeholder="What would you like to share?"></textarea>
                    </div>
                    <div v-if="myFile !== null" class="makepost__imagepreview">
                        <span @click="removeImagePreview"><font-awesome-icon icon='times' color='#F08E8A' size="lg"/></span>
                        <img :src="myFile" alt="image preview">
                    </div>
                    <div class="makepost__div makepost__fileinput">
                          <label for="myImage">Uplaod a file
                                <font-awesome-icon icon='image' color='#76c8d3' size="lg"/>
                                <input type="file" id="myImage" @change="onFileChange">
                          </label>
                          <button class="makepost__btn" type="submit" @click.prevent="onSubmitForm">Post it  <font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                    </div>
                </form>
            </section>
            <!-- User post section -->
            <section id="userpost" v-for="post in posts" :key="post.userId">
                <div class="userpost__wrapper">
                    <div class="userpost__userinfo">
                        <img class="userpost__userimage" :src="post.imageUrl !== null ? post.imageUrl : require('../assets/images/user-icon.png')" alt="image about the post">
                        <div class="userpost__username-postdate">
                            <h2>{{ post.firstName}} {{ post.lastName}}</h2>
                            <small>Posted on {{ post.creation_date}} </small>
                        </div>
                    </div>
                    <div class="userpost__post">
                        <p>{{ post.textual_post}}</p>
                        <img v-if="post.image_url !== 'undefined'" class="userpost__imagepost" :src="post.image_url" alt="post image">
                    </div>
                    <!-- Likes and comments section -->
                    <div class="userpost__interaction">
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
                              <img class="userpost__userimage"  :src="userImage" alt="user image">
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
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
        userImage: require("../assets/images/user-icon.png"),
        myText: null,
        myFile: null,
    }
  },
  computed: {
    ...mapState(['posts', 'user']),
  },
  mounted() {
    
    // const token = document.cookie;
    // if (!token) {
    //   this.$router.push({ name: 'Entry' })
    // }
    this.$store.dispatch('getOneUser')
    this.$store.dispatch('getAllPosts')
    setTimeout(() => {
      this.setUserImage()
    }, 500)
  },
  methods: {
    setUserImage() {
      if (this.user[0].imageUrl !== undefined) {
        this.userImage = this.user[0].imageUrl
      }
    },
    onFileChange(event) {
      // this.myFile = event.target.files[0]
      let image = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.myFile = e.target.result
      }
    },
    removeImagePreview() {
      this.myFile = null
    }
    // onSubmitForm () {
    //   if(this.myText === null && this.myFile === null) {
    //     console.log('there is nothing')
    //   }
    //  else if(this.myText !== null || this.myfile !== null ) {
    //     this.$store.dispatch('makePost', { 
    //       textual_post: this.myText, image_post: this.myFile
    //     })
    //   } 
    // },
  },
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  .home {
    margin-top: 130px;

    // Common rules
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
      width: auto;
      text-align: left;
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
    input {
      display: none;
      visibility: hidden;
    }
    label {
      cursor: pointer;
    }

    // Main section
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
          &__imagepreview {
            @include flexbox;
             width: 50%;
             height: 200px;
             margin-top: 20px;
             position: relative;
             img {
               width: 100%;
               height: 100%;
               border-radius: 0px;
               object-fit: cover;
             }
             span {
               position: absolute;
               top: -10px;
               right: -10px;
             }
          }
          &__fileinput {
            margin-top: 30px; 
            padding-top: 20px;
            border-top: 1px solid $border-color;
            @include flexbox(space-around);
          }
          &__btn {
              @include btn(static);
          }
        }   
      }

    // Userpost section
      #userpost {
        .userpost {
          &__wrapper {
            padding: 35px;
          } 
          &__userinfo {
              @include flexbox(flex-start);
          }
          &__userimage {
            float: left; 
            margin-right: 7px; 
          }
          &__username-postdate {
            margin-left: 15px;
          }
          &__post {
            margin-top: 30px;
            p {
              text-align: left;
              font-size: 1.2rem;
              margin-left: 40px;
            }
          }
          &__imagepost {
            width: 90%;
            height: 250px;
            border-radius: 0%;
            object-fit: cover;
          }

          // Likes & comments section
          &__interaction {
            margin: 25px 0;
            padding: 0 40px 7px;
            border-bottom: 1px solid $border-color;
            @include flexbox(space-between);
          }
          &__likes {
            span {
              margin-right: 13px;
            }
          }
          &__comments {
            margin: 0 40px;
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
            @include btn;
            right: 18px;
          }
          @media screen and (max-width: 768px) {
            &__imagepost { width: 100%;}
            &__post { p { margin-left: 0px;}}
            &__interaction { padding-left: 30px !important}
            &__comments { margin: 0;}
          }
        }      
      }
    }
</style>