import client from './client';

export const list = (query) => client.get(`list?${query}`);
export const read = (num) => client.get(`read/${num}`);
