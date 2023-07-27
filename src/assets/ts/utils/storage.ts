import { init_project, init_client } from '../editor/init';

// @ts-ignore
// import public_config from '../../../../public/gomarvin.json';

export const localStorageCongigKey = 'gomarvin';
export const localStorageClientKey = 'client';
export const json_config_name = 'gomarvin.json';

export function saveConfigToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value));
}
/** If localstorage key exists, return true. */
export function localStorageConfigExists(key_name: string): boolean {
  let config_key = localStorage.getItem(key_name);

  if (config_key) {
    return true;
  } else return false;
}

export function LocalStorageConfig(key: string) {
  return localStorage.getItem(key);
}

/*
 * Pass down data and save it as json
 * https://stackoverflow.com/questions/28464449/how-to-save-json-data-locally-on-the-machine
 */
export function saveDataToJsonFile(data: any) {
  let content = JSON.stringify(data, undefined, 2);
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  a.setAttribute('download', json_config_name);
  a.click();
}

export function parseConfig(x: any) {
  return JSON.parse(x);
}

/**
 * function that checks for thing onMount only
 * - if config exists in local storage, return it
 * - if it does not exist in local storage, return a predefined project
 */
export function getConfig() {
  if (localStorageConfigExists(localStorageCongigKey)) {
    return parseConfig(LocalStorageConfig(localStorageCongigKey));
  } else {
    return init_project;
  }
}

export async function getConfigFile() {
  // const response = await fetch('/gomarvin.json');
  // if (response.status === 200) {
  //   if (localStorageConfigExists(localStorageCongigKey)) {
  //     console.log('config from local storage');
  //     return parseConfig(LocalStorageConfig(localStorageCongigKey));
  //   } else {
  //     console.log('using predefined config');
  //     return init_project;
  //   }
  // } else {
  //   console.log('using config from the public folder');
  //   const data = await response.json();
  //   return data;
  // }
  if (localStorageConfigExists(localStorageCongigKey)) {
    console.log('config from local storage');
    return parseConfig(LocalStorageConfig(localStorageCongigKey));
  } else {
    console.log('using predefined config');
    return init_project;
  }
}

export function getClient() {
  if (localStorageConfigExists(localStorageClientKey)) {
    return parseConfig(LocalStorageConfig(localStorageClientKey));
  } else {
    return init_client;
  }
}

// 
// 