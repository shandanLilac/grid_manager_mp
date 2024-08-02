import { nameReg } from "@/pages/handle-info/components/form Rules"
import type { FormRules } from "@tuniao/tnui-vue3-uniapp"

const validateType = (rule: any, val: any, cb: any) => {
  if (!['走访', '电话', '其他'].includes(val)) return cb(new Error('入户方式错误'))
  cb()
}
export const formRules: FormRules = {
  mainName: [
    { required: true, message: '入户人不能为空', trigger: 'blur' },
    { pattern: nameReg, message: '姓名不正确', trigger: 'blur' }
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
    { type: 'string', min: 2, max: 200, message: '记录内容为2-200个字符', trigger: 'blur' }
  ]
}