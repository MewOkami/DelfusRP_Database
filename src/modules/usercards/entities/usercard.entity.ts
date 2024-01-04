import { randomUUID } from 'crypto';

export class Usercard {
  readonly id: string;
  userId: string;
  cardId: string;

  constructor() {
    this.id = randomUUID();
  }
}
