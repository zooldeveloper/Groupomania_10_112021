<template>
  <div class="about">
      <Header/>
      <main>
          <h1>Profil de l'utilisateur</h1>
          <div class="wrapper">
              <section id="userinfo">
                  <div class="userinfo__user userinfo__user-border">
                      <h2>{{ firstName }} {{ lastName }}</h2>
                      <img 
                          :src="userImage" 
                          alt="photo de compte de l'utilisateur" 
                          v-if="myFile == null"/>
                      <label for="userimage" v-if="myFile == null">Changer votre photo
                            <input 
                              id="userimage" 
                              type="file"  
                              @change="onFileChange">
                      </label>
                      <ImagePreview
                          v-if="myFile !== null"
                          :imagePreview="imagePreview"
                          customClasses="imagepreview-user-profile"
                          @trigger-on-cancel="removeImagePreview"
                      />
                      <Button 
                          v-if="myFile !== null"
                          name="Envoyer"
                          class="user-profile-image-btn"
                          @click="onSubmit"
                      />
                      <p>{{ email }}</p>
                  </div>
                  <div class="userinfo__user">
                      <h2>Bio :</h2>
                      <p>{{ bio }}</p>
                      <form 
                          class="userinfo__bioform" 
                          @submit.prevent="onSubmit">
                          <textarea 
                              class="userinfo__biotextarea" 
                              placeholder="Votre bio!"
                              v-model="bioToSave"
                              aria-label="un champ de text pour créer un modifier un bio">
                          </textarea>
                          <button 
                              class="userinfo__btn" 
                              type="submit"
                              aria-label="envoyer votre bio">
                              <font-awesome-icon icon='paper-plane' color='#2b7b85' size="lg"/>
                          </button>
                      </form>
                      <p v-if="isAdmin == 'true'">{{ firstName }} {{ lastName }} est <span>l'Admin</span></p>
                  </div>
              </section>
              <section id="usersetting" :class="[deleteAccount ? 'usersetting-margin': '']">
                  <div class="usersetting__setting">
                      <h2>Changer votre mot de passe</h2>
                      <form @submit.prevent="onSubmit">
                          <div class="usersetting__form-group">
                              <span>
                                    <font-awesome-icon color="#c7201a" icon="lock" size="lx"/>
                                </span>
                              <input 
                                  type="password"
                                  placeholder="Votre ancien mot de passe"
                                  v-model="oldPassword"
                                  aria-label="champ de text pour saisir l'ancien mot de passe">
                              <small v-if="checkOldPassword">{{ oldPasswordError }}</small>
                          </div>
                          <div class="usersetting__form-group">
                              <span>
                                  <font-awesome-icon color="#c7201a" icon="lock" size="lx"/>
                              </span>
                              <input 
                                  type="password" 
                                  placeholder="Votre nouveau mot de passe"
                                  v-model="newPassword"
                                  aria-label="champ de text pour saisir le nouveau mot de passe">
                              <small v-if="checkNewPassword">{{ newPasswordError }}</small>
                          </div>
                          <Button
                              name="Envoyer"
                              classes="btn"
                          />
                      </form>
                  </div>
                  <div class="usersetting__setting">
                      <h2>Supprimer votre compte</h2>
                      <Button
                          name="Supprimer"
                          classes="btn custom-btn"
                          @click="onDeleteAccount"
                       />
                       <Button
                          name="Je confirme"
                          classes="btn custom-btn"
                          :class="[deleteAccount ? 'show-delete-confirm-btn': 'hide-delete-confirm-btn']"
                          @click="onDeleteAccount"
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
import ImagePreview from '../components/ImagePreview.vue'
import { mapState } from 'vuex'



