<template>
      <div id="notification">
            <Header />
		<ServerMsg 
			v-if="alertMsg !== null"
			:successResMsg="alertMsg"
		/>
		 <h1>Notifications</h1>
            <main class="notif-wrapper" v-if="userPostNotifs !== null || userSubscribersNotifs !== null">
			<div v-for="(parentVal, parentPro, index) in userPostNotifs" :key="index">
				<div class="notif-message-group" v-for="(childVal, childPro, index) in parentVal" :key="index">
					<p @click="this.$router.push({path: '/', query: {id: childPro}})" aria-label="click to go to the reacted or commented post" aria-role="bouton">{{ childVal }}</p>
					<button >
						<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg" @click="removeOneNotif(parentPro)" aria-role="bouton"/>
						<small>Remove it</small>
					</button>
				</div>
			</div>
			<div class="notif-message-group"  v-for="(userSubscribersNotif, subscribedUserId, index) in userSubscribersNotifs" :key="index">
				<p @click="this.$router.push({path: 'profile', query: {id: this.user[0].id}})" aria-label="click to go to the reacted or commented post" aria-role="bouton">{{ userSubscribersNotif }}</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg" @click="removeOneNotif(null, subscribedUserId)" aria-role="bouton"/>
					<small>Remove it</small>
				</button>
			</div>
			<button class="btn-remove-all" @click="removeAllNotifs">Remove them all</button>
            </main>
		<div class="zero-notification" v-else-if="userPostNotifs == null && userSubscribersNotifs == null">
			<p>Your have no recent notifications!</p>
		</div>
      </div>
</template>

<script>
	import Header from '../components/Header.vue';
	import ServerMsg from '../components/ServerMsg.vue';

	import { mapState } from 'vuex';

	export default {
		name: 'Notification',
		components: {
			Header,
			ServerMsg,
		},
		data() {
			return {
				postNotifications: JSON.parse(localStorage.getItem('notifications')),
				subscriptionNotifications: JSON.parse(localStorage.getItem('newSubscribedUsers')),
				userPostNotifs: null,
				userSubscribersNotifs: null,
				alertMsg: null,
			}
		},
		mounted() {
			this.$store.dispatch('getOneUser');
			const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
			setTimeout(() =>{
				this.findCurrentUserNotif();
			}, 100)
		},
		computed: {
			...mapState(['user', 'primaryColor', 'secondaryColor']),
		},
		methods: {
			findCurrentUserNotif() {
				
				for(let acualUser in this.postNotifications) {
					if(acualUser == this.user[0].id) {
						this.userPostNotifs = this.postNotifications[acualUser];
					}
				}

				for(let acualUser in this.subscriptionNotifications) {
					if(acualUser == this.user[0].id) {
						this.userSubscribersNotifs = this.subscriptionNotifications[acualUser];
					}
				}
			},
			removeOneNotif(parentProAsNotifId, subscribedUserId) {
				if(parentProAsNotifId  !== null) {
					delete this.postNotifications[this.user[0].id][parentProAsNotifId];
					if( Object.entries(this.postNotifications[this.user[0].id]).length === 0) {
						delete this.postNotifications[this.user[0].id];
					}
					localStorage.setItem('notifications', JSON.stringify(this.postNotifications));
					if( Object.entries(this.postNotifications).length === 0) {
						localStorage.removeItem('notifications');
						this.userPostNotifs = null;
					}
				} else if(parentProAsNotifId === null)  {
					delete this.subscriptionNotifications[this.user[0].id][subscribedUserId];
					if( Object.entries(this.subscriptionNotifications[this.user[0].id]).length === 0) {
						delete this.subscriptionNotifications[this.user[0].id];
					}
					localStorage.setItem('newSubscribedUsers', JSON.stringify(this.subscriptionNotifications));
					if( Object.entries(this.subscriptionNotifications).length === 0) {
						localStorage.removeItem('newSubscribedUsers');
						this.userSubscribersNotifs = null;
					}
				}

				this.findCurrentUserNotif();	
				setTimeout(() => {
					this.alertMsg = 'Notifiction has been deleted';
				}, 800);
				setTimeout(() => {
					this.alertMsg = null;
				}, 4000);			
			},
			removeAllNotifs() {
				if(this.postNotifications != undefined) {
					delete this.postNotifications[this.user[0].id];
					localStorage.setItem('notifications', JSON.stringify(this.subscriptionNotifications));
					if( Object.entries(this.postNotifications).length === 0) {
						localStorage.removeItem('notifications');
					}
					this.userPostNotifs = null;
				}
				
				if(this.subscriptionNotifications != undefined) {
					delete this.subscriptionNotifications[this.user[0].id];
					localStorage.setItem('newSubscribedUsers', JSON.stringify(this.subscriptionNotifications));
					if( Object.entries(this.subscriptionNotifications).length === 0) {
						localStorage.removeItem('newSubscribedUsers');
					}
					this.userSubscribersNotifs = null;
				}

				setTimeout(() => {
					this.alertMsg = 'All your notifictions have been deleted';
				}, 800);
				setTimeout(() => {
					this.alertMsg = null;
				}, 4000);	
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';

	.notif-wrapper {
		margin-top: 3rem;
		padding: 3rem;
		width: auto;
		border-radius: 15px;
		border: .1px solid black;
		text-align: center;

		.notif-message-group {
			@include flexbox(space-evenly);
			gap: 10px;
			
			p {
				width: 50%;
				padding:  .3rem  .7rem;
				color: #fff;
				border-radius: 15px;
				background-color: rgb($primary_color, 0.7);
				align-self:auto;
				cursor: pointer;
			}
		}

		button {
			
			padding: .2rem .4rem;
			border-radius: 3px;
			border: 1px solid $secondary_color;
			cursor: pointer;
			background-color: lighten($secondary_color, 20);
			position: relative;

			small {
				visibility: hidden;
				width: 60px;
				position: absolute;
				top: 0;
				left: 35px;
				
			}

			&:hover small {
				visibility: visible;
				transition: visibility 2s .3s;
			}
		}

		.btn-remove-all {
			margin-top: 3rem;
			padding: .4rem .6rem;
			color: #fff;
			font-size: 1rem;
			background-color: lighten($secondary_color, 0);
			border-radius: 7px;
		}

		@media screen and (max-width: 992px) {
			margin: 1rem;
		}

		@media screen and (max-width: 576px) {
			padding: .7rem;
			border: none;
			.notif-message-group {
				p {
					width: 75%;
				}

				small {
					display: none;
				}
			}
		}
	}
	.zero-notification {
		margin: 0 auto;
		width:fit-content;
		
		p {
			margin: .5rem;
			padding: .4rem 2rem ;
			font-size: 1.5rem;
			color: #fff;
			background-color: $secondary_color;
			border-radius: 15px;
		}
	}
	
</style>