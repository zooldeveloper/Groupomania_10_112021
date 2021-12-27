<template>
  <div class="about">
      <Header/>
      <main>
          <h1>User's profile</h1>
          <div class="wrapper">
              <section id="userinfo">
                  <div class="userinfo__user userinfo__user-border">
                      <h2>{{ user[0].firstName }} {{ user[0].lastName }}</h2>
                      <img :src="userImage" alt="user image"/>
                      <p>{{ user[0].email }}</p>
                  </div>
                  <div class="userinfo__user">
                      <h2>Bio :</h2>
                      <p>{{ user[0].bio }}</p>
                      <form class="userinfo__bioform">
                          <textarea class="userinfo__biotextarea" name="" id="" placeholder="Your bio!"></textarea>
                          <button class="userinfo__btn" type="submit"><font-awesome-icon icon='paper-plane' color='#76c8d3' size="lg"/></button>
                      </form>
                  </div>
              </section>
              <section id="usersetting">
                  <div class="usersetting__setting">
                      <h2>Change your password</h2>
                      <form>
                          <div class="usersetting__form-group">
                              <label for="oldpassword"><font-awesome-icon color="#F08E8A" icon="lock" size="lx"/></label>
                              <input type="password" name="" id="oldpassword" placeholder="Your old passwrd">
                              <small></small>
                          </div>
                          <div class="usersetting__form-group">
                              <label for="newpassword"><font-awesome-icon color="#F08E8A" icon="lock" size="lx"/></label>
                              <input type="password" name="" id="newpassword" placeholder="Your new passwrd">
                              <small></small>
                          </div>
                          <Button
                              name="Submit"
                              classes="btn"
                          />
                      </form>
                  </div>
                  <div class="usersetting__setting">
                      <h2>Delete your account</h2>
                      <Button
                          name="Delete"
                          classes="btn custom-btn"
                       />
                  </div>
              </section>
          </div>
      </main>
  </div>
</template>


<script>
import Header from '../components/Header.vue'
import Button from '../components/Button.vue'
import { mapState } from 'vuex'


export default {
  name: 'Home',
  components: {
    Header, Button,
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.$router.push({ name: 'Entry' })
    }
    setTimeout(() => {
      this.setUserImage()
    }, 100)
  },
  data() {
    return {
      userImage: require("../assets/images/user-icon.png"),
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    setUserImage() {
      if (this.user[0].imageUrl != undefined ) {
        this.userImage = this.user[0].imageUrl
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  .about {
    margin-top: 100px;
    
    .wrapper {
      padding: 30px 45px;
      box-shadow: 0px 5px 15px $border-color;

      // user info section
      #userinfo {
          @include flexbox(center, start);
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
          text-align: left;
        .userinfo {   
          &__user {
            @include flexbox(space-between);
            flex-direction: column;
            width: 45%;
            img {
              width: 180px;
              height: 200px;
              object-fit: cover;
              text-align: left
            }
          }
          &__bioform {
            position: relative;
            margin-top: 10px;
            width: 100%;
          }
          &__biotextarea {
            width: 100%;
            height: 50px;
            padding: 10px 20px 0 10px;
            border-radius: 25px;
            resize: none;
            box-sizing: border-box;
          }
          &__btn {
            @include btn;
            right: 15px;
            top: 12px;
          }
          @media  screen and (max-width:768px) {
            &__user { width: 75%; }
            &__user-border { border-bottom: 1px solid $border-color; }
            &__bioform { margin-bottom: 20px; }
          }
        }
      }
      @media  screen and (max-width:768px) {
        #userinfo { flex-direction: column; align-items: center; }
      }

     // user setting section
     #usersetting {
       @include flexbox(space-around, start);
       border-bottom: 1px solid $border-color;
       padding-bottom: 30px;
     }
     .usersetting {
        &__setting {
          h2 {
            font-size: 1.2rem;
          }
        }
        &__form-group {
          position: relative;
          margin-bottom: 10px;
          text-align: left;
          width: 100%;
          label {
            position: absolute;
            top: 7px;
            left: 7px;
          }
          input {
            width: 100%;
            padding: 10px 10px 10px 25px;
            border-radius: 10px;
            border: 1px solid $border-color;
            outline: none;
          }
        }
        @media screen and (max-width:768px) {
          &__setting { h2 { text-align: center; } }
          &__form-group { width: 90%; input { width: inherit; } }
        }
      }
      @media screen and (max-width:768px) {
        #usersetting { flex-direction: column; align-items: center; }
        form { padding-bottom: 20px; border-bottom: 1px solid $border-color; }
      }
    }
  }
      
</style>