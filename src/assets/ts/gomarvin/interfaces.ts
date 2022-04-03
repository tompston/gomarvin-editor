// https://transform.tools/json-to-typescript

export interface Config {
    project_info: ProjectInfo
    modules: Module[]
}

export interface ProjectInfo {
    go_version: number
    name: string
    framework: string
    port: number
    api_prefix: string
    config_version: number
    db_type: string
    include_sql: boolean
    include_ts_fetch: boolean
    gomarvin_version: string
}

export interface Module {
    name: string
    endpoints: Endpoint[]
}

export interface Endpoint {
    url: string
    method: string
    controller_name: string
    url_params: UrlParam[]
    body: Body[]
}

export interface UrlParam {
    field: string
    type: string
}

export interface Body {
    field: string
    type: string
    validate: string
}
