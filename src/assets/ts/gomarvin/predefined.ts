export const DbTypes = {
    Postgres: 'postgres',
    Mysql: 'mysql',
    Sqlite: 'sqlite',
}

export const UrlFieldTypes = {
    STRING: 'string',
    INT: 'int',
}

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
    BOOLEAN: 'bool',
    UINT: 'uint',
    UINT64: 'uint64',
    UINT32: 'uint32',
    UINT16: 'uint16',
    UINT8: 'uint8',
}

export const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export const Frameworks = {
    gin: 'gin',
    fiber: 'fiber',
    echo: 'echo',
    chi: 'chi',
}

/** Not tested locally. Don't know if there will be erros with some older go versions */
export const GoVersions = [1.15, 1.16, 1.17, 1.18]
export const GomarvinVersions = ['v0.1.0', 'v0.2.0', 'v0.3.0']

// test if this works
export const latest_gomarvin_version = GomarvinVersions[GomarvinVersions.length - 1]
export const latest_go_version = GoVersions[GoVersions.length - 1]

// --------------- Not Used in Config
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
}
