export default class Card {
  constructor(elem) {
    this.elem = elem

    this.onClick = this.onClick.bind(this)
    this.subscribe()
  }

  handleOpen() {
    const parentEl = this.elem.parentElement
    
    const startRect = this.elem.getBoundingClientRect()
    parentEl.style.height = `${startRect.height}px`
    this.elem.classList.add('opened')
    const endRect = this.elem.getBoundingClientRect()

    this.elem.animate(
      [
        { 
          top: `${startRect.y}px`, 
          left: `${startRect.x}px`, 
          width: `${startRect.width}px`, 
          height: `${startRect.height}px`,
          position: 'fixed',
          zIndex: 0,
        },
        { 
          top: `${endRect.y}px`, 
          left: `${endRect.x}px`, 
          width: `${endRect.width}px`, 
          height: `${endRect.height}px`,
          position: 'fixed',
          zIndex: 9,
        },
      ],
      { duration: 600, easing: 'ease' }
    )

    // logo.animate(
    //   [
    //     { 
    //       width: `${logoStart.width}px`, 
    //       height: `${logoStart.height}px`,
    //     },
    //     { 
    //       width: `${logoEnd.width}px`, 
    //       height: `${logoEnd.height}px`,
    //     },
    //   ],
    //   { duration: 600, easing: 'ease' }
    // )
  }

  handleClose() {
    const logo = this.elem.querySelector('.media')

    const startRect = this.elem.getBoundingClientRect()
    const logoStart = logo.getBoundingClientRect()
    this.elem.classList.remove('opened')
    const endRect = this.elem.getBoundingClientRect()
    const logoEnd = logo.getBoundingClientRect()


    this.elem.animate(
      [
        { 
          top: `${startRect.y}px`, 
          left: `${startRect.x}px`, 
          width: `${startRect.width}px`, 
          height: `${startRect.height}px`,
          position: 'fixed',
          zIndex: 0,
        },
        { 
          top: `${endRect.y}px`, 
          left: `${endRect.x}px`, 
          width: `${endRect.width}px`, 
          height: `${endRect.height}px`,
          position: 'fixed',
          zIndex: 9,
        },
      ],
      { duration: 600, easing: 'ease' }
    )
  }

  afterOpen() {
    // this.
  }

  afterClose() {

  }

  onClick() {
    console.log('ON_CLICK', this.elem)
    if (this.elem.classList.contains('opened')) {
      this.handleClose()
    } else {
      this.handleOpen()
    }
  }

  subscribe() {
    this.elem.addEventListener('click', this.onClick)
  }

  unsubscribe() {
    this.elem.removeEventListener('click', this.onClick)
  }
}