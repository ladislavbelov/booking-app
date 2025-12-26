<script setup lang="ts">
	import Header from '@/components/layout/Header.vue';
	import Container from '@/components/layout/Container.vue';
	import SocialList from '@/components/Lists/SocialList/SocialList.vue';
	import Link from '@/components/ui/Link.vue';
</script>

<template>
	<div class="welcome-bg">
		<Header color-variant="colored" />
		<Container class="welcome-container">
			<div class="welcome flex flex-col gap-[30px] max-w-[50%]">
				<h1 class="welcome__title">
					Поиск и бронирование музыкальных площадок
				</h1>
				<p class="welcome__subtitle">
					Здесь
					<span>рождается</span> искусство, <span>музыка</span> и
					новые идеи.
				</p>
				<Link
					dest="/"
					link-text="Выбрать комнату"
				/>
				<SocialList />
			</div>
		</Container>
	</div>
</template>

<style lang="scss" scoped>
	.welcome-container {
		height: calc(100% - 100px);
		align-content: center;
	}
	.welcome-bg {
		background-image: url('/images/bg_04.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		z-index: 0;
		position: relative;
		height: 100vh;
		&:after {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			content: '';
			background: linear-gradient(
				90deg,
				#161623 0%,
				rgba(22, 22, 35, 0.91) 17.98%,
				rgba(22, 22, 35, 0.63) 38.73%,
				rgba(22, 22, 35, 0.26) 66.86%,
				#161623 100%
			);
			z-index: -1;
		}
	}
	.welcome {
		&__title {
			font-size: 60px;
			font-weight: 700;
			color: white;
		}
		&__subtitle {
			font-size: 25px;
			font-weight: 300;
			color: white;
			span {
				position: relative;
				color: var(--color-primary-orange);
				//&:after {
				//	position: absolute;
				//	content: '';
				//	bottom: -2px;
				//	left: 0;
				//	width: 100%;
				//	height: 2px;
				//	background-color: var(--color-primary-orange);
				//}
			}
		}
	}
</style>
