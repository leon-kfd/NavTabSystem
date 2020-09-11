function createMessage(color, text, duration) {
  const el = document.createElement('div')
  const HEIGHT = 40
  let hoverFlag = false
  el.style.cssText = [
    'position:fixed',
    'top: 0',
    'left: 0',
    'width: 100%',
    `height: ${HEIGHT}px`,
    `line-height: ${HEIGHT}px`,
    'text-align: center',
    'color: #fff',
    'z-index: 99999999',
    `background: ${color}`,
    'transform: translateY(-40px)',
    'transition: transform .4s ease-in-out'
  ].join(';')
  setTimeout(() => {
    el.style.transform = 'translateY(0)'
  })
  el.innerText = text
  function enterEvent() {
    hoverFlag = true
  }
  function leaveEvent() {
    hoverFlag = false
    setTimeout(() => {
      destory()
    }, duration)
  }
  function destory() {
    el.style.transform = `translateY(-${HEIGHT}px)`
    setTimeout(() => {
      el.removeEventListener('mouseenter', enterEvent)
      el.removeEventListener('mouseleave', leaveEvent)
      document.body.contains(el) && document.body.removeChild(el)
    }, 400)
  }
  el.addEventListener('mouseenter', enterEvent)
  el.addEventListener('mouseleave', leaveEvent)
  document.body.appendChild(el)
  setTimeout(() => {
    if (!hoverFlag) {
      destory()
    }
  }, duration)
}

export function success(text, duration = 3000) {
  createMessage('#67C23A', text, duration)
}

export function warning (text, duration = 3000) {
  createMessage('#E6A23C', text, duration)
}

export function error(text, duration = 3000) {
  createMessage('#F56C6C', text, duration)
}
