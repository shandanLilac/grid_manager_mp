import http from "@/utils/http";

type BannerItem = {
  id: string
  imgUrl: string
  hrefUrl: string
  type: number
}

export const testAPI = (distributionCode?: number) => {
  return http.request<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionCode
    }
  })
}