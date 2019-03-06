import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function deleteTag(id) {
  return request({
    url: '/api/tag/' + id,
    method: 'delete'
  })
}
