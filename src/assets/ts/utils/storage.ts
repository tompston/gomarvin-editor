import { init_project, init_client } from '../editor/init';

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

/** Fetch the gomarin config file that is
 * in the same dir that holds index.html.
 * If it does not exist, return false.
 */
export async function fetchPublicConfig() {
  const res = await fetch('/gomarvin.json');
  return res;
}

export async function publicConfigExists(): Promise<boolean> {
  let res = await fetchPublicConfig();
  if (res.ok) {
    return true;
  }
  return false;
}

/** function that checks for thing onMount only
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

export function getClient() {
  if (localStorageConfigExists(localStorageClientKey)) {
    return parseConfig(LocalStorageConfig(localStorageClientKey));
  } else {
    return init_client;
  }
}
