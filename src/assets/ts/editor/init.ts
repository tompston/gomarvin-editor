import { Endpoint, Body, ProjectInfo, Config, Module } from '../gomarvin/interfaces'
import {
  HttpMethods,
  BodyFieldTypes,
  Frameworks,
  DbTypes,
  latest_gomarvin_version,
  latest_go_version,
  ResponseTypes
} from '../gomarvin/predefined'

export const init_endpoint_fields: Endpoint = {
  url: '/',
  method: HttpMethods.GET,
  response_type: ResponseTypes.default,
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
  framework: Frameworks.chi,
  port: 4444,
  api_prefix: '/api/v1',
  config_version: 0.1,
  db_type: DbTypes.Postgres,
  include_sql: false,
  include_fetch: false,
  gomarvin_version: latest_gomarvin_version,
}

export const init_module: Module = {
  name: 'User',
  endpoints: [
    {
      url: '/user',
      method: 'GET',
      response_type: ResponseTypes.with_pagination,
      controller_name: 'GetUsers',
      url_params: [],
      body: [],
    },
    {
      url: '/user/register',
      method: 'POST',
      response_type: ResponseTypes.default,
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
      response_type: ResponseTypes.default,
      controller_name: 'GetUser',
      url_params: [
        {
          field: 'id',
          type: 'string',
        },
      ],
      body: [],
    },
    {
      url: '/user',
      method: 'DELETE',
      response_type: ResponseTypes.default,
      controller_name: 'DeleteUser',
      url_params: [
        {
          field: 'id',
          type: 'string',
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
