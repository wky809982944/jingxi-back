import request from '@/utils/request'

export function getAllCate(params) {
  return request({
    url: 'http://localhost:9000/cate/getAllCate',
    method: 'post',
  })
}
export function addGood(data) {
  return request({
    url: '/good/addGood',
    method: 'post',
    data,
  });
}
