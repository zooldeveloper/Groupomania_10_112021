@format

<template>
	<div class="about">
		<Header />
		<ServerMsg
			 v-if="successResMsg !== null"
			:successResMsg="successResMsg"
		/>
		<h1>Profil</h1>
		<UserProfile
			:userImage="currentUser.imageUrl ? currentUser.imageUrl : userImage "
			:userFirstName="currentUser.firstName"
			:userLastName="currentUser.lastName"
			:userJobTitle="currentUser.jobTitle"
			:userSubscribersNum="currentUser.subscribersNum"
			:userEmail="currentUser.email"
			:userBio="currentUser.bio"
			:isAcualUser="true"
			@trigger-user-prfile-setting="onUserPorfileSetting"
		/>
		<div class="outer-wrapper">
			<div class="inner-wrapper"  v-show="userProfileSetting">
				<CancelBtn 
					classes="cancel-btn"
					class="cancel-btn"
					@trigger-on-cancel="onUserPorfileSetting"
				/>
				<section id="userinfo">
					<div class="userinfo__user userinfo__user-border">
						<img
							:src="currentUser.imageUrl"
							alt="photo de compte de l'utilisateur"
							v-if="myFile == null"
						/>
						<label for="userimage" v-if="myFile == null"
							>Changer votre photo
							<input
								id="userimage"
								type="file"
								@change="onFileChange"
							/>
						</label>
						<ImagePreview
							v-if="myFile !== null"
							class="image-preview"
							:imagePreview="imagePreview"
							customClasses="imagepreview-user-profile"
							@trigger-on-cancel="
								removeImagePreview
							"
						/>
						<Button
							v-if="myFile !== null"
							name="Envoyer"
							class="user-profile-image-btn"
							@click="onSubmit"
						/>
					</div>
					<div class="userinfo__user">
						<form
							class="userinfo__bioform"
							@submit.prevent="onSubmit"
						>
							<div class="userinfo__formgroupe">
								<input class="userinfo__input-jobtitle" type="text" placeholder="Votre métier !">
								<textarea
									class="userinfo__textarea-bio"
									placeholder="Votre bio !"
									v-model="bioToSave"
									aria-label="un champ de text pour créer un modifier un bio"
								>
								</textarea>
							</div>
							<button
								class="userinfo__btn"
								type="submit"
								aria-label="envoyer votre bio"
							>
								<font-awesome-icon
									icon="paper-plane"
									color="#2b7b85"
									size="lg"
								/>
							</button>
						</form>
						<p v-if="currentUser.isAdmin == 'true'">
							{{ currentUser.firstName }} {{ currentUser.lastName }} est
							<span>l'Admin</span>
						</p>
					</div>
				</section>
				<section
					id="usersetting"
					:class="[
						deleteAccount ? 'usersetting-margin' : '',
					]"
				>
					<div class="usersetting__setting">
						<h2>Changer votre mot de passe</h2>
						<form @submit.prevent="onSubmit">
							<div class="usersetting__form-group">
								<span>
									<font-awesome-icon
										color="#c7201a"
										icon="lock"
										size="lx"
									/>
								</span>
								<input
									type="password"
									placeholder="Votre ancien mot de passe"
									v-model="oldPassword"
									aria-label="champ de text pour saisir l'ancien mot de passe"
								/>
								<small
									v-if="checkOldPassword"
									>{{
										oldPasswordError
									}}</small
								>
							</div>
							<div class="usersetting__form-group">
								<span>
									<font-awesome-icon
										color="#c7201a"
										icon="lock"
										size="lx"
									/>
								</span>
								<input
									type="password"
									placeholder="Votre nouveau mot de passe"
									v-model="newPassword"
									aria-label="champ de text pour saisir le nouveau mot de passe"
								/>
								<small
									v-if="checkNewPassword"
									>{{
										newPasswordError
									}}</small
								>
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
							:class="[
								deleteAccount
									? 'show-delete-confirm-btn'
									: 'hide-delete-confirm-btn',
							]"
							@click="onDeleteAccount(true)"
						/>
					</div>
				</section>
			</div>
		</div>
		<main>
			<!-- User post section -->
			<section
				id="userpost"
				v-for="post in posts"
				:key="post.post_id"
			>
				<div
					class="userpost__wrapper"
					v-if="post.id === user[0].id"
				>
					<UserPost
						:imageUrl="
							post.imageUrl !== null
								? post.imageUrl
								: userImage
						"
						:post_id="post.post_id"
						:firstName="post.firstName"
						:lastName="post.lastName"
						:postDate="post.creation_date"
						:textualPost="post.textual_post"
						:isPostIdEqualToUserIdOrIsAdmin="
							post.id === user[0].id ||
							currentUser.isAdmin == 'true'
						"
						:isPostIdEqualToUserId="
							post.id === user[0].id
						"
						:isPostImageUrlNotUndefined="
							post.image_url != undefined
						"
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
	import Button from '../components/Button.vue';
	import UserPost from '../components/UserPost.vue';
	import ServerMsg from '../components/ServerMsg.vue';
	import CancelBtn from '../components/CancelBtn.vue';
	import UserProfile from '../components/UserProfile.vue';
	import ImagePreview from '../components/ImagePreview.vue';
      
	import { mapState } from 'vuex';

	export default {
		name: 'Account',
		components: {
			Header,
			Button,
			UserPost,
			ServerMsg,
			CancelBtn,
			UserProfile,
			ImagePreview,
		},
		data() {
			return {
				// User data to display
				currentUser: [],
				userProfileSetting: false,
				userImage: require('../assets/images/user-icon.png'),
				isUserGotPost: false,
				// User data to send
				myFile: null,
				imagePreview: null,
				oldPassword: null,
				newPassword: null,
				bioToSave: null,
				newEmail: null,
				// Properties related to errors
				oldPasswordError: null,
				isOldPasswordNotValid: false,
				newPasswordError: null,
				isNewPasswordNotValid: false,
				// Properties related to the data deletion
				deleteAccount: false,
			};
		},

		watch: {
			successResMsg: function () {
				this.$store.dispatch('getOneUser');
				this.$store.dispatch('getAllUsers');
				this.$store.dispatch('getAllPosts');
				setTimeout(() => {
					this.setUser();
					this.myFile = null;
					this.newEmail = null;
					this.bioToSave = null;
					this.oldPassword = null;
					this.newPassword = null;
				}, 200);
			},
			passwordResMsg: function () {
				this.oldPasswordError = this.passwordResMsg;
				this.isOldPasswordNotValid = true;
			},
		},
		computed: {
			...mapState([
				'posts',
				'user',
				'users',
				'successResMsg',
				'passwordResMsg',
			]),
			checkOldPassword() {
				return this.isOldPasswordNotValid;
			},
			checkNewPassword() {
				return this.isNewPasswordNotValid;
			},
		},
		mounted() {
			const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
			this.$store.dispatch('getOneUser');
			this.$store.dispatch('getAllUsers');
			this.$store.dispatch('getAllPosts');
			setTimeout(() => {
				this.setUser();
			}, 100);
		},
		methods: {
			onUserPorfileSetting() {
				this.userProfileSetting = !this.userProfileSetting;
			},
			setUser() {
				if (this.user[0] != undefined) {

					for(let i = 0; i < this.users.length; i++) {
						if(this.users[i].id === this.user[0].id) {
							this.currentUser = this.users[i]
						}
                         	}

					for(let i = 0; i < this.posts.length; i++) {
						if(this.posts[i].id === this.user[0].id) {
							this.isUserGotPost = true;
						} 
					}
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
			onSubmit() {
				if (this.myFile != null) {
					this.$store.dispatch('updateOneUser', {
						file: this.myFile,
					});
				} else if (this.bioToSave !== null) {
					this.$store.dispatch('updateOneUser', {
						bio: this.bioToSave,
					});
				} else if (
					this.oldPassword !== null &&
					this.newPassword === null
				) {
					this.newPasswordError =
						'Votre nouveau mot de passe est requis !';
					this.isNewPasswordNotValid = true;
					this.isOldPasswordNotValid = false;
				} else if (
					this.oldPassword !== null &&
					!this.isNewPasswordValid(this.newPassword)
				) {
					this.newPasswordError = 'Au moins 8 caractères !';
					this.isNewPasswordNotValid = true;
					this.isOldPasswordNotValid = false;
				} else if (
					this.oldPassword === null &&
					this.newPassword !== null
				) {
					this.oldPasswordError =
						'Votre ancien mot de passe est requis!';
					this.isOldPasswordNotValid = true;
					this.isNewPasswordNotValid = false;
				} else if (
					this.oldPassword !== null &&
					this.isNewPasswordValid(this.newPassword)
				) {
					this.$store.dispatch('updateOneUser', {
						passwords: {
							oldPassword: this.oldPassword,
							newPassword: this.newPassword,
						},
					});
					this.isOldPasswordNotValid = false;
					this.isNewPasswordNotValid = false;
				}
			},
			isNewPasswordValid(password) {
				return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
					password
				);
			},
			onDeleteAccount(confirmeDelete) {
				if (this.deleteAccount === false) {
					this.deleteAccount = true;
				} else if (this.deleteAccount !== false && confirmeDelete === true) {
					this.$store.dispatch(
						'deleteOneUser',
						'deleteAccount'
					);
					localStorage.removeItem('user');
					this.$router.push({ name: 'Entry' });
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';

	.about {
		margin-top: 90px;
		h1 {
			font-size: 1.5rem;
			margin-block: 0;
		}
		.outer-wrapper {
			max-width: 800px;
			margin: 0 auto;
			z-index: 15;
			position: relative;

			.inner-wrapper {
				max-width: 400px;
				padding: 1rem 0;
				box-shadow: 0px 5px 15px $border-color;
				position: absolute;	
				top: -200px;
				right: 20px;
				background-color: #fff;
				border-radius: 15px;

				.cancel-btn {
					font-size: 1.3rem;
					top: -15px;
					left: 0 !important;
					right: 0 !important;
				}
			}

			// user info section
			#userinfo {
				@include flexbox();
				flex-direction: column;
				border-top: 1px solid $border-color;
				border-bottom: 1px solid $border-color;
				text-align: left;
				padding-top: .7rem;

				.userinfo {
					&__user {
						@include flexbox(space-between);
						flex-direction: column;
						position: relative;
						padding: 0 1rem;
						margin-bottom: 1rem;
						img {
							width: 70px;
							height: 70px;
							border-radius: 50%;
							object-fit: cover;
							text-align: left;
						}
						.image-preview {
							width: 70px;
							height: 70px;
							border-radius: 50% !important;
						}
						label,
						.user-profile-image-btn {
							width: 165px !important;
							height: 30px;
							margin-top: .7rem;
							padding: .1rem;
							border-radius: 15px !important;
							border: none;
							color: $quaternary-color;
							font-weight: bold;
							font-size: 1rem;
							cursor: pointer;
							background-color: $primary_color;
							@include flexbox;
						}
						input {
							display: none;
						}
		
						p {
							margin-top: 20px;
							margin-block: 0;
							span {
								color: $secondary-color;
							}
						}
					}
					&__bioform {
						position: relative;
						margin-top: 10px;
						width: 100%;
						@include flexbox(space-between);
						flex-direction: column;
					}

					&__formgroupe {
						@include flexbox(space-between);
					}
					
					&__input-jobtitle {
						display: block !important;
						border: 1px solid $border-color;
						padding: 0 10px 10px !important;
					}
					
					&__textarea-bio, &__input-jobtitle {
						width: 47%;
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
						position: relative;
						padding: .6rem;
						border: 1px solid $border-color;
						border-radius: 50%;
						margin-top: 1rem;
						margin-bottom: 1rem;
						&:focus {
							outline: 1px solid $primary_color;
						}
					}
				}
			}

			// user setting section
			#usersetting {
				@include flexbox();
				flex-direction: column;
				border-bottom: 1px solid $border-color;
				padding-bottom: 30px;
			}

			.usersetting-margin {
				padding-bottom: 60px !important;
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
						display: block !important;
						position: absolute;
						left: 0;
						right: 0;
						top: 100px;
						margin: auto;
						background-color: darken(
							$secondary-color,
							40%
						);
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
				@media screen and (max-width: 768px) {
					&__setting {
						h2 {
							text-align: center;
						}
					}
					&__form-group {
						width: 90%;
						input {
							width: inherit;
						}
					}
				}
			}

			@media screen and (max-width: 425px) {
				.inner-wrapper {
					max-width: 100%;
					top : -280px !important;
					right: 0 !important;
				}
			}
		}
		#userpost {
			margin: 50px 0;
			box-shadow: 0px 5px 15px $border-color;
		}
		.alert-message-no-content {
			margin: 1rem;
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
</style>
