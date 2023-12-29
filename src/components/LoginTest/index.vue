<template>
  <div class="body">


    <h1 v-if="!token && !status || token && state">获取Token</h1>
    <h1 v-else-if="token && !state">Get Status</h1>
    <!-- <h1 v-else-if="status">re </h1> -->
    <!-- <h1 v-else-if="!status">获取Tokesn</h1> -->

    <div v-show="state">
      <el-form label-width="100px">
        <el-form-item label="  地址:">
          <el-input v-model="url" type="text" placeholder="URL"></el-input>
        </el-form-item>
        <el-form-item label=" KEY:">
          <el-input v-model="key" type="text" placeholder="key"></el-input>
        </el-form-item>
        <el-form-item label="    租户: ">
          <el-input v-model="organization" type="text" placeholder="organization" @keyup:Enter="login"></el-input>

        </el-form-item>
      </el-form>

      <p></p>
      <el-button @click="login" type="primary" plain> Next </el-button>

    </div>

    <!-- 第二个页面 -->
    <div v-show="!state">

      <el-form label-width="100px">

        <el-form-item label=" Token:" class="tokenForm">
          <div class="tokenForm">
            <el-input v-model="token" type="text" placeholder="Token"></el-input><el-button @click="reSetToken">reGetToken
            </el-button>


          </div>
        </el-form-item>
        <el-form-item label="        action:">
          <!-- 下拉框 -->
          <!-- <el-select v-model="action" filterable placeholder="请选择action">
            <el-option v-for="item in actionList" :key="item" :label="item" :value="item" />
          </el-select> -->

          <MyAutocomplete v-model="action" :dataList="actionList">

          </MyAutocomplete>
        </el-form-item>

        <el-form-item label=" name: ">
          <el-input v-model="name" type="text" placeholder="name参数" autosize></el-input>
        </el-form-item>
        <el-form-item label=" body: ">
          <el-input v-model="body" type="textarea" placeholder="请求体参数" :rows="3"></el-input>
        </el-form-item>
      </el-form>

      <p></p>
      <el-button @click="getStatus" type="primary" plain :disabled="!action"> 发送 </el-button>

      <el-button @click="removeValue" type="warning" plain> 返回 </el-button>

      <p></p>
      <el-form label-width="100px">

        <el-form-item label="response:">
          <el-input v-model="statusJSON" type="textarea" placeholder="响应体数据" autosize></el-input>

        </el-form-item>
      </el-form>



    </div>
  </div>
</template>

<script  setup>
import nprogress from 'nprogress'
import { ref, onMounted } from "vue"
import request from "../../axios/myAxios"
import mockAxios from '../../axios/mockAxios'
import MyAutocomplete from '@/components/MyAutocomplete/MyAutocomplete.vue'
import axios from 'axios'



const state = ref(true)
// const url = ref('http://127.0.0.1:88')
const url = ref(localStorage.getItem('baseURL'))
const key = ref('abc')
const organization = ref('')
const status = ref()
const token = ref()
const action = ref()
const body = ref()
const actionList = ref()
const statusJSON = ref()
const name = ref('')
let newUrl
let originUrl


onMounted(() => {

  if (url.value === '' || url.value === null) {
    var protocol = window.location.protocol; // 获取协议，例如：http: 或 https:
    var hostname = window.location.hostname; // 获取域名，例如：example.com
    var port = window.location.port; // 获取端口号
    // 构建协议、域名和端口号
    var protocolDomainPort = protocol + '//' + hostname + (port ? ':' + port : '');
    url.value = protocolDomainPort
  }

})

const login = async () => {
  // 截取到协议和域名端口
  try {
    // 输入全部地址
    newUrl = new URL(url.value)
    originUrl = newUrl.origin
  } catch (error) {
    // 不输入地址
    originUrl = location.origin
  }

  // 去请求当前这个地址
  const resToken = await mockAxios.get(`${url.value}/api?action=gettoken`, {
    params: {
      key: key.value,
      organization: organization.value
    }
  }).catch(err => {
    alert('请求失败')
    nprogress.done()
    return
  })

  localStorage.setItem('baseURL', url.value)
  console.log(resToken);

  // 如果有token就执行下一步
  // select下拉框
  if (resToken.token) {
    // 改变状态为下一步做准备
    token.value = resToken.token
    state.value = false
    // url.value = originUrl + newUrl?.pathname || ''
    // 去请求下拉列表
    // const res = await mockAxios.get(`${originUrl}/GetActionNames`, {
    const res = await mockAxios.get(`${url.value}/api?action=getactionnames`, {
    })
    actionList.value = res
    let urlSearch = newUrl?.search
    let objParams = new URLSearchParams(urlSearch)
    console.log(objParams, 'whtat');

    // action.value = objParams.get('action')
  }
  // const res = await request.get(`https://v1.hitokoto.cn/`)
  state.value = false
}
// 第二部请求，人家自己发
const getStatus = async () => {
  const resStatus = await mockAxios({
    method: 'post',
    // url: `${originUrl + newUrl.pathname}`,
    url: `${url.value}/api`,
    // url: `/api`,
    params: {
      action: action.value,
      token: token.value,
      name: name.value
    },
    data: body.value,

  })

  status.value = resStatus
  statusJSON.value = JSON.stringify(resStatus, null, 2)
}





// 清空表单
const removeValue = () => {
  // url.value = ''
  // key.value = ''
  // organization.value = ''
  status.value = ''
  token.value = ''
  // action.value = ''
  // body.value = ''
  // actionList.value = ''
  state.value = true
  statusJSON.value = ''
}
// 重置token
function reSetToken() {
  login()
}

</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  text-align: center;
}


.tokenForm {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
}

/* .el-form-item__content {
  background-color: red;
  flex-wrap: nowrap;
} */

/* .el-form-item__content {
  flex-wrap: nowrap;
} */
</style>
