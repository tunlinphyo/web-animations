export default class Cards {
  constructor(selector) {
    this.containerEl = document.querySelector(selector)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleScrollDir = this.handleScrollDir.bind(this)
    this.naturalScroll = true
    this._init()
    this.subscribe()
  }

  handleScroll() {
    const scrollY = this.naturalScroll ? this.scrollMax - window.scrollY : window.scrollY
    const current = Math.max(scrollY - this.top, 0)
    this._setCardPositions(current)
  }

  handleResize() {
    this._calcElem()
    this._setCardPositions(0)
    this.handleScroll()
  }

  handleScrollDir() {
    this.naturalScroll = !this.naturalScroll
    this._setNaturalScroll(this.naturalScroll)
    this.handleScroll()
  }

  subscribe() {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    document.querySelector('.dir-toggle').addEventListener('click', this.handleScrollDir)
    window.addEventListener('resize', this.handleResize)
  }

  unsubscribe() {
    document.removeEventListener('scroll', this.handleScroll)
    document.querySelector('.dir-toggle').removeEventListener('click', this.handleScrollDir)
    window.removeEventListener('resize', this.handleResize)
  }

  _printData(scroll) {
    const footerEl = document.querySelector('.footer')
    footerEl.textContent = scroll
  }

  _init() {
    this._calcElem()
    this._setCardPositions(0)
    this._setNaturalScroll(this.naturalScroll)
  }

  _calcElem() {
    this.containerEl.style.height = `${this.containerEl.children.length * window.innerHeight}px`
    this.scrollMax = this.containerEl.clientHeight - window.innerHeight
    this.top = this.containerEl.offsetTop
    this.height = this.containerEl.clientHeight - window.innerHeight
    this.range = this.height - this.top
    this.count = this.containerEl.children.length
    this.card = this.containerEl.children[0]
  }

  _setCardPositions(scroll) {
    const section = this.range / this.count
    const maxIndex = this.count - 1
    Array.from(this.containerEl.children).forEach((card, index) => {
      const i = maxIndex - index
      const start = i * section * 0.5
      const end = this.range / (index + 1)
      let percentage = 0
      if (scroll > start) {
        percentage = this._percentage(scroll - start, end)
      }

      const minStart = 0
      const maxStart = Math.min((window.innerHeight - this.card.clientHeight), (this.count * (window.innerHeight * 0.02)))
      const startTop = this._mapRange(index, 0, maxIndex, minStart, maxStart)
      const startScale = this._mapRange(index, 0, maxIndex, .65, .95)

      const increase = 2 / this.count
      const top = this._mapRange(percentage, 0, 80, startTop * index * increase, window.innerHeight)
      const scale = this._mapRange(percentage, 0, 30 + i, startScale, 1)
      const rotate = this._mapRange(percentage, 0, 30, -20, 0)

      card.style.transform = `translateY(${(top)}px) scale(${Math.min(scale, 1)}) perspective(80em) rotateX(${rotate}deg)`
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

  _setNaturalScroll(data) {
    if (data) {
      window.scrollTo(0, this.scrollMax)
      document.querySelector('.dir-toggle').textContent = 'natural scrolling: on'
    } else {
      window.scrollTo(0, 0)
      document.querySelector('.dir-toggle').textContent = 'natural scrolling: off'
    }
  }
}
