import type { FormRules } from "@tuniao/tnui-vue3-uniapp"

const nameReg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
const validateType = (rule: any, val: any, cb: any) => {
  if (!['走访', '电话', '其他'].includes(val)) return cb(new Error('入户方式错误'))
  cb()
}
export const formRules: FormRules = {
  mainName: [
    { required: true, message: '入户人不宜为空', trigger: 'blur' },
    { pattern: nameReg, message: '入户人姓名不正确', trigger: 'blur' }
  ],
  type: [
    { validator: validateType, trigger: 'blur' }
  ],
  isSingle: [
    { type: 'boolean', message: '是否单人不正确', trigger: 'blur' }
  ],
  subName: [
    { pattern: nameReg, message: '姓名不正确', trigger: 'blur' }
  ],
  note: [
    { required: true, message: '记录不宜为空', trigger: 'blur' },
    { min: 2, max: 200, message: '字数在1-200之间', trigger: 'blur' }
  ]
}