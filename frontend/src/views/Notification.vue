<template>
      <div id="notification">
            <Header />
		 <h1>Notifications</h1>
            <main class="notif-wrapper" v-if="userNotifs !== null">
			<div class="notif-message-group"  v-for="(value, property, index) in userNotifs" :key="index">
					<p>{{ value }}</p>
					<button>
						<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
						<small>Remove it</small>
					</button>
			</div>
			<button class="btn-remove-all">Remove them all</button>
            </main>
		<div class="zero-notification" v-else>
			<p>Your have no recent notifications!</p>
		</div>
      </div>
</template>

<script>
	import Header from '../components/Header.vue';

	import { mapState } from 'vuex';

	export default {
		name: 'Notification',
		components: {
			Header,
		},
		data() {
			return {
				userNotifs: null,
			}
		},
		mounted() {
			this.$store.dispatch('getOneUser');
			const user = JSON.parse(localStorage.getItem('user'));
			const notifications = JSON.parse(localStorage.getItem('notifications'))
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
			setTimeout(() =>{
				this.findCurrentUserNotif(notifications);
				// console.log(notifications)
			}, 100)
		},
		computed: {
			...mapState(['user', 'primaryColor', 'secondaryColor']),
		},
		methods: {
			findCurrentUserNotif(notifications) {
				
				for(let acualUser in notifications) {
					if(acualUser == this.user[0].id) {
						this.userNotifs = notifications[acualUser]
					}
				}
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