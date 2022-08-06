<template>
      <div id="profile">
            <Header />
            <h1>Profil</h1>
            <UserProfile 
                  :userImage="userOnSearchQuery.imageUrl ? 
                  userOnSearchQuery.imageUrl : 
                  require('../assets/images/user-icon.png')"
			:userFirstName="userOnSearchQuery.firstName"
			:userLastName="userOnSearchQuery.lastName"
			:userJobTitle="userOnSearchQuery.jobTitle"
			:userSubscribersNum="4"
			:userEmail="userOnSearchQuery.email"
			:userBio="userOnSearchQuery.bio"
			@trigger-user-prfile-setting="onUserPorfileSetting"
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
						:isPostIdEqualToUserIdOrIsAdmin="post.id === user[0].id || user.isAdmin == 'true'"
						:isPostIdEqualToUserId="post.id === userOnSearchQuery.id"
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
      import UserProfile from '../components/UserProfile.vue';

      
      import { mapState } from 'vuex';

	export default {
      
		name: 'Profile',
		components: {
			Header, UserPost, UserProfile
            },
            data() {
                  return {

                        userOnSearchQuery: [],
                        isUserGotPost: false,
                  }
              },
            computed: {
			...mapState(['posts', 'user', 'users', 'successResMsg']),
		},
            mounted() {
                  const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
                  this.$store.dispatch('getOneUser');
                  this.$store.dispatch('getAllUsers');
			this.$store.dispatch('getAllPosts');
			setTimeout(()=>{ this.setUser(), 200})                  
		},
            methods: {
                  setUser() {
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
                  onUserPorfileSetting() {

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