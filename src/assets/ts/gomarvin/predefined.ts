export const DbTypes = {
  Postgres: 'postgres',
  Mysql: 'mysql',
  Sqlite: 'sqlite',
};

export const UrlFieldTypes = {
  STRING: 'string',
  INT: 'int',
};

export const BodyFieldTypes = {
  STRING: 'string',
  INT: 'int',
  INT64: 'int64',
  INT32: 'int32',
  INT16: 'int16',
  INT8: 'int8',
  FLOAT64: 'float64',
  FLOAT32: 'float32',
  TIME: 'time.Time',
  ANY: 'any',
  BOOLEAN: 'bool',
  UINT: 'uint',
  UINT64: 'uint64',
  UINT32: 'uint32',
  UINT16: 'uint16',
  UINT8: 'uint8',
};

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const Frameworks = {
  gin: 'gin',
  fiber: 'fiber',
  echo: 'echo',
  chi: 'chi',
};

export const ResponseTypes = {
  default: 'default',
  with_pagination: 'with_pagination',
};

/** Not tested locally. Don't know if there will be erros with some older go versions */
export const GoVersions = [1.15, 1.16, 1.17, 1.18, 1.19, 1.2];
export const GomarvinVersions = [
  'v0.1.x',
  'v0.2.x',
  'v0.3.x',
  'v0.4.x',
  'v0.5.x',
  'v0.6.x',
  'v0.7.x',
  'v0.8.x',
  'v0.9.x',
];
export const latest_gomarvin_version = GomarvinVersions[GomarvinVersions.length - 1];
export const latest_go_version = GoVersions[GoVersions.length - 1];

//  Not Used in Config
export const SETTINGS_TABS = {
  CURRENT_PROJECT_TAB: {
    id: 'CURRENT_PROJECT_TAB',
    label: 'Project',
  },
  NEW_PROJECT_TAB: {
    id: 'NEW_PROJECT_TAB',
    label: 'New Project',
  },
  IMPORT_CONFIG_TAB: {
    id: 'IMPORT_CONFIG_TAB',
    label: 'Import',
  },
  EXPORT_CONFIG_TAB: {
    id: 'EXPORT_CONFIG_TAB',
    label: 'Export',
  },
  CLIENT_CONFIG_TAB: {
    id: 'CLIENT_CONFIG_TAB',
    label: 'Client',
  },
};
