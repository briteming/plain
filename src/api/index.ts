import { fetchWithToken } from '../utils/fetch'
import { formatPost } from '../utils/format'

const GH_API = 'https://api.github.com'
const USERNAME: string = import.meta.env.V_USERNAME
const REPO: string = import.meta.env.V_REPOSITORY
const FR_REPO: string = import.meta.env.V_FRIENDS_REPO
if (!USERNAME || !REPO || !FR_REPO)
  throw new Error('V_USERNAME, V_REPOSITORY, V_FRIENDS_REPO must be set')

// API 链接拼接
const BLOG_PREFIX = `${GH_API}/repos/${USERNAME}/${REPO}`
// const FR_PREFIX = `${GH_API}/repos/${USERNAME}/${FR_REPO}`

/*
 * 获取博客列表
 * */
export async function getPosts({ page = 1, pageSize = 12 }) {
  const res = await fetchWithToken(`${BLOG_PREFIX}/issues?state=open&page=${page}&per_page=${pageSize}`)
  return res.map(formatPost)
}