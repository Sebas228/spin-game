import Dexie, { type Table } from 'dexie';

export interface Group {
  id?: number;
  name: string;
  createdAt: string;
  template?: Template;
}

export interface Template {
  id: number;
  title: string;
};

export interface Participant {
  id?: number;
  groupId: number;
  name: string;
  spins: number;
  exclude: boolean;
}

const dbName = 'roulette';

export class Database extends Dexie {

  groups!: Table<Group>;
  participants!: Table<Participant>;

  constructor() {
    super(dbName);
    this.version(2).stores({
      groups: '++id, name, createdAt',
      participants: '++id, groupId, name, spins, exclude'
    });
  }
}

export const db = new Database();