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

export function getTransparentIcon (url) {
  return new Promise((resolve, reject) => {
    const target = `http://favicon.cccyun.cc/${url}`
    getBase64ByAjax(target, 'image/x-icon').then(base64 => {
      const img = new Image()
      img.src = base64
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')
        const w = img.width > 32 ? 32 : img.width
        const h = img.height > 32 ? 32 : img.height
        canvas.width = w;
        canvas.height = h;
        context.drawImage(img, 0, 0, w, h)
        const imgData = context.getImageData(0, 0, w, h)
        const [r0, g0, b0, a0] = [255, 255, 255, 255]
        const tolerance = 0;
        for (let i = 0; i < imgData.data.length; i += 4) {
          const r = imgData.data[i];
          const g = imgData.data[i + 1];
          const b = imgData.data[i + 2];
          const a = imgData.data[i + 3];
          const t = Math.sqrt((r - r0) ** 2 + (g - g0) ** 2 + (b - b0) ** 2 + (a - a0) ** 2);
          if (t <= tolerance) {
            imgData.data[i] = 0;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
            imgData.data[i + 3] = 0;
          }
        }
        context.putImageData(imgData, 0, 0);
        const newBase64 = canvas.toDataURL('image/png');
        resolve(newBase64)
      }
      img.onerror = (e) => {
        reject(e)
      }
    }, (e) => {
      reject(e)
    })
  })
}

export function coverAsync(_promise) {
  return _promise.then(data => {
    return [null, data]
  }, err => {
    return [err]
  })
}
