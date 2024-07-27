import type { VisitForm } from "@/types/details";
import http from "@/utils/http";

// 更新入户信息
export const updateVisitNoteAPI = (data : VisitForm & { id ?: number, comm_num : number | string }) => {
	return http.post('/api/update_visit', data)
}