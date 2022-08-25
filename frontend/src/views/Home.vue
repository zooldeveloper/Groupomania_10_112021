<!-- @format -->

<template>
	<div class="home">
		<Header />
		<ServerMsg
			 v-if="successResMsg !== null || userFirstname !== null"
			:successResMsg="successResMsg || `Welcome again ${userFirstname} 😊`"
			:isSuccessMsg="successResMsg"
			class="server-alert-message"
		/>
		<main>
			<!-- Makepost section -->
			<section id="makepost">
				<form>
					<div class="makepost__div">
						<img
							:src="$store.getters.setUserImage"
							alt="image of the actual user"
						/>
						<textarea
							class="makepost__posttextarea"
							v-model="myText"
							placeholder="Whate would you like to share?"
							aria-label="A text field to create a post"
						></textarea>
					</div>
					<small
						:class="{
							makepost__displaybloc: nothingAdded,
							makepost__displaynone: !nothingAdded,
						}"
						>There is nothing added!</small
					>
					<ImagePreview
						v-if="myFile !== null"
						@trigger-on-cancel="removeImagePreview"
						:imagePreview="imagePreview"
					/>
					<div class="makepost__div makepost__fileinput">
						<label for="myImage"
							>Upload a file
							<font-awesome-icon
								icon="image"
								color="#2b7b85"
								size="lg"
							/>
							<input
								type="file"
								id="myImage"
								@change="onFileChange"
							/>
						</label>
						<button
							class="makepost__btn"
							type="submit"
							@click.prevent="onSubmitForm"
						>
							Post it
							<font-awesome-icon
								icon="paper-plane"
								color="#2b7b85"
								size="lg"
							/>
						</button>
					</div>
				</form>
			</section>
			<!-- User post section -->
			<section
				id="userpost"
				v-for="post in usersPosts"
				:key="post.post_id"
			>
				<UserPost
					:imageUrl="
						post.imageUrl !== null
							? post.imageUrl
							: require('../assets/images/user-icon.png')
					"
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
			</section>
		</main>
	</div>
</template>

<script>
	import Header from '../components/Header.vue';
	import UserPost from '../components/UserPost.vue';
	import ServerMsg from '../components/ServerMsg.vue';
	import ImagePreview from '../components/ImagePreview.vue';

	import { mapState } from 'vuex';

	export default {
		name: 'Home',
		components: {
			Header,
			UserPost,
			ServerMsg,
			ImagePreview,
		},
		data() {
			return {
				// Properties that have common purposes
				userFirstname: null,
				myText: null,
				myFile: null,
				imagePreview: null,
                        nothingAdded: false,
				usersPosts: [],
			};
		},
		computed: {
			...mapState(['posts', 'user', 'successResMsg']),
		},
		watch: {
			posts: function() {
				this.setUser();
			}
		},
		created() {
			this.$store.dispatch('getOneUser');
			this.$store.dispatch('getAllPosts');
		},
		mounted() {
			const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
                  setTimeout(() => {
				this.setUser();
			}, 200);
		},
		methods: {
			// Sets user's welcome message and users posts!
			setUser() {
				const onLoadPage = JSON.parse(
					localStorage.getItem('onLoadPage')
				);

				if (!onLoadPage) {
					setTimeout(() => {
						this.userFirstname = this.user[0].firstName;
					}, 1000)
					
					setTimeout(() => {
						this.userFirstname = null;
						localStorage.setItem('onLoadPage', true);
					}, 5000);
				} else {
					this.userFirstname = null;
				}
				if(this.$route.query.id) {
					for(let i = 0; i < this.posts.length; i++) {
						if(this.posts[i].post_id == this.$route.query.id) {
							this.usersPosts.push(this.posts[i]);
						}
					}
				} else {
					this.usersPosts = this.posts
				}		
			},
			onFileChange(event) {
				let image = event.target.files[0];
				let reader = new FileReader();
				reader.readAsDataURL(image);
				reader.onload = e => {
					this.imagePreview = e.target.result;
				};
				this.myFile = event.target.files[0];
			},
			removeImagePreview() {
				this.myFile = null;
			},
			onSubmitForm() {
				if (this.myText === null && this.myFile === null) {
					this.nothingAdded = true;
				} else if (
					this.myText !== null ||
					this.myfile !== null
				) {
					this.nothingAdded = false;
					this.$store.dispatch('makePost', {
						textual_post: this.myText,
						image_post: this.myFile,
					});
					setTimeout(() => {
						this.$store.dispatch('getAllPosts');
					}, 100)
					this.myText = null;
					this.myFile = null;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';

	.home {
		margin-top: 130px;
		position: relative;

		.server-alert-message {
			margin-top: 0rem !important;
		}
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
					&:focus {
						outline: 1px solid $primary_color;
					}
				}
				&__displaybloc {
					display: block;
				}
				&__displaynone {
					display: none;
				}
				&__fileinput {
					margin-top: 30px;
					padding-top: 20px;
					border-top: 1px solid $border-color;
					@include flexbox(space-around);
				}
				&__btn {
					@include btn(static);
					&:focus {
						outline: 1px solid $primary_color;
					}
				}
			}
		}
	}
</style>
