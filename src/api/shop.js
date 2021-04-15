import request from '@/utils/request'

export function getList(mid,currentPage,pageSize) {
  return request({
    url: `/good/merchantsGoodsPage?mid=${mid}&currentPage=${currentPage}&pageSize=${pageSize}`,
    method: 'get',
  })
}
export function changeSpu(data) {
  return request({
    url: '/good/changeSpu',
    method: 'post',
    data,
  });
}

export function changeSku(data) {
  return request({
    url: '/good/changeSku',
    method: 'post',
    data,
  });
}
export function updateSku(data) {
  return request({
    url: '/good/updateSku',
    method: 'post',
    data,
  });
}
export function register(data) {
  return request({
    url: '/merchants/register',
    method: 'post',
    data,
  });
}
export function batchDeletion(data) {
  return request({
    url: '/merchants/batchDelete',
    method: 'post',
    data,
  });
}
