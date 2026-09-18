import * as migration_20260918_184656_initial from './20260918_184656_initial';

export const migrations = [
  {
    up: migration_20260918_184656_initial.up,
    down: migration_20260918_184656_initial.down,
    name: '20260918_184656_initial'
  },
];