export default {
  name: 'Account',
  components: {
    Header, Button, ImagePreview
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.$router.push({ name: 'Entry' })
    }
    this.$store.dispatch('getOneUser')
    setTimeout(() => {
      this.setUser()
    }, 100)
  },
  data() {
    return {
      // User data to display
      userImage: require("../assets/images/user-icon.png"),
      firstName: null, lastName: null,
      email: null, bio: null, isAdmin: null,
      // User data to send
      myFile: null,  imagePreview: null,
      oldPassword: null, newPassword: null,
      bioToSave: null, newEmail: null,
      // Properties related to errors
      oldPasswordError: null, isOldPasswordNotValid: false,
      newPasswordError: null, isNewPasswordNotValid: false,
      // Properties related to the data deletion
      deleteAccount: false
      
    }
  },
  watch: {
    successResMsg: function() {
      this.$store.dispatch('getOneUser')
      setTimeout(() => {
        this.setUser()
        this.myFile = null
        this.newEmail = null
        this.bioToSave = null
        this.oldPassword = null
        this.newPassword = null
      }, 200)
    },
    passwordResMsg: function() {
      this.oldPasswordError = this.passwordResMsg
      this.isOldPasswordNotValid = true
    }
  },
  computed: {
    ...mapState(['user', 'successResMsg', 'passwordResMsg']),
    checkOldPassword() {
      return this.isOldPasswordNotValid
    },
    checkNewPassword() {
      return this.isNewPasswordNotValid
    },
  },
  methods: {
    setUser() {
      if (this.user[0] != undefined ) {
        this.firstName = this.user[0].firstName
        this.lastName = this.user[0].lastName
        this.bio = this.user[0].bio
        this.email = this.user[0].email
        this.isAdmin = this.user[0].isAdmin
        if (this.user[0].imageUrl != undefined ) {
          this.userImage = this.user[0].imageUrl
        }
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
    onSubmit() {
      if(this.myFile != null ) {
       this.$store.dispatch('updateOneUser', { file: this.myFile })
      }
      else if(this.bioToSave !== null ) {
        this.$store.dispatch('updateOneUser', { bio: this.bioToSave })
      }
      else if(this.oldPassword !== null && this.newPassword === null) {
        this.newPasswordError = 'Your new password is required!'
        this.isNewPasswordNotValid = true
        this.isOldPasswordNotValid = false
      }
      else if(this.oldPassword !== null && !this.isNewPasswordValid(this.newPassword)) {
        this.newPasswordError = ' Atleast 8 characters!'
        this.isNewPasswordNotValid = true
        this.isOldPasswordNotValid = false
      }
      else if(this.oldPassword === null && this.newPassword !== null) {
        this.oldPasswordError = 'Your old password is required!'
        this.isOldPasswordNotValid = true
        this.isNewPasswordNotValid = false
      }
      else if(this.oldPassword !== null &&  this.isNewPasswordValid(this.newPassword)) {
        this.$store.dispatch('updateOneUser', { 
          passwords: {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword 
          }
        })
        this.isOldPasswordNotValid = false
        this.isNewPasswordNotValid = false
      }
      
    },
    isNewPasswordValid(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    },
    onDeleteAccount() {
      if(this.deleteAccount === false) {
        this.deleteAccount = true
      } else {
        this.$store.dispatch('deleteOneUser', 'deleteAccount')
        localStorage.removeItem('user')
        this.$router.push({ name: 'Entry' })
      }   
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables.scss';
  @import '@/assets/sass/mixins.scss';

  .about {
    margin-top: 100px;
    h1 {
      font-size: 1.5rem;
    }
    .wrapper {
      padding: 30px 45px;
      box-shadow: 0px 5px 15px $border-color;

      // user info section
      #userinfo {
          @include flexbox(center, flex-start);
          border-top: 1px solid $border-color;
          border-bottom: 1px solid $border-color;
          text-align: left;
        .userinfo {   
          &__user {
            @include flexbox(space-between);
            flex-direction: column;
            position: relative;
            width: 45%;
            img {
              width: 180px;
              height: 200px;
              object-fit: cover;
              text-align: left
            }
            label, .user-profile-image-btn {
              width: 165px !important;
              height: 30px;
              position: absolute;
              bottom: 57px;
              border-radius: 15px !important;
              border: none ;
              color: $quaternary-color;
              font-weight: bold;
              font-size: 1rem;
              cursor: pointer;
              background-color: rgb(118, 200, 211, .7);
              @include flexbox;
            }
            input {
              display: none;
            }
            p {
              margin-top: 20px;
              span {
                color: $secondary-color;
              }
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
            &:focus {
              outline: 1px solid $primary_color;
            }
          }
          &__btn {
            @include btn;
            right: 15px;
            top: 12px;
            &:focus {
              outline: 1px solid $primary_color;
            }
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
       @include flexbox(space-around, flex-start);
       border-bottom: 1px solid $border-color;
       padding-bottom: 30px;
     }
     .usersetting {
        &__setting {
          position: relative;
          h2 {
            font-size: 1.2rem;
          }
          .hide-delete-confirm-btn {
            display: none;
          }
          .show-delete-confirm-btn {
            display: block!important;
            position: absolute;
            left: 0;
            right: 0;
            top: 100px;
            margin: auto;
            background-color: darken($secondary-color, 40%);
          }
        }
        &__form-group {
          position: relative;
          margin-bottom: 20px;
          text-align: left;
          width: 100%;
          span {
            position: absolute;
            top: 7px;
            left: 7px;
          }
          input {
            width: 100%;
            padding: 10px 10px 10px 25px;
            border-radius: 10px;
            border: 1px solid $border-color;
            &:focus {
              outline-color: $primary_color;
            }
          }
          small {
            position: absolute;
            width: 300px !important;
            color: $error_color;
          }
        }
        @media screen and (max-width:768px) {
          &__setting { h2 { text-align: center; } }
          &__form-group { width: 90%; input { width: inherit; } }
        }
      }
      @media screen and (max-width:768px) {
        #usersetting { flex-direction: column; align-items: center; }
        .usersetting-margin { padding-bottom: 60px !important; }
        form { padding-bottom: 20px; border-bottom: 1px solid $border-color; }
      }
    }
  }
      
</style>