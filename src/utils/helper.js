// img to base64
export function getBase64Image(img) {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var dataURL = canvas.toDataURL('image/png')
  return dataURL
}

export function getToday() {
  const date = new Date()
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}

export function getBase64ByAjax(url, formatter = 'image/png', processFn) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        const uInt8Array = new Uint8Array(xhr.response)
        let i = uInt8Array.length
        const binaryString = new Array(i)
        while (i--) {
          binaryString[i] = String.fromCharCode(uInt8Array[i])
        }
        const data = binaryString.join('')
        const base64 = window.btoa(data)
        const dataURL = 'data:' + (formatter || 'image/png') + ';base64,' + base64
        resolve(dataURL)
      }
    }
    xhr.onerror = (e) => {
      reject(e)
    }
    xhr.onprogress = (e) => {
      processFn && processFn(e)
    }
    xhr.send()
  })
}

export function ajaxGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = (e) => {
      reject(e)
    }
    xhr.send()
  })
}

export function ajaxPost(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const paramsData = JSON.stringify(data)
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = (e) => {
      reject(e)
    }
    xhr.send(paramsData)
  })
}

export function getLocalStorage(key) {
  let result
  try {
    result = JSON.parse(localStorage.getItem(key))
  } catch (e) {
    result = localStorage.getItem(key)
  }
  return result
}

export function execCopy(text) {
  const input = document.createElement('input')
  input.style.opacity = 0
  input.style.position = 'absolute'
  input.style.left = '-100000px'
  document.body.appendChild(input)
  input.value = text
  input.select()
  input.setSelectionRange(0, text.length)
  document.execCommand('copy')
  document.body.removeChild(input)
  return true
}
