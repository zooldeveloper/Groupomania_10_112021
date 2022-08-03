<!-- @format -->

<template>
	<!-- User post section -->
	<div class="userpost__wrapper">
		<UserInfo
			:userImage="imageUrl"
			:firstName="firstName"
			:lastName="lastName"
			:postDate="postDate"
		/>
		<div class="userpost__post">
			<!-- Textual post and ellipsis btn -->
			<div
				class="userpost__text-btn"
				v-if="post_id !== postToUpdate"
			>
				<p>{{ textualPost }}</p>
				<EditDelete
					v-if="isPostIdEqualToUserIdOrIsAdmin"
					:isAdmin="isPostIdEqualToUserId"
					@trigger-edit-text="showEditPost(post_id)"
					@trigger-delete-text="
						showDeleteConfirm(post_id, null)
					"
					@trigger-cancel-delete="cancelDelete"
					@trigger-confirm-delete="confirmDelete"
					:showConfirmDelete="postId === post_id"
					:key="deletePostId"
					titles="post"
				/>
			</div>
			<!-- Edit form posts-->
			<EditForm
				v-if="post_id === postToUpdate"
				@trigger-on-edit-text="onEditPost"
				:textareaValue="textualPost"
				@trigger-text-to-edit="setPostValue"
				textareaAriaAttribute="Champ de text pour modifer un post"
				buttonAriaAttribute="button pour envoyer le post à modifier"
			>
				<template v-slot:cancelBtn>
					<CancelBtn
						@trigger-on-cancel="cancelEdit"
						classes="cancel-btn"
					/>
				</template>
			</EditForm>
			<img
				v-if="isPostImageUrlNotUndefined"
				class="userpost__imagepost"
				:src="postImage"
				alt="Image du post"
			/>
		</div>
		<!-- Likes section -->
		<div class="userpost__interaction">
			<div class="userpost__likes">
				<span @click="onLikeChange(post_id)"
					><font-awesome-icon
						icon="thumbs-up"
						color="#2b7b85"
						size="lg"
					/>
					{{ likes }}</span
				>
				<span @click="onDislikeChange(post_id)"
					><font-awesome-icon
						icon="thumbs-down"
						color="#c7201a"
						size="lg"
					/>
					{{ disLikes }}</span
				>
			</div>
			<div class="comments">
				<span
					><font-awesome-icon
						icon="comment-dots"
						color="#71838F"
						size="lg"
					/>
					{{ comments }}</span
				>
			</div>
		</div>
		<!-- Comments section-->
		<div class="userpost__comments">
			<div
				v-for="comment in this.$store.state.comments"
				:key="comment.comment_id"
			>
				<div v-if="post_id == comment.post_id">
					<div class="userpost__userinfo">
						<img
							class="userpost__userimage"
							:src="
								comment.imageUrl != undefined
									? comment.imageUrl
									: require('../assets/images/user-icon.png')
							"
							alt=""
						/>
						<div class="userpost__username-postdate">
							<h3>
								{{ comment.firstName }}
								{{ comment.lastName }}
							</h3>
							<small
								>Publié le
								{{ comment.creation_date }}
							</small>
						</div>
					</div>
					<div
						class="userpost__comment"
						v-if="
							comment.comment_id !== commentToUpdate
						"
					>
						<p>{{ comment.comment }}</p>
						<EditDelete
							v-if="
								comment.user_id ===
									user[0].id ||
								user[0].isAdmin == 'true'
							"
							:isAdmin="
								comment.user_id === user[0].id
							"
							@trigger-edit-text="
								showEditComment(
									comment.comment_id
								)
							"
							@trigger-delete-text="
								showDeleteConfirm(
									null,
									comment.comment_id
								)
							"
							@trigger-cancel-delete="cancelDelete"
							@trigger-confirm-delete="
								confirmDelete
							"
							:showConfirmDelete="
								commentId === comment.comment_id
							"
							:key="comment.comment_id"
							titles="commentaire"
						/>
					</div>
					<!-- Edit form comments -->
					<EditForm
						v-if="
							comment.comment_id === commentToUpdate
						"
						@trigger-on-edit-text="onEditComment"
						:textareaValue="comment.comment"
						@trigger-text-to-edit="setCommentValue"
						textareaAriaAttribute="Champ de text pour modifer un commentaire"
						buttonAriaAttribute="button pour envoyer le commentaire à modifier"
						>>
						<template v-slot:cancelBtn>
							<CancelBtn
								@trigger-on-cancel="cancelEdit"
								classes="cancel-btn"
							/>
						</template>
					</EditForm>
				</div>
			</div>
			<form class="userpost__commentsform">
				<img
					class="userpost__userimage"
					:src="userImage"
					alt="photo de l'utilisateur actuel"
				/>
				<textarea
					class="userpost__commenttextarea"
					@input="commentValueToSend = $event.target.value"
					placeholder="Votre commentaire !"
					aria-label="un champ de text pour créer un commentaire"
				></textarea>
				<button
					class="userpost__btn"
					type="submit"
					@click.prevent="onCreateComment(post_id)"
					aria-label="button pour envoyer un commentaire"
				>
					<font-awesome-icon
						icon="paper-plane"
						color="#2b7b85"
						size="lg"
					/>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
	import EditForm from '../components/EditForm.vue';
	import UserInfo from '../components/UserInfo.vue';
	import CancelBtn from '../components/CancelBtn.vue';
	import EditDelete from '../components/EditDelete.vue';

	import { mapState } from 'vuex';

	export default {
		name: 'UserPost',
		components: {
			EditDelete,
			UserInfo,
			EditForm,
			CancelBtn,
		},
		data() {
			return {
				userImage: require('../assets/images/user-icon.png'),
				// properties related to the post edit
				postValueToSend: null,
				postToUpdate: null,
				postId: null,
				// Properties related to the post's likes & dislikes
				like: null,
				dislike: null,
				// properties related to the comment edit
				commentValueToSend: null,
				commentToUpdate: null,
				commentId: null,
			};
		},
		props: {
			post_id: {
				type: Number,
				required: true,
			},
			imageUrl: {
				type: String,
				required: true,
			},
			firstName: {
				type: String,
				required: true,
			},
			lastName: {
				type: String,
				required: true,
			},
			postDate: {
				type: String,
				required: true,
			},
			textualPost: {
				type: String,
				required: true,
			},
			likes: {
				type: Number,
				required: true,
			},
			disLikes: {
				type: Number,
				required: true,
			},
			comments: {
				type: Number,
				required: true,
			},
			isPostIdEqualToUserIdOrIsAdmin: {
				type: Boolean,
				required: true,
			},
			isPostIdEqualToUserId: {
				type: Boolean,
				required: true,
			},

			isPostIdEqualToPostToUpdate: {
				type: Boolean,
				required: true,
			},
			isPostImageUrlNotUndefined: {
				type: Boolean,
				required: true,
			},
			postImage: {
				type: String,
			},
		},
		computed: {
			...mapState(['user', 'comments']),
		},
		mounted() {
			this.$store.dispatch('getLikesAndDislikes');
			this.$store.dispatch('getAllComments');
			setTimeout(() => {
				this.setUserImage();
			}, 100);
		},
		methods: {
			// Sets user's welcome message and user's image
			setUserImage() {
				if (
					this.user[0].imageUrl != undefined ||
					this.user.imageUrl != ''
				) {
					this.userImage = this.user[0].imageUrl;
				}
			},
			// Cancels the modification on both posts & comments
			cancelEdit() {
				this.postToUpdate = null;
				this.commentToUpdate = null;
			},
			// Shows the textarea to edit the post
			showEditPost(postId) {
				this.postToUpdate = postId;
				this.postValueToSend = null;
			},
			// Sets the value of the post to edit
			setPostValue(payload) {
				this.postValueToSend = payload;
			},
			// Sends the value of the post to edit
			onEditPost() {
				if (this.postValueToSend !== null) {
					this.$store.dispatch('modifyOnePost', {
						postId: this.postToUpdate,
						textual_post: this.postValueToSend,
					});
					location.reload();
				}
			},
			// Shows the delete confirm button on both posts & comments
			showDeleteConfirm(postId, commentId) {
				this.postId = postId;
				this.commentId = commentId;
			},
			// Cancels the delete option
			cancelDelete() {
				this.postId = null;
				this.commentId = null;
			},
			// Confirm the delete option
			confirmDelete() {
				if (this.postId !== null) {
					this.$store.dispatch(
						'deleteOnePost',
						this.postId
					);
					this.postId = null;
					setTimeout(() => {
						location.reload();
					}, 50);
				} else if (this.commentId !== null) {
					this.$store.dispatch(
						'deleteOneComment',
						this.commentId
					);
					this.commentId = null;
					setTimeout(() => {
						this.$store.dispatch('getAllPosts');
						this.$store.dispatch('getAllComments');
					}, 100);
				}
			},
			// Sets & update likes
			onLikeChange(postId) {
				let likesTable = [];
				let dislikesTable = [];

				this.$store.state.likes.forEach(like => {
					if (like.post_id === postId) {
						if (like.users_liked === this.user[0].id) {
							likesTable.push({ like: like.likes });
						}
						if (
							like.users_disliked ===
							this.user[0].id
						) {
							dislikesTable.push({
								dislike: like.dislikes,
							});
						}
					}
				});

				if (likesTable.length < 1 && dislikesTable.length < 1) {
					this.like = 1;
				} else if (
					likesTable.length > 0 &&
					dislikesTable.length < 1
				) {
					if (likesTable[0].like === 0) {
						this.like = 1;
					} else if (likesTable[0].like === 1) {
						this.like = 0;
					}
				} else if (
					likesTable.length < 1 &&
					dislikesTable.length > 0
				) {
					if (dislikesTable[0].dislike === 0) {
						this.like = 1;
					} else if (dislikesTable[0].dislike === 1) {
						this.like = null;
					}
				} else if (
					likesTable.length > 0 &&
					dislikesTable.length > 0
				) {
					if (
						likesTable[0].like === 0 &&
						dislikesTable[0].dislike === 0
					) {
						this.like = 1;
					} else if (
						likesTable[0].like === 1 &&
						dislikesTable[0].dislike === 0
					) {
						this.like = 0;
					} else if (
						likesTable[0].like === 0 &&
						dislikesTable[0].dislike === 1
					) {
						this.like = null;
					}
				}

				if (this.like === 1 || this.like === 0) {
					this.$store.dispatch(
						'createOrUpdateLikeAndDislike',
						{
							like: this.like,
							post_id: postId,
							user_id: this.user[0].id,
						}
					);
					setTimeout(() => {
						this.$store.dispatch('getAllPosts');
						this.$store.dispatch('getLikesAndDislikes');
					}, 100);
				}
			},
			// Sets & update dislikes
			onDislikeChange(postId) {
				let dislikesTable = [];
				let likesTable = [];

				this.$store.state.likes.forEach(like => {
					if (like.post_id === postId) {
						if (
							like.users_disliked ===
							this.user[0].id
						) {
							dislikesTable.push({
								dislike: like.dislikes,
							});
						}
						if (like.users_liked === this.user[0].id) {
							likesTable.push({ like: like.likes });
						}
					}
				});

				if (dislikesTable.length < 1 && likesTable.length < 1) {
					this.dislike = 1;
				} else if (
					dislikesTable.length > 0 &&
					likesTable.length < 1
				) {
					if (dislikesTable[0].dislike === 0) {
						this.dislike = 1;
					} else if (dislikesTable[0].dislike === 1) {
						this.dislike = 0;
					}
				} else if (
					dislikesTable.length < 1 &&
					likesTable.length > 0
				) {
					if (likesTable[0].like === 0) {
						this.dislike = 1;
					} else if (likesTable[0].like === 1) {
						this.dislike = null;
					}
				} else if (
					dislikesTable.length > 0 &&
					likesTable.length > 0
				) {
					if (
						dislikesTable[0].dislike === 0 &&
						likesTable[0].like === 0
					) {
						this.dislike = 1;
					} else if (
						dislikesTable[0].dislike === 1 &&
						likesTable[0].like === 0
					) {
						this.dislike = 0;
					} else if (
						dislikesTable[0].dislike === 0 &&
						likesTable[0].like === 1
					) {
						this.dislike = null;
					}
				}

				if (this.dislike === 1 || this.dislike === 0) {
					this.$store.dispatch(
						'createOrUpdateLikeAndDislike',
						{
							dislike: this.dislike,
							post_id: postId,
							user_id: this.user[0].id,
						}
					);
					setTimeout(() => {
						this.$store.dispatch('getAllPosts');
						this.$store.dispatch('getLikesAndDislikes');
					}, 100);
				}
			},
			// Creates the comment
			onCreateComment(postId) {
				if (this.commentValueToSend !== null) {
					this.$store.dispatch('createOneComment', {
						comment: this.commentValueToSend,
						post_id: postId,
						user_id: this.user[0].id,
					});
					setTimeout(() => {
						this.$store.dispatch('getAllPosts');
						this.$store.dispatch('getAllComments');
						const commentForm =
							document.getElementsByClassName(
								'userpost__commentsform'
							);
						for (
							let i = 0;
							i < commentForm.length;
							i++
						) {
							commentForm[i].reset();
						}
					}, 100);
				}
			},
			// Shows the textarea to edit the comment
			showEditComment(commentId) {
				this.commentToUpdate = commentId;
				this.commentValueToSend = null;
			},
			// Sets the value of the comment to edit
			setCommentValue(payload) {
				this.commentValueToSend = payload;
			},
			// Sends the value of the comment to edit
			onEditComment() {
				if (this.commentValueToSend !== null) {
					this.$store.dispatch('modifyOneComment', {
						commentId: this.commentToUpdate,
						comment: this.commentValueToSend,
					});
					setTimeout(() => {
						this.cancelEdit();
						this.$store.dispatch('getAllComments');
					}, 100);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';

	form {
		@include flexbox(space-between);
		flex-direction: column;
		padding: 20px 0;
		border-radius: 7px;
		font-size: 1.2rem;
		position: relative;
	}
	h3 {
		margin: 0;
		width: auto;
		text-align: left;
	}
	img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}

	// Userpost section
	.userpost {
		&__wrapper {
			padding: 35px;
		}
		&__userinfo {
			@include flexbox(flex-start);
			margin-bottom: 1rem;
		}
		&__userimage {
			float: left;
			margin-right: 7px;
		}
		&__username-postdate {
			margin-left: 15px;
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
			// }
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
			@include flexbox(space-between, flex-start);
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
				cursor: pointer;
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
			@include flexbox(space-between, flex-start);
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
			&:focus {
				outline: 1px solid $primary_color;
			}
		}
		&__btn {
			@include btn;
			right: 18px;
		}
		@media screen and (max-width: 768px) {
			&__imagepost {
				width: 100%;
			}
			&__form-eidtpost {
				padding: 0 0 !important;
			}
			&__form-group {
				margin: 0 0 !important;
				width: 100%;
			}
			&__text-btn {
				margin: 30px 0px !important;
			}
			&__interaction {
				padding-left: 30px !important;
			}
			&__comments {
				margin: 0;
			}
		}
	}
</style>
