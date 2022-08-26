<!-- @format -->

<template>
	<div id="users">
		<Header />
		<main>
			<ServerMsg
				v-if="successResMsg !== null"
				:successResMsg="successResMsg"
			/>
			<h1>Users</h1>
			<div class="form-group">
				<label for="input"><font-awesome-icon id="search" for="input" icon="search" color="#2b7b85" size="lg"/></label>
				<input @keyup="showMatchedUsers" v-model="inputValue" id="input" type="text" placeholder="Serach for a user">
			</div>
			<div class="users-container">
				<div v-for="user in users" :key="user.id" class="user-card">
					<div class="user-details" @click="takeUserId(user.id)">
						<img :src=" user.imageUrl != null ? user.imageUrl : require('../assets/images/user-icon.png')" alt="User's image"/>
						<div class="personal-info">
							<h2>{{ user.firstName }} {{ user.lastName }}</h2>
							<p>{{ user.jobTitle }}</p>
							<div class="subscribers-number">
								<font-awesome-icon icon="users" color="#2b7b85" size="sm"/>
								<small>{{user.subscribersNum}}</small>
							</div>
						</div>
					</div>
					
					<div  v-if="user.subscribedUsers">
						<SubscribeBtn
							v-if="user.subscribedUsers.find(subscribedUser => subscribedUser == this.user[0].id)"
							:icon="'user-check'"
							:color="'#2b7b85'"
							size="lg"
							@trigger-on-subscribe="onSubscribe(this.user[0].id, user.id)"
							
						/>
						<div v-else-if="user.subscribedUsers.map(subscribedUser => subscribedUser != this.user[0].id)">
							<SubscribeBtn
								v-if="user.id !== this.user[0].id"
								:icon="'user-plus'"
								:color="'#F08E8A'"
								size="lg"
								@trigger-on-subscribe="onSubscribe(this.user[0].id, user.id)"
							/>
						</div>
					</div>
					<div v-else>
						<SubscribeBtn
							v-if="user.id !== this.user[0].id"
							:icon="'user-plus'"
							:color="'#F08E8A'"
							size="lg"
							@trigger-on-subscribe="onSubscribe(this.user[0].id, user.id)"
						/>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import Header from '../components/Header.vue';
	import ServerMsg from '../components/ServerMsg.vue';
	import SubscribeBtn from '../components/SubscribeBtn.vue';

	import { mapState } from 'vuex';
import { h } from '@vue/runtime-core';

	export default {
		name: 'Users',
		components: {
			Header,
			ServerMsg,
			SubscribeBtn,
		},
		data() {
			return {
				inputValue: null,
				subscriberStatus: null,
			}
		},
		mounted() {
			const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
		
			this.$store.dispatch('getOneUser');
			this.$store.dispatch('getAllUsers');
			this.$store.dispatch('getAllSubscribers');
		},
		computed: {
			...mapState(['users', 'user', 'subscribers', 'successResMsg']),
		},
		methods: {
			takeUserId(userId) {
				if(userId === this.user[0].id ) {
					 this.$router.push({path:'account'})
				} else {
					this.$router.push({path:'profile', query: {id: userId}})
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
					if(this.subscriberStatus === 'true') {
						
						let newSubscribedUsers = JSON.parse(localStorage.getItem('newSubscribedUsers'));

						if(newSubscribedUsers != null) {
							if(newSubscribedUsers[clickedUser] == undefined) {
								newSubscribedUsers = {
									...newSubscribedUsers,
									[clickedUser]: {
										[currentUser]: `${this.user[0].firstName} ${this.user[0].lastName} subscribed to your account!`,
									},
								}
							} else {
								newSubscribedUsers = {
									...newSubscribedUsers,
									[clickedUser]: {
										...newSubscribedUsers[clickedUser],
										[currentUser]: `${this.user[0].firstName} ${this.user[0].lastName} subscribed to your account!`,
									},
								}
							}

						} else {
							newSubscribedUsers = {
								[clickedUser]: {
									[currentUser]: `${this.user[0].firstName} ${this.user[0].lastName} subscribed to your account!`,
								},
							}
						}
						localStorage.setItem('newSubscribedUsers', JSON.stringify(newSubscribedUsers));
					}
					setTimeout(() => {
						this.$store.dispatch('getAllUsers');
						this.$store.dispatch('getAllSubscribers');
					}, 100);
				}
			},
			showMatchedUsers() {
				let filter, userCard, personalInfo, h2, textValue;
				filter = this.inputValue.toUpperCase();
				userCard = document.getElementsByClassName('user-card');
				personalInfo = document.getElementsByClassName('personal-info');
				
				for(let i = 0; i < personalInfo.length; i++) {
					h2 = personalInfo[i].getElementsByTagName('h2')[0];
					textValue = h2.textContent || h2.innerText;
					if(textValue.toUpperCase().indexOf(filter) > -1) {
						userCard[i].style.display = "";
					} else {
						userCard[i].style.display = "none"
					}
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/mixins.scss';
	@import '@/assets/sass/variables.scss';

	main {
		margin-top: 7rem;
		max-width: 1000px !important;

		.form-group {
			margin: 0 auto;
			position: relative;
			width: fit-content;
			#input {
				min-width: 400px;
				height: 30px;
				padding: 6px;
				font-size: 1rem;
				border-radius: 10px;
				outline: none;
				border: 2px solid $border-color;

				&:focus {
					border: 2px solid $secondary_color;
				}
			}
			#search {
				position: absolute;
				top: 12px;
				right: 12px;
			}

		}
		.users-container {
			@include flexbox();
			flex-wrap: wrap;
			margin-top: 1rem;
			width: 100%;
			height: auto;

			.user-card {
				@include flexbox(space-between);
				width: 250px;
				height: 70px;
				margin: 1rem;
				padding: 0.3rem 0.8rem;
				border-radius: 5px;
				box-shadow: rgb($border-color, 0.2) 0px 2px 24px;
				transition: transform 0.4s;
				&:hover {
					transform: scale(1.07);
				}
			}

			.user-details {
				@include flexbox(space-between);
				cursor: pointer;
				img {
					width: 60px;
					height: 60px;
					border-radius: 50%;
					border: 2px solid $tertiary_color;
				}
			}

			.personal-info {
				margin-left: 0.5rem;
				text-align: left;
				h2 {
					font-size: 0.8rem;
					margin: 0;
				}
				p {
					margin: 0;
					font-size: 0.7rem;
				}
				small {
					margin-left: 0.3rem;
				}
			}
		}

		@media screen and (max-width: 768px) {
			.form-group {
				#input {
					min-width: 250px;
				}
			}
		}
	}
</style>
