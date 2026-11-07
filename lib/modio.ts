// Skater XL maps published on mod.io. The API route only serves stats for mods listed here.
export interface ModIoMod {
  id: number;
  url: string;
}

export const griffinBowlMod: ModIoMod = { id: 471771, url: 'https://mod.io/g/skaterxl/m/griffin-bowl-north-vancouver' };
export const seylynnBowlMod: ModIoMod = { id: 849463, url: 'https://mod.io/g/skaterxl/m/seylynn-bowl' };
export const thePoolMod: ModIoMod = { id: 177122, url: 'https://mod.io/g/skaterxl/m/the-pool' };

export const modIoMods = [griffinBowlMod, seylynnBowlMod, thePoolMod];
