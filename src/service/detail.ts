import type { VisitForm, VisitItem } from "@/types/details";
import type { ResidentItem } from "@/types/home";
import http from "@/utils/http";

// 更新入户信息
export const updateVisitNoteAPI = (data: VisitItem) => {
	return http.post('/api/update_visit', data)
}

// 编辑居民信息，先获取居民信息
export const getTheResidentInfoAPI = (id?: string, comm_num?: string) => {
	return http.get<ResidentItem>(`/api/resident_info?id=${id}&comm_num=${comm_num}`)
}
// 编辑居民信息-编辑
export const updateInfoAPI = (data: object) => {
	return http.post('/api/update_info', data)
}
// 户内新增人口
export const createMemberAPI = (data: object) => {
	return http.post('/api/create_member', data)
}
// // 删除一条居民信息
export const dropItemAPI = (id: number, comm_num: number | string) => {
	return http.request({
		url: '/api/drop_item',
		method: 'DELETE',
		data: {
			id,
			comm_num
		}
	})
}
