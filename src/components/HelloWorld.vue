<template>
  <div>




    <el-button type="primary" @click="clickHandle">主要按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
import { } from "vue"

import mockAxios from '../axios/mockAxios'




const clickHandle = async () => {
  // mockAxios.post('https://api.closeai-asia.com/v1/chat/completions',{
  // const res = await mockAxios.post('https://cgs.xzhgpt.com/chat-process', {
  const res = await mockAxios.post('/api/chat-stream', {
    "messages": [
      {
        "role": "user",
        "content": "你好"
      }
    ],
    "stream": true,
    "model": "gpt-3.5-turbo",
    "temperature": 1,
    "presence_penalty": 0
  })

  console.log(res);


}
</script>

<style scoped>
</style>
