import { nanoid } from 'nanoid';

export function generateId(digits: number): string {
	return nanoid(digits);
}
