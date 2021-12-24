<template>
    <div class="home">
        <Header/>
        <!-- <p v-if="successResMsg !== null" class="server-response">{{ successResMsg state message will be displayed here! }}<font-awesome-icon icon='check-circle' color='#2ecc71' size="lg"/></p> -->
        <main>
            <!-- Make post section -->
            <section id="makepost">
                <form>
                    <div class="makepost__div"> 
                        <img :src="userImage" alt="user image">
                        <textarea class="makepost__posttextarea" v-model="myText" placeholder="What would you like to share?"></textarea>
                    </div>
                    <small :class="{'makepost__displaybloc': nothingAdded,'makepost__displaynone': !nothingAdded }">There is nothing added!</small>
                    <div v-if="myFile !== null" class="makepost__imagepreview">
                        <CancelBtn @trigger-on-cancel="removeImagePreview"/>
                        <img :src="imagePreview" alt="image preview">
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
                        <!-- Textual post and ellipsis btn -->
                        <div class="userpost__text-btn" v-if="post.post_id !== postToUpdate">
                            <p>{{ post.textual_post}}</p>
                            <EditDelete 
                                v-if="post.id === user[0].id"
                                @trigger-edit-post="showEditPost(post.post_id)"
                                @trigger-delete-post="deletePost"
                            />
                        </div>
                        <!-- Edit form -->
                        <form class="userpost_form-editpost" v-if="post.post_id == postToUpdate">
                            <div class="userpost__form-group">
                                <CancelBtn @trigger-on-cancel="cancelEditPost"/>
                                <textarea :value="post.textual_post" @input="textToEdit = $event.target.value"></textarea>
                                <button type="submit" @click.prevent="onEditPost(post.post_id)"><font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                            </div>
                        </form>
                        <img v-if="post.image_url != undefined" class="userpost__imagepost" :src="post.image_url" alt="post image">
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
import EditDelete from '../components/EditDelete.vue'
import CancelBtn from '../components/CancelBtn.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Header, EditDelete, CancelBtn,
  },
  data() {
    return {
        userImage: require("../assets/images/user-icon.png"),
        myText: null, myFile: null,
        imagePreview: null,
        nothingAdded: false,

        textToEdit: null, postToUpdate: null,
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
      let image = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      this.myFile = event.target.files[0]
    },
    removeImagePreview() {
      this.myFile = null
    },
    onSubmitForm() {
      if(this.myText === null && this.myFile === null) {
        this.nothingAdded = true
      }
     else if(this.myText !== null || this.myfile !== null ) {
       this.nothingAdded = false
        this.$store.dispatch('makePost', { 
          textual_post: this.myText, image_post: this.myFile
        })
        location.reload()
      } 
    },
    cancelEditPost() {
      this.postToUpdate = null
    },
    showEditPost(postId) {
      this.postToUpdate = postId
      this.textToEdit = null
    },
    onEditPost(postId) {
      if(this.textToEdit !== null) {
        this.$store.dispatch('modifyOnePost', {
          postId: postId,
          textual_post: this.textToEdit
        })
        location.reload()
      }
    },
    deletePost() {
    //   Do somthing
    },
  },
}
</script>


<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  .home {
    margin-top: 130px;
    position: relative;
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
      small {
        display: none;
        margin-top: 7px;
        text-align: left;
        color: $error_color;
      }
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
      font-family: Avenir, Arial, Helvetica, sans-serif;
      resize: vertical;
      border-radius: 15px;
      font-size: 1rem;
    }
    input {
      display: none;
      visibility: hidden;
    }
    label {
      cursor: pointer;
    }

      // .server-response {
      //   position: absolute;
      //   top: -50px;
      //   left: 0;
      //   right: 0;
        // text-align: center;
      // }

      // Main section
      #makepost {
        margin-bottom: 50px;
        .makepost {     
          &__div {
            width: 90%;
            @include flexbox(space-between);
          }
          &__posttextarea {
            width: 85%;
            min-height: 60px;
            margin-left: 15px;
            padding: 7px;
          } 
          &__displaybloc {
            display: block;
          } 
           &__displaynone {
            display: none;
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
               cursor: pointer;
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

          &__form-group {
            @include flexbox(space-between);
            width: 90%;
            margin: 0 40px;
            overflow:visible;
            position: relative;
            span {
              position: absolute;
              left: 86%;
              top: -8px;
              cursor: pointer;
            }
            textarea {
              width: 85%;
              height: 70px;
              padding: 7px;
              margin-right: 7px;
              -ms-overflow-style: none;
              scrollbar-width: none;
              &::-webkit-scrollbar {
                display: none;
              }
            }
            button {
              @include btn(none);
              padding: 10px 12px 10px 10px;
              border: 1px solid $border-color;
              border-radius: 50%;
            }
          }


          &__text-btn {
            margin: 30px 40px 0;
            text-align: left;
            @include flexbox(space-between, start);
            p {
              font-size: 1.2rem;
              margin-right: 20px;
              margin-top: 0;
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
            &__imagepost { width: 100%; }
            &__form-eidtpost { padding: 0 0 !important; }
            &__form-group { margin: 0 0 !important; width: 100%; }
            &__text-btn { margin: 30px 0px !important; }
            &__interaction { padding-left: 30px !important }
            &__comments { margin: 0; }
          }
          @media screen and (max-width: 425px) {
            &__form-group { 
              flex-direction: column; 
              textarea { width: 100%; margin-bottom: 10px; }
              span { left: 98%; }
            }
          }
        }      
      }
    }
</style>