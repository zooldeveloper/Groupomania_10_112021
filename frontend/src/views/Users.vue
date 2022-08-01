<!-- @format -->

<template>
	<div id="users">
		<Header />
		<main>
			<h1>Utilisateurs</h1>
			<div class="users-container">
				<div
					v-for="user in users"
					:key="user.id"
					class="user-cart">
					<a href="">
						<div class="user-details">
							<img
								:src="
									user.imageUrl != null
										? user.imageUrl
										: require('../assets/images/user-icon.png')
								"
								alt=""
							/>
							<div class="personal-info">
								<h2>
									{{ user.firstName }}
									{{ user.lastName }}
								</h2>
								<p>{{ user.jobTitle }}</p>
								<div class="subscribers-number">
									<font-awesome-icon
										icon="users"
										color="#2b7b85"
										size="sm"
									/>
									<small>3</small>
								</div>
							</div>
						</div>
					</a>
					<div class="add-freind">
						<button>
                                          <font-awesome-icon
							icon="user-plus"
							color="#F08E8A"
							size="lg"
						/>
                                    </button>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import Header from '../components/Header.vue';
	import { mapState } from 'vuex';

	export default {
		name: 'Users',
		components: {
			Header,
		},
		mounted() {
			this.$store.dispatch('getAllUsers');
		},
		computed: {
			...mapState(['users']),
		},
		methods: {},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/mixins.scss';
	@import '@/assets/sass/variables.scss';

	main {
		margin-top: 7rem;
		max-width: 1000px !important;
		.users-container {
			@include flexbox();
			flex-wrap: wrap;
			margin-top: 3rem;
			width: 100%;
			height: auto;
                  a {
                        text-decoration: none;
                        color: black;
                  }
			.user-cart {
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
			.add-freind {
                        button {
                              border: none;
                              background: none;
                              cursor:pointer;
                        }
			}
		}
	}
</style>
