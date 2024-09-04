<template>
  <a-space>
    <a-button type="primary" @click="downloadPdf">点击下载 在线Pdf</a-button>
    <a-button type="primary" @click="downloadPic">点击下载 在线图片</a-button>
    <a-button type="primary" @click="downloadXlsx">点击下载 在线xlsx</a-button>
  </a-space>
</template>

<script setup lang="ts">
import axios from 'axios'
import { downloadByData } from '@/hooks/useDownload'
import { downloadByOnlineUrl, downloadByUrl } from '@/utils/file'

// PDF不能使用在线url直接下载, 需要接口返回流数据才能下载
function downloadPdf() {
  const testUrl =
    'https://pure-admin.github.io/pure-admin-doc/pdf/Cookie%E5%92%8CSession%E5%8C%BA%E5%88%AB%E7%94%A8%E6%B3%95.pdf'

  axios({
    method: 'GET',
    url: testUrl,
    responseType: 'blob',
    withCredentials: false
  })
    .then(res => {
      const index = testUrl.lastIndexOf('.') + 1
      const suffix = testUrl.substring(index)
      const fileName = `文件.${suffix}`
      downloadByData(res.data, fileName, res.headers['content-type'])
    })
    .catch(err => {
      console.log('err', err)
    })
}

function downloadPic() {
  const testUrl = 'https://img0.baidu.com/it/u=3906269906,2494252993&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500'
  downloadByOnlineUrl(testUrl, 'corgi.png')
}

function downloadXlsx() {
  const testUrl = 'http://cdn.sckaiwu.cn/saas/uploads/2023-03/8bb025405df50d979b07a67ac07050ab.xlsx'
  downloadByUrl({ url: testUrl })
}
</script>

<style lang="scss" scoped></style>
