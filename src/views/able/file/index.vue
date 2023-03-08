<template>
  <div>
    <a-button type="primary" @click="downloadPdf">点击下载 Pdf</a-button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { downloadByData } from '@/hooks/useDownload'

function downloadPdf() {
  // axios({
  //   method: 'GET',
  //   url: this.fileUrl,
  //   responseType: 'blob',
  //   withCredentials: false
  // })
  //   .then(res => {
  //     const name = this.fileUrl
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
