<script setup lang=ts>
  import type { ResidentItem } from '@/types/home'
  import { ref } from 'vue'
  import { nationArr, householdArr, politicalArr, residenceArr, marriageArr, eduArr, religionArr } from '@/static/config/data';
  import { onReady } from '@dcloudio/uni-app'
  import type { TnFormInstance } from '@tuniao/tnui-vue3-uniapp';
  import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
  import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
  import TnRegionPicker from '@tuniao/tnui-vue3-uniapp/components/region-picker/src/region-picker.vue'
  import TnCheckbox from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox.vue'
  import TnCheckboxGroup from '@tuniao/tnui-vue3-uniapp/components/checkbox/src/checkbox-group.vue'
  import { formRules } from './form Rules';
  import { createMemberAPI, updateInfoAPI } from '@/service/detail'

  const props = defineProps<{
    params?: string
    room?: string
    memberInfo?: ResidentItem
    comm_num?: string | number
  }>()
  // 一、表单数据
  const formRef = ref<TnFormInstance>()  // 表单实例
  const formData = ref<ResidentItem>({})
  const _formData = ref<ResidentItem>({})
  // 数据-姓名
  // 遇到问题：v-modoel给输入框绑定数据，报错说不能使用 optional chaining assign,猜想到了上面的办法，但在input中又不显示，还得搞个响应式，索性用 :value=""+@change=""实现
  const onNameChange = (e: string) => {
    formData.value.name = e
  }
  // 数据-与户主关系
  const hOpen = ref(false)
  const onHHchange = (e: string) => {
    formData.value.householder = e
  }
  // 数据-民族
  const nOpen = ref(false)
  const onNationChange = (e: any) => {
    formData.value.nationality = e
  }
  // 数据-身份证号
  const onIdCardChange = (e: string) => {
    formData.value.id_card = e
  }
  // 数据-政治面貌
  const onPoliticalChange = (e: string) => {
    formData.value.political_type = e
  }
  // 数据-户籍性质
  const onResiTChange = (e: string) => {
    formData.value.residence_type = e
  }
  // 数据-户籍地址
  // 1.省市区
  const rOpen = ref(false)
  const regionVal = ref<string[]>(['甘肃省', '张掖市', '山丹县'])
  // _formData.value.region = ['甘肃省', '张掖市', '山丹县']
  // const onRegionChange = (e: string[]) => {
  //   _formData.value.region = e
  // }
  const onResiAChange = (e: string) => {
    formData.value.residence_address = e
  }
  // 数据-联系电话
  const onPhoneChange = (e: string) => {
    formData.value.phone = e
  }
  // 数据-职业
  const onDoingChange = (e: string) => {
    formData.value.doing = e
  }
  // 数据-婚姻状况
  const onMarriageChange = (e: string) => {
    formData.value.marriage = e
  }
  // 数据-学历
  const eOpen = ref(false)
  const onEduChange = (e: string) => {
    formData.value.education = e
  }
  // 数据-健康状况
  const onHealthChange = (e: string) => {
    formData.value.health = e
  }
  // 数据-宗教信仰
  // TODO:宗教信仰数据 2024-7-28
  const reOpen = ref(false)
  const onReligionChange = (e: string) => {
    formData.value.religion = e
  }
  // 数据-标签
  const onTagChange = (e: string[]) => {
    // tagVal.value = e
    formData.value.tag = e
  }
  // 初始化数据
  const initData = () => {
    _formData.value = props.memberInfo || {}
    // 与户主关系
    const temphouseholdVal = householdArr.find(x => x === props.memberInfo?.householder)
    _formData.value.householder = temphouseholdVal ? temphouseholdVal : '请选择'
    // 民族
    const tempNationVal = nationArr.find(x => x === props.memberInfo?.nationality)
    _formData.value.nationality = tempNationVal ? tempNationVal : '请选择'
    // 政治面貌
    const tempPoliticalVal = politicalArr.find(x => x.label === props.memberInfo?.political_type)
    _formData.value.political_type = tempPoliticalVal ? tempPoliticalVal.label : ''
    // 户籍性质
    const tempResidenceVal = residenceArr.find(x => x === props.memberInfo?.residence_type)
    _formData.value.residence_type = tempResidenceVal ? tempResidenceVal : ''
    // 婚姻状况
    const tempMarriageVal = marriageArr.find(x => x === props.memberInfo?.marriage)
    _formData.value.marriage = tempMarriageVal ? tempMarriageVal : ''
    // 学历
    const tempEduVal = eduArr.find(x => x === props.memberInfo?.education)
    _formData.value.education = tempEduVal ? tempEduVal : '请选择'
    // 宗教信仰
    const tempReliVal = religionArr.find(x => x === props.memberInfo?.religion)
    _formData.value.religion = tempReliVal ? tempReliVal : '请选择'
    // 标签
    _formData.value.tag = props.memberInfo?.tag ? props.memberInfo?.tag : []
  }
  onReady(() => {
    initData()
  })

  // 二、表单验证
  // 验证规则已分离

  // 三、表单提交
  const submitForm = () => {
    // 正好：只生成改动了的数据，无意中发现了我想用的写法
    formRef.value.validate(async (valid: boolean) => {
      if (!valid)
        return uni.showToast({ icon: 'none', title: '您的表单填写有误' })
      if (!props.memberInfo) {
        if (formData.value.residence_address) {
          formData.value.residence_address = formData.value.region?.join('.') + formData.value.residence_address
        }
        const t = JSON.parse(props.params!)
        let _params = {
          grid_num: t.grid_num, buildings_area: t.builds_num, building_num: t.build_num, unit_num: t.unit_num, comm_num: props.comm_num, room_num: props.room, ...formData.value
        }
        // TODO：新增参数已准备就绪，编写接口，将新增数据写入数据库
        await createMemberAPI(_params)
      } else {
        // TODO：调接口，修改信息
        await updateInfoAPI({
          id: props.memberInfo.id,
          comm_num: props.comm_num,
          ...formData.value
        })
      }
      uni.navigateBack({
        success: () => {
          uni.showToast({ icon: 'success', title: '修改成功' })
        }
      })
    })
  }
