<template>
      <div class="user-profile">
            <div class="user-profile__top-background">   
                  <div class="user-profile__absolute-position">
                        <div class="user-profile__user-info">
                              <img :src="userImage" alt="User's image">
                              <h2>{{userFirstName}} {{userLastName}}</h2>
                              <div class="user-profile__jobtitle-subscribersnumber-email">
                                    <p>{{userJobTitle}}</p>
                                    <font-awesome-icon icon="users" color="#2b7b85" size="sm"/>
                                    <small>{{userSubscribersNum}}</small>
                                    <p class="email">{{userEmail}}</p>
                              </div>
                        </div>
                        <div class="user-profile__subscribe-setting">
                              <div  v-show="!isAcualUser">
                                    <div v-if="subscribedUsers">
                                          <SubscribeBtn
                                                v-if="subscribedUsers.find(subscribedUser => subscribedUser == acualUser)"
                                                :icon="'user-check'"
                                                color="#2b7b85"
                                                size="2x"
                                                @trigger-on-subscribe="onSubscribe"
                                          />
                                          <SubscribeBtn
                                                v-else
                                                :icon="'user-plus'"
                                                color="#F08E8A"
                                                size="2x"
                                                @trigger-on-subscribe="onSubscribe"
                                          />
                                    </div>
                                     <div v-else>
                                          <SubscribeBtn
                                                :icon="'user-plus'"
                                                :color="'#F08E8A'"
                                                size="2x"
                                                @trigger-on-subscribe="onSubscribe"
                                          />
                                    </div>
                              </div>
                              <button class="setting-btn" v-show="isAcualUser" @click="triggerUserProfileSetting">
                                    <font-awesome-icon icon="sliders-h" color="#2b7b85" size="2x"/>
                              </button>
                        </div>
                  </div>
            </div>
            <div class="user-profile__bottom-background">
                  <div class="user-profile__user-bio">
                        <h3>Bio :</h3>
                        <p>{{userBio}}</p>
                  </div>
            </div>
            
      </div>
</template>

<script>  	
      import SubscribeBtn from './SubscribeBtn.vue';

      export default {
            name: 'UserProfile',
            components: {
                  SubscribeBtn,
            },
            props: {
                  userImage: {
                        type: String,
                        required: true,
                  },
                  userFirstName: {
                        type: String,
                        required: true,
                  },
                  userLastName: {
                        type: String,
                        required: true,
                  },
                  userJobTitle: {
                        type: String,
                        required: true,
                  },
                  userSubscribersNum: {
                        type: Number,
                        required: true,
                  },
                  userEmail: {
                        type: String,
                        required: true,
                  },
                  userBio: {
                        type: String,
                        required: true,
                  },
                  isAcualUser: {
                        type: Boolean,
                        required: true,
                  },
                  acualUser: {
                        type: Number,
                        required: true,
                  },
                  subscribedUsers: {
                        type: Array,
                        required: true,
                  }
            },
            methods: {
                  triggerUserProfileSetting() {
                        this.$emit('trigger-user-prfile-setting')
                  },
                  onSubscribe() {
                        this.$emit('trigger-on-subscribe')
                  }
            }
      }
</script>

<style lang="scss" scoped>
      @import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';

      .user-profile {
            max-width: 800px;
            margin: 0 auto;
            box-shadow: 0px 5px 15px $border-color;
            z-index: 1;

            &__top-background {       
                  height: 85px;
                  background-color: lighten($secondary_color, 15);
                  position: relative;
             }

            &__absolute-position {
                  @include flexbox(space-around);
                  width: 100%;
                  position: absolute;
                  bottom: -15px;
            }

            &__user-info {      
                  @include flexbox(space-around);
                  position: relative;
                  img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        margin-right: 1rem;
                  }

                  h2 {
                        color: $primary_color;
                  }
             }

             &__subscribe-setting {
                  width: 20%;
                   @include flexbox(space-around);

                   button {
                        border: none;
                        background: none;
                        cursor: pointer;
                   }
             }

            &__jobtitle-subscribersnumber-email{
                  position: absolute;
                  left: -9px;
                  bottom: -45px;

                 p {
                        margin-block: 0;
                        font-size: .8rem;
                        opacity: .8;
                 }

                 small {
                  margin-left: .5rem;
                 }
                 .email {
                        position: absolute;
                        left: -20px;
                        bottom: -60px;
                        font-size: 1rem;
                        opacity: 1;
                 }
            }

            &__bottom-background {
                  height: 130px;
                  margin-right: 3.5rem;
                  padding-left: 12rem;
                  @include flexbox(flex-end);
           
                  h3 {
                        margin-block: 0; 
                  }

                  p {
                        max-width: 370px;
                        margin-block: 0;
                  }
             }

            @media screen and (max-width: 425px) {

                  &__jobtitle-subscribersnumber-email {
                        .email {
                              left: 160px !important;
                              top: -0px;
                        }
                  }

                  &__bottom-background {
                        min-height: 150px !important;
                        margin-right: 0rem;
                        padding: 4rem 2rem 0 ;
                  }
            }
      }
</style>