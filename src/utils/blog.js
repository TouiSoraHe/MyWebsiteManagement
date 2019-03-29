export function getBlog(blog) {
  let BlogKey = 'blog-'
  if (blog) {
    if (blog.id) {
      BlogKey += blog.id
    } else {
      BlogKey += 'new'
    }
    const blogJson = localStorage.getItem(BlogKey)
    if (blogJson) {
      return JSON.parse(blogJson)
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

export function setBlog(blog) {
  let BlogKey = 'blog-'
  if (blog) {
    if (blog.id) {
      BlogKey += blog.id
    } else {
      BlogKey += 'new'
    }
    return localStorage.setItem(BlogKey, JSON.stringify(blog))
  } else {
    return undefined
  }
}

export function removeBlog(blog) {
  let BlogKey = 'blog-'
  if (blog) {
    if (blog.id) {
      BlogKey += blog.id
    } else {
      BlogKey += 'new'
    }
    return localStorage.removeItem(BlogKey)
  } else {
    return undefined
  }
}
