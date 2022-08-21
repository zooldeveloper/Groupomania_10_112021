<template>
      <div id="profile">
            <Header />
            <ServerMsg
                  v-if="serverMessage !== null"
                  :successResMsg="serverMessage"
            />
            <h1>Profil</h1>
            <UserProfile 
                  :userImage="userOnSearchQuery.imageUrl ? 
                  userOnSearchQuery.imageUrl : 
                  require('../assets/images/user-icon.png')"
			:userFirstName="userOnSearchQuery.firstName"
			:userLastName="userOnSearchQuery.lastName"
			:userJobTitle="userOnSearchQuery.jobTitle"
			:userSubscribersNum="userOnSearchQuery.subscribersNum"
			:userEmail="userOnSearchQuery.email"
			:userBio="userOnSearchQuery.bio"
                  :isAcualUser="!acualUserId"
                  :acualUser="acualUserId"
                  :subscribedUsers="userOnSearchQuery.subscribedUsers"
                  @trigger-on-subscribe="onSubscribe(this.user[0].id, userOnSearchQuery.id)"
            />
            <main>
                  <section id="userpost" v-for="post in posts" :key="post.post_id">
                        <div v-if="post.id == userOnSearchQuery.id">
                               <UserPost
                                    :imageUrl="post.imageUrl !== null ? post.imageUrl : require('../assets/images/user-icon.png')"
						:post_id="post.post_id"
						:firstName="post.firstName"
						:lastName="post.lastName"
						:postDate="post.creation_date"
						:textualPost="post.textual_post"
						:isPostIdEqualToUserIdOrIsAdmin="post.id === user[0].id || user[0].isAdmin == 'true'"
                                    :isPostIdEqualToUserId="post.id === user[0].id"
						:isPostImageUrlNotUndefined="post.image_url != undefined"
						:postImage="post.image_url"
						:likes="post.likes"
						:disLikes="post.dislikes"
						:comments="post.comments"
                               />
                        </div>
                  </section>
                  <div class="alert-message-no-content" v-if="!isUserGotPost">
                        <p>L'utilisateur n'a rien publié !</p>
                  </div>
            </main>
      </div>
</template>

<script>
      import Header from '../components/Header.vue';
      import UserPost from '../components/UserPost.vue';
      import ServerMsg from '../components/ServerMsg.vue';
      import UserProfile from '../components/UserProfile.vue';

      
      import { mapState } from 'vuex';

	export default {
      
		name: 'Profile',
		components: {
			Header, UserPost, ServerMsg, UserProfile,
            },
            data() {
                  return {

                        userOnSearchQuery: [],
                        acualUserId: null,
                        serverMessage: null,
                        subscriberStatus: null,
                        isUserGotPost: false,
                  }
            },
            watch: {
			successResMsg: function () {
				this.setUser();
			},
            },
            computed: {
			...mapState(['posts', 'user', 'users', 'subscribers', 'successResMsg']),
		},
            mounted() {
                  const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
                  this.$store.dispatch('getOneUser');
                  this.$store.dispatch('getAllUsers');
			this.$store.dispatch('getAllPosts');
                  this.$store.dispatch('getAllSubscribers');
			setTimeout(()=>{ this.setUser()}, 100)                  
		},
            methods: {
                  setUser() {
                       
                         this.acualUserId = this.user[0].id;
                         setTimeout(()=>{this.serverMessage = this.successResMsg}, 800)

                        for(let i = 0; i < this.users.length; i++) {
                              if(this.users[i].id == this.$route.query.id) {
                                    this.userOnSearchQuery = this.users[i]
                              }
                              
                         }
                         
                         for(let i = 0; i < this.posts.length; i++) {
                              if(this.posts[i].id == this.userOnSearchQuery.id) {
                                    this.isUserGotPost = true;
                              } 
                         }
                  },
                  onSubscribe(currentUser, clickedUser) {
                        
                       let subscribersTable = [];

				this.subscribers.forEach(subscriber => {
					if(subscriber.profile_owner === clickedUser) {
						if (subscriber.subscribed_user === currentUser) {
							subscribersTable.push({subscriber_status: subscriber.subscriber_status})
						}
					}
				});


				if(currentUser === clickedUser) {
					return ''
				} else if(subscribersTable.length < 1) {
					this.subscriberStatus = 'true'
				} else if(subscribersTable.length > 0) {
					if (subscribersTable[0].subscriber_status === 'true') {
						this.subscriberStatus = 'false'
					} else if(subscribersTable[0].subscriber_status === 'false') {
						this.subscriberStatus = 'true'
					}
				}
			
				if (this.subscriberStatus === 'true' || this.subscriberStatus === 'false') {
					this.$store.dispatch('createOrUpdateSubscribers',
						{
							profile_owner: clickedUser,
							subscribed_user: currentUser,
							subscriber_status: this.subscriberStatus,
						}
					);
                              setTimeout(() => {
						this.$store.dispatch('getAllUsers');
						this.$store.dispatch('getAllSubscribers');
					}, 20);				
				}
                  },
            },
	};
</script>

<style lang="scss" scoped>
      @import '@/assets/sass/variables.scss';

       #profile {
            margin-top: 85px;
      }

      h1 {
            font-size: 1.5rem;
            top: 6rem;
            z-index: 15;       
      }

      section {
            margin-top: 30px;
            box-shadow: 0px 5px 15px $border-color;
      }
      .alert-message-no-content {
            margin: 1rem;
            font-size: 1.5rem;
            font-weight: bold;
      }
      
</style>