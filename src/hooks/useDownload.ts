import { notification } from 'ant-design-vue'

/**
 * 根据后台接口文件流下载
 * @param data: 接口返回的文件流 eg: Blob对象
 * 使用示例: downloadByData('这是一段测试文字', 'test.txt' || 'test.docx')
 *           downloadByData(pdfUrl, 'temp.pdf')
 */
export function downloadByData(data, fileName, type?) {
  const blob = new Blob([data], { type: type || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)

  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }

  document.body.appendChild(tempLink)

  tempLink.click()

  document.body.removeChild(tempLink)

  window.URL.revokeObjectURL(blobURL)
}

export async function useDownload(api, fileName, params, notify) {
  if (notify) {
    notification.open({
      message: '温馨提示',
      description: '如果数据庞大会导致下载缓慢, 请您耐心等待！'
    })
  }

  try {
    const data = await api(params)
    downloadByData(data, fileName)
  } catch (error) {
    console.log(error)
  }
}
