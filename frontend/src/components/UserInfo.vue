<!-- @format -->

<template>
	<div class="userpost__userinfo">
		<img
			class="userpost__userimage"
			:src="userImage"
			alt="Image de l'utilisateur"
		/>
		<div class="userpost__username-postdate">
			<h2>{{ firstName }} {{ lastName }}</h2>
			<small>Posted on {{ postDate }} </small>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		props: {
			userImage: {
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
		},
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/sass/variables.scss';
	@import '@/assets/sass/mixins.scss';
	.userpost {
		&__userinfo {
			@include flexbox(flex-start);
		}
		&__userimage {
			float: left;
			margin-right: 7px;
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}
		&__username-postdate {
			margin-left: 15px;
			h2 {
				margin: 0;
				width: auto;
				text-align: left;
			}
		}
	}
</style>
