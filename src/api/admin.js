import request from '@/utils/request';

export function adminLogin(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data,
  });
}

export function getAllMerchants() {
  return request({
    url: '/admin/getAllMerchants',
    method: 'get',
  });
}

export function passMerchant(data) {
  return request({
    url: '/admin/passMerchant',
    method: 'post',
    data,
  });
}

export function adminForm(params) {
  return request({
    url: '/merchants/admin/form',
    method: 'get',
    params,
  });
}
export function adminFormExport() {
  return request({
    url: '/merchants/admin/export',
    method: 'get',
  });
}
export function merchantsForm(params) {
  return request({
    url: '/merchants/form',
    method: 'get',
    params
  });
}
export function adminChart(data) {
  return request({
    url: '/admin/chart',
    method: 'post',
    data
  });
}
