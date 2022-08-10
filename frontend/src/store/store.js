/** @format */

import { createStore } from 'vuex';
import axios from 'axios';
import { VueCookieNext } from 'vue-cookie-next';

const user = JSON.parse(localStorage.getItem('user'));

const instance = axios.create({
	baseURL: 'http://localhost:3001/api',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + VueCookieNext.getCookie('token'),
	},
});

export default createStore({
	state: {
		successResMsg: null,
		emailResMsg: null,
		passwordResMsg: null,
		posts: {},
		user: {},
		likes: {},
		comments: {},
		users: {},
		subscribers: {},
	},
	mutations: {
		SUCCESS_MESSAGE(state, message) {
			setTimeout(() => {
				state.successResMsg = message;
			}, 700);
			setTimeout(() => {
				state.successResMsg = null;
			}, 3000);
		},
		EMAIL_ERROR_MESSAGE(state, message) {
			state.emailResMsg = message;
		},
		PASSWORD_ERROR_MESSAGE(state, message) {
			state.passwordResMsg = message;
		},
		GET_ALL_POSTS(state, posts) {
			state.posts = posts;
		},
		GET_ONE_USER(state, user) {
			state.user = user;
		},
		GET_ALL_LIKES(state, likes) {
			state.likes = likes;
		},
		GET_ALL_COMMENTS(state, comments) {
			state.comments = comments;
		},
		GET_ALL_USERS(state, users) {
			state.users = users;
		},
		GET_ALL_SUBSCRIBERS(state, subscribers) {
			state.subscribers = subscribers;
		},
	},
	actions: {
		// Makes the post request of the user sign up
		async creatAccount({ context, commit }, user) {
			try {
				const result = await instance.post('/auth/signup', {
					user: JSON.stringify({
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						password: user.password,
					}),
				});
				if (result.status === 201) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				if (
					err.response.status === 402 ||
					err.response.status === 409
				) {
					context, // Put this line to avoid eslint errors!
						commit(
							'EMAIL_ERROR_MESSAGE',
							err.response.data.message
						);
					setTimeout(() => {
						commit('EMAIL_ERROR_MESSAGE', null);
					}, 3000);
				} else {
					console.log(err);
				}
			}
		},
		// Makes the post request of the user login
		async logIn({ context, commit }, user) {
			try {
				const result = await instance.post('/auth/login', {
					user: JSON.stringify({
						email: user.email,
						password: user.password,
					}),
				});
				if (result.status == 200) {
					const user = result.data.user;
					localStorage.setItem(
						'user',
						JSON.stringify(user)
					);
					VueCookieNext.setCookie(
						'token',
						result.data.token
					);
				}
			} catch (err) {
				if (err.response.status === 403) {
					context, // Put this line to avoid eslint errors!
						commit(
							'EMAIL_ERROR_MESSAGE',
							err.response.data.message
						);
					setTimeout(() => {
						commit('EMAIL_ERROR_MESSAGE', null);
					}, 3000);
				} else if (err.response.status === 401) {
					commit(
						'PASSWORD_ERROR_MESSAGE',
						err.response.data.message
					);
					setTimeout(() => {
						commit('PASSWORD_ERROR_MESSAGE', null);
					}, 3000);
				} else {
					console.log(err);
				}
			}
		},
		// Makes the get request of one user
		async getOneUser({ commit }) {
			try {
				const result = await instance.get(`/user/${user.id}`);
				if ((result.status = 200)) {
					commit('GET_ONE_USER', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the update request of the user's profile data
		async updateOneUser({ commit }, userData) {
			try {
				const fd = new FormData();
				fd.append('bio', userData.bio);
				fd.append('newEmail', userData.newEmail);
				fd.append('profile_image', userData.file);
				fd.append(
					'passwords',
					JSON.stringify(userData.passwords)
				);

				const result = await instance.patch(
					`/user/${user.id}`,
					fd,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				if ((result.status = 200)) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				if ((err.response.status = 401)) {
					commit(
						'PASSWORD_ERROR_MESSAGE',
						err.response.data.message
					);
				}
				console.log(err);
			}
		},
		// Makes the delete request of one users
		async deleteOneUser({ commit }, whatToDelete) {
			try {
				if (whatToDelete === 'deleteAccount') {
					const result = await instance.delete(
						`/user/${user.id}`
					);
					if ((result.status = 200)) {
						commit(
							'SUCCESS_MESSAGE',
							result.data.message
						);
					}
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the post request of all users posts
		async makePost({ commit }, post) {
			try {
				const fd = new FormData();
				fd.append('post_image', post.image_post);
				fd.append('textual_post', post.textual_post);

				const result = await instance.post(
					`/posts/${user.id}`,
					fd,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				if ((result.status = 201)) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		//Makes the get request of all users posts
		async getAllPosts({ commit }) {
			try {
				let result = await instance.get('/posts');
				if (result.status === 200) {
					commit('GET_ALL_POSTS', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Sends the update request of the user's post
		async modifyOnePost({ commit }, post) {
			try {
				const result = await instance.patch(
					`/posts/${post.postId}`,
					JSON.stringify({
						textual_post: post.textual_post,
					})
				);
				if (result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Sends the delete request of the user's post
		async deleteOnePost({ commit }, postId) {
			try {
				const result = await instance.delete(
					`/posts/${postId}`
				);
				if (result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the post request of all likes & dislikes
		async createOrUpdateLikeAndDislike({ commit }, likeDislike) {
			try {
				const result = await instance.post(
					'/likes',
					likeDislike
				);
				if (result.status === 201 || result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the get request of all likes & dislikes
		async getLikesAndDislikes({ commit }) {
			try {
				const result = await instance.get('/likes');
				if (result.status === 200) {
					commit('GET_ALL_LIKES', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async createOneComment({ commit }, comment) {
			try {
				const result = await instance.post(
					'/comments',
					comment
				);
				if (result.status === 201) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the get request of all comments
		async getAllComments({ commit }) {
			try {
				const result = await instance.get('/comments');
				if (result.status === 200) {
					commit('GET_ALL_COMMENTS', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Sends the update request of the user's comment
		async modifyOneComment({ commit }, comment) {
			try {
				const result = await instance.put(
					`/comments/${comment.commentId}`,
					JSON.stringify({ comment: comment.comment })
				);
				if (result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Sends the delete request of the user's comment
		async deleteOneComment({ commit }, commentId) {
			try {
				const result = await instance.delete(
					`/comments/${commentId}`
				);
				if (result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the get request of all comments
		async getAllComments({ commit }) {
			try {
				const result = await instance.get('/comments');
				if (result.status === 200) {
					commit('GET_ALL_COMMENTS', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the get request of all users
		async getAllUsers({ commit }) {
			try {
				const result = await instance.get('/users');
				if (result.status === 200) {

					const data = result.data.map( obj => {
						if(obj.subscribedUsers !== null ) {
							return {...obj, subscribedUsers: obj.subscribedUsers.split(',')}
						}
						return obj
					})
					commit('GET_ALL_USERS', data);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the get request of all subscribers
		async createOrUpdateSubscribers({ commit }, subscriber) {
			try {
				const result = await instance.post('/subscribers', subscriber);
				if (result.status === 201 || result.status === 200) {
					commit('SUCCESS_MESSAGE', result.data.message);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// Makes the post request of all subscribers
		async getAllSubscribers({ commit }) {
			try {
				const result = await instance.get('/subscribers');
				if (result.status === 200) {
					commit('GET_ALL_SUBSCRIBERS', result.data);
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	modules: {},
});
