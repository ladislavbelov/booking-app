import { LucideIcon } from 'lucide-vue-next';

export interface Room {
	id?: string;
	title: string;
	description: string;
	images: File[] | string[];
	ownerId?: string;
	maxGuests: number;
	advantages?: RoomAdvantage[];
	price: number;
	coverIndex?: number;
}

export interface RoomAdvantage {
	advantageIcon: LucideIcon;
	name: string;
}
// Тип для формы создания комнаты
export type RoomFormData = Omit<Room, 'id' | 'ownerId' | 'advantages'> & {
	advantages?: RoomAdvantage[];
};

// Тип для валидации формы
export interface RoomFormValues {
	title: string;
	description: string;
	maxGuests: number;
	price: number;
	images: File[];
}
