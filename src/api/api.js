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

export function getBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'get'
  })
}

export function getBlogInfos() {
  return request({
    url: '/api/blog-info',
    method: 'get'
  })
}

export function updateBlogInfo(bloginfo) {
  return request({
    url: '/api/blog-info/' + bloginfo.id,
    method: 'put',
    data: bloginfo
  })
}

export function addBlog(blog) {
  return request({
    url: '/api/blog',
    method: 'post',
    data: blog
  })
}

export function updateBlog(blog) {
  return request({
    url: '/api/blog/' + blog.id,
    method: 'put',
    data: blog
  })
}

export function getTags() {
  return request({
    url: '/api/tag',
    method: 'get'
  })
}

export function deleteTag(id) {
  return request({
    url: '/api/tag/' + id,
    method: 'delete'
  })
}
