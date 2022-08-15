<template>
      <div id="notification">
            <Header />
		 <h1>Notifications</h1>
            <main class="notif-wrapper">
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<div class="notif-message-group">
				<p>Nadir has reacted to your post !</p>
				<button>
					<font-awesome-icon icon="trash-alt" :color="secondaryColor" size="lg"/>
					<small>Remove it</small>
				</button>
			</div>
			<button class="btn-remove-all">Remove them all</button>
            </main>
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
		mounted() {
			const user = JSON.parse(localStorage.getItem('user'));
			if (!user) {
				this.$router.push({ name: 'Entry' });
			}
		},
		computed: {
			...mapState(['primaryColor', 'secondaryColor']),
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
			@include flexbox();
			gap: 80px;
			
		p {
			padding:  .3rem  .7rem;
			color: #fff;
			border-radius: 15px;
			background-color: rgb($primary_color, 0.7);
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
			margin: 3rem;
		}

		@media screen and (max-width: 576px) {
			padding: .7rem;
			border: none;
			.notif-message-group {
				gap: 20px;

				small {
					display: none;
				}
			}
		}
	}
	
</style>