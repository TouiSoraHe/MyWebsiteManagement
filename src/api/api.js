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

export function getBlogInfosById(blogInfoIds) {
  let first = true
  let parametersString = ''
  blogInfoIds.forEach((id) => {
    if (!first) {
      parametersString += '&'
    }
    parametersString += 'id=' + id
    if (first) {
      first = false
    }
  })
  return request({
    url: '/api/blog-info?' + parametersString,
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

export function deleteBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'delete'
  })
}

export function getTags() {
  return request({
    url: '/api/tag',
    method: 'get'
  })
}

export function getTag(id) {
  return request({
    url: '/api/tag/' + id,
    method: 'get'
  })
}

export function updateTag(tag) {
  return request({
    url: '/api/tag/' + tag.id,
    method: 'put',
    data: tag
  })
}

export function addTag(tag) {
  return request({
    url: '/api/tag',
    method: 'post',
    data: tag
  })
}

export function deleteTag(id) {
  return request({
    url: '/api/tag/' + id,
    method: 'delete'
  })
}

export function getExceptionInfos() {
  return request({
    url: '/api/exception-info',
    method: 'get'
  })
}

export function deleteExceptionInfo(id) {
  return request({
    url: '/api/exception-info/' + id,
    method: 'delete'
  })
}

export function getExceptionInfo(id) {
  return request({
    url: '/api/exception-info/' + id,
    method: 'get'
  })
}
