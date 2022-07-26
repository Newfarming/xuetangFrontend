import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getXuetangDetails(params) {
  // params.token = getToken()
  return request({
    url: '/dongtaixuetang_query',
    method: 'get',
    params
  })
}

export function getUserlists(params) {
  // params.token = getToken()
  return request({
    url: '/dongtaixuetanguser_query',
    method: 'get',
    params
  })
}
