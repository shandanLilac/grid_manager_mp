import { eduArr, householdArr, marriageArr, nationArr, politicalArr, religionArr, tagsArr } from "@/static/config/data";
import type { FormRules } from "@tuniao/tnui-vue3-uniapp";


export const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
const validateHouseholder = (rule: any, value: any, cb: any) => {
  if (!householdArr.includes(value) && value !== '请选择')
    return cb(new Error('与户主关系不正确'))
  cb()
}
const validateNationality = (rule: any, value: any, cb: any) => {
  if (!nationArr.includes(value) && value !== '请选择')
    return cb(new Error('民族不正确'))
  cb()
}
const idcardReg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
const validatePolitical = (rule: any, value: any, cb: any) => {
  const mapArr = politicalArr.map(x => x.label)
  if (!mapArr.includes(value) && value !== '')
    return cb(new Error('政治面貌不正确'))
  cb()
}
const validateResidence_type = (rule: any, value: any, cb: any) => {
  if (!['城镇', '农村'].includes(value) && value !== '')
    return cb(new Error('户籍性质不正确'))
  cb()
}
const phoneReg = /(^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$)|(^(?:(?:\+|00)86)?1[3-9]\d{9}$)/
const validateMarriage = (rule: any, value: any, cb: any) => {
  if (!marriageArr.includes(value) && value !== '')
    return cb(new Error('婚姻状况不正确'))
  cb()
}
const validateEdu = (rule: any, value: any, cb: any) => {
  if (!eduArr.includes(value) && value !== '请选择')
    return cb(new Error('学历不正确'))
  cb()
}
const validateReligion = (rule: any, value: any, cb: any) => {
  if (!religionArr.includes(value) && value !== '请选择')
    return cb(new Error('宗教信仰不正确'))
  cb()
}
const validateTags = (rule: any, value: string[], cb: any) => {
  if (!Array.isArray(value))
    return cb(new Error('程序出错，请联系管理员'))
  value.forEach(x => {
    if (!tagsArr.includes(x)) return cb(new Error('同学家庭选择错误'))
  })
  cb()
}

export const formRules: FormRules = {
  name: [
    { required: true, message: '姓名不能为空', trigger: ['change', 'blur'] },
    { pattern: nameReg, message: '姓名不正确', trigger: ['blur'] }
  ],
  nationality: [
    { validator: validateNationality, trigger: ['change', 'blur'] }
  ],
  householder: [
    { validator: validateHouseholder, trigger: ['change', 'blur'] }
  ],
  id_card: [
    { required: true, message: '这位同事，身份证号得填呀！', trigger: ['change', 'blur'] },
    { pattern: idcardReg, message: '这位同事，你填的不对鸭！', trigger: ['blur'] }
  ],
  political_type: [
    { validator: validatePolitical, trigger: ['change', 'blur'] }
  ],
  residence_type: [{ validator: validateResidence_type, trigger: ['change', 'blur'] }],
  residence_address: [
    { pattern: /^[\S]{1,32}$/, message: '户籍地址不正确', trigger: ['blur'] }
  ],
  phone: [
    { pattern: phoneReg, message: '联系电话不正确,座机请参考0936-2727733', trigger: ['blur'] }
  ],
  doing: [
    { pattern: /^[\S]{1,24}$/, message: '不能多于24个字符', trigger: ['blur'] }
  ],
  marriage: [
    { validator: validateMarriage, trigger: ['change', 'blur'] }
  ],
  education: [
    { validator: validateEdu, trigger: ['change', 'blur'] }
  ],
  health: [
    { pattern: /^[\S]{1,24}$/, message: '不能多于24个字符', trigger: ['blur'] }
  ],
  religion: [
    { validator: validateReligion, trigger: ['change', 'blur'] }
  ],
  tag: [
    { validator: validateTags, trigger: ['change', 'blur'] }
  ]
}