</script>

<template>
  <view class="form-wrapper">
    <tn-form ref="formRef" :model="_formData" :rules="formRules" size="sm" label-position="right" label-width="130"
      status-icon>
      <!-- 姓名 -->
      <tn-form-item class="form-item" prop="name" label="姓名:">
        <tn-input v-model="_formData.name" placeholder="请输入姓名" underline border-color="#c8c7cc"
          @change="onNameChange" />
      </tn-form-item>
      <!-- 与户主关系 -->
      <tn-form-item class="form-item" prop="householder" label="与户主关系:">
        <tn-picker :data="householdArr" v-model="_formData.householder" v-model:open="hOpen" @confirm="onHHchange" />
        <view class="picker-btn" @tap="hOpen = true">
          <text class="text">{{ _formData.householder }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </tn-form-item>
      <!-- 民族 -->
      <tn-form-item class="form-item" prop="nationality" label="民族:">
        <tn-picker :data="nationArr" v-model="_formData.nationality" v-model:open="nOpen" @confirm="onNationChange" />
        <view class="picker-btn" @tap="nOpen = true">
          <text class="text">{{ _formData.nationality }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </tn-form-item>
      <!-- 身份证号 -->
      <tn-form-item class="form-item" prop="id_card" label="身份证号:">
        <tn-input v-model="_formData.id_card" placeholder="请输入身份证号" underline border-color="#c8c7cc"
          @change="onIdCardChange" />
      </tn-form-item>
      <!-- 政治面貌 -->
      <tn-form-item class="form-item" prop="political_type" label="政治面貌:">
        <TnRadioGroup v-model="_formData.political_type" @change="onPoliticalChange">
          <TnRadio active-color="#ff1744" label="中共党员">中共党员</TnRadio>
          <TnRadio active-color="#1de9b6" label="群众">群众</TnRadio>
          <TnRadio active-color="#9e9e9e" label="其他">其他</TnRadio>
        </TnRadioGroup>
      </tn-form-item>
      <!-- 户籍性质 -->
      <tn-form-item class="form-item" prop="residence_type" label="户籍性质:">
        <TnRadioGroup v-model="_formData.residence_type" @change="onResiTChange">
          <TnRadio active-color="#ff1744" label="城镇">城镇</TnRadio>
          <TnRadio active-color="#1de9b6" label="农村">农村</TnRadio>
        </TnRadioGroup>
      </tn-form-item>
      <!-- 户籍地址 -->
      <tn-form-item class="form-item" label="户籍地区:">
        <TnRegionPicker v-model="regionVal" v-model:open="rOpen" />
        <view class="picker-btn" @tap="rOpen = true">
          <text class="text">{{ regionVal?.join(',') }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </tn-form-item>
      <tn-form-item class="form-item" prop="residence_address" label="户籍地址:">
        <tn-input v-model="_formData.residence_address" placeholder="请输户籍地址" underline border-color="#c8c7cc"
          @change="onResiAChange" />
      </tn-form-item>
      <!-- 联系电话 -->
      <tn-form-item class="form-item" prop="phone" label="联系电话:">
        <tn-input v-model="_formData.phone" placeholder="请输联系电话" underline border-color="#c8c7cc"
          @change="onPhoneChange" />
      </tn-form-item>
      <!-- 职业 -->
      <tn-form-item class="form-item" prop="doing" label="职业:">
        <tn-input v-model="_formData.doing" placeholder="请输职业" underline border-color="#c8c7cc"
          @change="onDoingChange" />
      </tn-form-item>
      <!-- 婚姻状况 -->
      <tn-form-item class="form-item" prop="marriage" label="婚姻状况:">
        <TnRadioGroup v-model="_formData.marriage" @change="onMarriageChange">
          <TnRadio active-color="#ff1744" label="未婚">未婚</TnRadio>
          <TnRadio active-color="#1de9b6" label="已婚">已婚</TnRadio>
          <TnRadio active-color="#00b0ff" label="离异">离异</TnRadio>
          <TnRadio active-color="#9e9e9e" label="丧偶">丧偶</TnRadio>
        </TnRadioGroup>
      </tn-form-item>
      <!-- 学历 -->
      <tn-form-item class="form-item" prop="education" label="学历:">
        <tn-picker :data="eduArr" v-model="_formData.education" v-model:open="eOpen" @confirm="onEduChange" />
        <view class="picker-btn" @tap="eOpen = true">
          <text class="text">{{ _formData.education }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </tn-form-item>
      <!-- 健康状况 -->
      <tn-form-item class="form-item" prop="health" label="健康状况:">
        <tn-input v-model="_formData.health" placeholder="请输健康状况" underline border-color="#c8c7cc"
          @change="onHealthChange" />
      </tn-form-item>
      <!-- 宗教信仰 -->
      <tn-form-item class="form-item" label="宗教信仰:">
        <tn-picker :data="religionArr" v-model="_formData.religion" v-model:open="reOpen" @confirm="onReligionChange" />
        <view class="picker-btn" @tap="reOpen = true">
          <text class="text">{{ _formData.religion }}</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
      </tn-form-item>
      <!-- 标签 -->
      <tn-form-item class="form-item" prop="tag" label="特殊家庭:">
        <TnCheckboxGroup v-model="_formData.tag" active-color="#1de9b6" @change="onTagChange">
          <TnCheckbox label="低保">低保</TnCheckbox>
          <TnCheckbox label="特困供养">特困</TnCheckbox>
          <TnCheckbox label="残疾人">残疾</TnCheckbox>
          <TnCheckbox label="空巢老人">空巢老人</TnCheckbox>
          <TnCheckbox label="留守儿童">留守儿童</TnCheckbox>
          <TnCheckbox label="退役军人">退役军人</TnCheckbox>
          <TnCheckbox label="信访人员">信访人员</TnCheckbox>
        </TnCheckboxGroup>
      </tn-form-item>
      <view class="btns">
        <button class="submit" @click="submitForm">提交</button>
      </view>
    </tn-form>
  </view>
</template>

<style lang="scss">
  .form-wrapper {
    .picker-btn {
      display: flex;
      align-items: center;

      .text {
        padding: 0 20rpx;
        border: 1px solid #c0c0c0;
        border-radius: 6rpx;
        background: linear-gradient(to right, #27ba9b, #1de9b6, #a7ffeb);
        font-size: 24rpx;
      }
    }

    .btns {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .submit {
        width: 620rpx;
        background: linear-gradient(to right, #1de9b6, #27ba9b, #1de9b6);
        color: #fff;
      }
    }
  }
</style>