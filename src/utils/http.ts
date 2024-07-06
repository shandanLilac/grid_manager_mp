import { baseURL} from "@/static/config/global";
import { useMemStore } from "@/store";

// 拦截器
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('https')) {
      options.url = baseURL + options.url
    }
    options.timeout = 10000
    // 在options.header={}中添加小程序端请求标识（不需要）
    const memStore = useMemStore()
    const token = memStore.profile?.token || ''
    if (token) options.header.Authorization = token
  }
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// uni.request()封装
type Data<T> = {
  code: number
  msg: string
  result: T
}
type DataInReqOptions = string | AnyObject | ArrayBuffer;
class HttpRequest {
  constructor() { }
  // loading (5/5)
  // 定义存储请求标识的空数组：loading:(1/5)
  queue: 'request'[] = []
  timerId: any = void 0
  request<T>(options: UniApp.RequestOptions) {
    // console.log(1, this.queue)
    // 清除上一个请求的hideLoading()：loading(5/5)
    this.timerId && clearTimeout(this.timerId)
    // 请求发送之前展示loading：loading(2/5)
    this.queue.length === 0 && uni.showLoading()
    this.queue.push('request')
    // console.log(2, this.queue)

    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data as Data<T>)
          } else if (res.statusCode === 401) {
            const memStore = useMemStore()
            memStore.clearProfile()

            uni.navigateTo({ url: '/pages/login/login' })
            reject(res)
          } else {
            uni.showToast({
              icon: 'none',
              title: (res.data as Data<T>).msg || '请求错误'
            })
            reject(res)
          }
        },
        fail: (err) => {
          uni.showToast({
            icon: 'error',
            title: '网络错误，换个网络试试'
          })
        },
        complete: () => {
          // 每次请求结束后，都从queue中删除一个标识，当数组为空，隐藏：loading(3/5)
          this.queue.pop()
          this.queue.length === 0 && this.queue.push('request')
          // console.log(3, this.queue)
          // 定义一个宏任务，解决2个请求依次执行时loading闪烁：loading(4/5)
          this.timerId = setTimeout(() => {
            this.queue.pop()
            this.queue.length === 0 && uni.hideLoading()
            // console.log(4, this.queue)
            clearTimeout(this.timerId)
          }, 1)
        }
      })
    })
  }
  // 封装快捷方法
  get<T>(url: string, data: DataInReqOptions = {}) {
    return this.request<T>({ url, data, method: 'GET' })
  }
  post<T>(url: string, data: DataInReqOptions = {}) {
    return this.request<T>({ url, data, method: 'POST' })
  }
}

export default new HttpRequest()