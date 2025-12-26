<script setup lang="ts">
	import {
		User,
		Guitar,
		MicVocal,
		Coffee,
		SquareParking,
	} from 'lucide-vue-next';
</script>

<template>
	<li class="room-card">
		<div class="room-card__image">
			<img src="/images/rooms/room_01.jpg" />
		</div>
		<div class="room-card__content details">
			<div
				class="details__header flex items-center justify-between mb-[15px]"
			>
				<p class="room-card__title font-extrabold text-[24px]">
					Новая комната
				</p>
				<div
					class="details__persons flex items-center gap-[5px] p-[7px] rounded-[12px] border border-[#C0C2D7]"
				>
					<User :size="20" />
					<span>до</span>
					<span>10</span>
				</div>
			</div>
			<div class="room-card__body flex justify-between items-start">
				<ul class="details__list">
					<li class="details__list-item detail-item gap-[12px]">
						<Guitar color="#F4683F" />
						<span>Музыкальные инструменты (12)</span>
					</li>
					<li class="details__list-item detail-item gap-[12px]">
						<MicVocal color="#F4683F" />
						<span>Микрофоны (5)</span>
					</li>
					<li class="details__list-item detail-item gap-[12px]">
						<Coffee color="#F4683F" />
						<span>Бесплатный кофе</span>
					</li>
					<li class="details__list-item detail-item gap-[12px]">
						<SquareParking color="#F4683F" />
						<span>Парковочные места (4)</span>
					</li>
				</ul>
				<div
					class="details__decor"
					aria-hidden="true"
				></div>
				<div class="details__price-block">
					<div class="flex flex-col gap-[2px]">
						<span
							class="block text-[#727488] text-[14px] font-semibold"
							>Будни</span
						>
						<span
							class="block text-[#333333] text-[18px] font-semibold"
							>от 8000 ₽</span
						>
					</div>
					<div class="flex flex-col gap-[2px]">
						<span
							class="block text-[#727488] text-[14px] font-semibold"
							>Пятница</span
						>
						<span
							class="block text-[#333333] text-[18px] font-semibold"
							>от 10000 ₽</span
						>
					</div>
					<div class="flex flex-col gap-[2px]">
						<span
							class="block text-[#727488] text-[14px] font-semibold"
							>Суббота</span
						>
						<span
							class="block text-[#333333] text-[18px] font-semibold"
							>от 12000 ₽</span
						>
					</div>
					<div class="flex flex-col gap-[2px]">
						<span
							class="block text-[#727488] text-[14px] font-semibold"
							>Воскресенье</span
						>
						<span
							class="block text-[#333333] text-[18px] font-semibold"
							>от 12000 ₽</span
						>
					</div>
				</div>
			</div>
			<div class="room-card__footer">
				<router-link
					to="/"
					class="text-[#F4683F] text-[14px] font-semibold]"
					>Подробнее</router-link
				>
			</div>
		</div>
	</li>
</template>

<style lang="scss" scoped>
	.room-card {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 4px 80px 0 rgba(5, 9, 22, 0.08);

		&__image {
			width: 100%;
			height: 240px;
			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		&__content {
			padding: 20px;
			flex: 1;
			display: grid;
			grid-template-rows: max-content auto auto;
			row-gap: 20px;
		}
		&__body {
			display: flex;
			flex-direction: column;
			row-gap: 20px;
		}
		&__footer {
			display: flex;
			justify-content: end;
			align-items: end;
		}
	}
	.details {
		&__list {
			display: flex;
			flex-direction: column;
			row-gap: 8px;
			&-item {
				display: flex;
			}
		}
		&__decor {
			width: 100%;
			height: 2px;
			background-color: #eaeaeb;
		}
		&__price-block {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
			row-gap: 20px;
			column-gap: 44px;
		}
	}
</style>
