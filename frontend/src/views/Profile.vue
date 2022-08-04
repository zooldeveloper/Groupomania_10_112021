<template>
      <div id="profile">
            <Header />
            <h1>Profil</h1>
            <UserProfile />
            <main>
                  <section id="userpost" v-for="post in posts" :key="post.post_id">
                        <div v-if="post.id == this.$route.query.id">
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

              },
            created() {
                  
			this.$store.dispatch('getOneUser');
			this.$store.dispatch('getAllPosts');
		},
            computed: {
			...mapState(['posts', 'user', 'successResMsg']),
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
      
</style>