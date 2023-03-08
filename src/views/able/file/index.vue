<template>
  <div>
    <a-button type="primary" @click="downloadPdf">点击下载 Pdf</a-button>
    <a-button type="primary" @click="downloadPdf">点击下载 在线图片</a-button>
    <a-button type="primary" @click="downloadPdf">点击下载 在线xlsx</a-button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { downloadByData } from '@/hooks/useDownload'

// PDF不能使用在线url直接下载, 需要接口返回流数据才能下载
function downloadPdf() {
  const fileUrl = 'http://cdn.xxxxx.cn/saas/uploads/202303/6408378b10d45.pdf'

  // axios({
  //   method: 'GET',
  //   url: fileUrl,
  //   responseType: 'blob',
  //   withCredentials: false
  // })
  //   .then(res => {
  //     const name = fileUrl
  //     const suffix = name.substring(name.lastIndexOf('.') + 1)
  //     const fileName = `temp.${suffix}`

  //     console.log('res.data', res)

  //     downloadByData(res.data, fileName, res.headers['content-type'])
  //   })
  //   .catch(err => {
  //     console.log('err', err)
  //   })
}
</script>

<style lang="scss" scoped></style>
