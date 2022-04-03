import { Endpoint, Body, ProjectInfo, Config, Module } from '../gomarvin/interfaces'
import {
  HttpMethods,
  BodyFieldTypes,
  Frameworks,
  DbTypes,
  latest_gomarvin_version,
  latest_go_version,
} from '../gomarvin/predefined'

export const init_endpoint_fields: Endpoint = {
  url: '/',
  method: HttpMethods.GET,
  controller_name: 'ControllerName',
  url_params: [],
  body: [],
}

export const init_body_fields: Body = {
  field: '',
  type: BodyFieldTypes.STRING,
  validate: 'required',
}

export const init_project_info: ProjectInfo = {
  go_version: 1.17,
  name: 'my_server',
  framework: Frameworks.gin,
  port: 4444,
  api_prefix: '/api/v1',
  config_version: 0.1,
  db_type: DbTypes.Postgres,
  include_sql: false,
  include_ts_fetch: false,
  gomarvin_version: latest_gomarvin_version,
}

export const init_module: Module = {
  name: 'User',
  endpoints: [
    {
      url: '/user',
      method: 'GET',
      controller_name: 'GetUsers',
      url_params: [],
      body: [],
    },
    {
      url: '/user/register',
      method: 'POST',
      controller_name: 'CreateUser',
      url_params: [],
      body: [
        {
          validate: 'required,min=2,max=140',
          field: 'username',
          type: 'string',
        },
        {
          validate: 'required,email',
          field: 'email',
          type: 'string',
        },
        {
          validate: 'required',
          field: 'age',
          type: 'int',
        },
        {
          validate: 'required,min=10,max=300',
          field: 'password',
          type: 'string',
        },
      ],
    },
    {
      url: '/user',
      method: 'GET',
      controller_name: 'GetUser',
      url_params: [
        {
          field: 'user_id',
          type: 'int',
        },
      ],
      body: [],
    },
  ],
}
export const init_project: Config = {
  project_info: init_project_info,
  modules: [init_module],
}
