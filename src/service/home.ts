import http from '@/utils/http'
import type { CommInfo, NewsResult } from '@/types/home'

// 轮播图news列表
export type NewsList = Pick<NewsResult, 'id' | 'title' | 'imgUrl'>
export const getNewsCarouselAPI = () => {
  return http.get<NewsList[]>('/api/news_carousel')
}
// news详情
// Omit< Type_name,'property1'|'property2'>
export type NewsDetail = Omit<NewsResult, 'imgUrl'>
export const getNewsDetailAPI = (id: string) => {
  return http.request<NewsDetail>({
    // url:'/api/news_detail?id='+id,  // 2种传参都可以
    url: '/api/news_detail?id=',
    data: {
      id
    }
  })
}

// 社区列表
export type CommItem = {
  id: string
  name: string
  code: string
}
export const getCommListAPI = () => {
  return http.get<CommItem[]>('/api/community_list')
}

// 社区信息
export const getCommInfoAPI = (id: number) => {
  return http.get<CommInfo>('/api/community_info', { id })
}