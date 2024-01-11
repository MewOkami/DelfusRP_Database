import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;
  year: string;
  sex: string;
  nick: string;
  race: string;
  yearPlayer: string;
  sexPlayer: string;
  lorePlayer: string;
  adm: boolean;
  readonly createAt: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.createAt = new Date();
  }
}
