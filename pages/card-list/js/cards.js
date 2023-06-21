export default class Cards {
  constructor(selector) {
      this.containerEl = document.querySelector(selector)
      this.handleScroll = this.handleScroll.bind(this)
      this.handleResize = this.handleResize.bind(this)
      this._init()
      this.subscribe()
  }

  handleScroll() {
      const scrollY = window.scrollY
      const current = scrollY - this.top
      this._setCardPositions(current)
  }

  handleResize() {
      this._init()
      this.handleScroll()
  }

  subscribe() {
      document.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
  }

  unsubscribe() {
      document.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
  }

  _init() {
      this.containerEl.style.height = `${this.containerEl.children.length * window.innerHeight}px`
      this.top = this.containerEl.offsetTop
      this.height = this.containerEl.clientHeight - window.innerHeight
      this.range = this.height - this.top - window.innerHeight
      this.count = this.containerEl.children.length
      this.card = this.containerEl.children[0]
      this._setCardPositions(0)
  }

  _setCardPositions(scroll) {
      const section = this.range / this.count
      const maxIndex = this.count - 1
      Array.from(this.containerEl.children).forEach((card, index) => {
          const i = this.count - index - 1
          const start = i * section
          const end = (this.range - index) / (index + 1)
          let percentage = 0
          if (scroll > start) {
              percentage = this._percentage(scroll - start, end)
          }

          const minStart = 20
          const maxStart = Math.min((window.innerHeight - this.card.clientHeight), (this.count * (window.innerHeight * 0.02)))
          const startTop = this._mapRange(index, 0, maxIndex, minStart, maxStart)
          const startScale = this._mapRange(index, 0, maxIndex, .6, .95)
          
          const top = this._mapRange(percentage, 0, 100, startTop * index * 0.35, window.innerHeight)
          const scale = this._mapRange(percentage, 0, 30 + i, startScale, 1)
          const rotate = this._mapRange(percentage, 0, 40 + i, -40, 0)
          
          card.style.transform = `translateY(${(scroll + top)}px) scale(${Math.min(scale, 1)}) perspective(100em) rotateX(${rotate}deg)`
      }) 
  }

  _percentage(num, end) {
      return num / end * 100
  }

  _mapRange(number, startRange1, endRange1, startRange2, endRange2) {
      if (number < startRange1) {
        number = startRange1
      } else if (number > endRange1) {
        number = endRange1
      }
      
      const range1 = endRange1 - startRange1
      const range2 = endRange2 - startRange2
      
      const mappedValue = (((number - startRange1) * range2) / range1) + startRange2
      
      return mappedValue
  }
}
