import http from "@/utils/http";

export const testAPI = () => {
  return http.request({
    url: '/api/abstracts',
    method: 'GET',
  })
}