import { randomUUID } from 'node:crypto';

export class Card {
  readonly id: string;
  name: string;
  imageUrl: string;
  rarity: string;

  constructor() {
    this.id = randomUUID();
  }
}
