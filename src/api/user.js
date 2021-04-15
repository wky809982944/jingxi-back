import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/merchants/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/merchants/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/merchants/logout',
    method: 'post'
  })
}
