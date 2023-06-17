export default class ScrollBase {
  constructor(selector) {
      this.elem = document.querySelector(selector)
      this.handleScroll = this.handleScroll.bind(this)
      this.handleResize = this.handleResize.bind(this)
      this.subscribe()
  }

  handleScroll() {
      const scrollY = 
      this.onScroll(window.scrollY)
  }

  handleResize() {
      this.getElementPositions()
      this.onResize()
  }

  onScroll(scrollY) {
      console.log('SCROLL', scrollY)
  }

  onResize() {
      console.log('CALCULATE')
  }

  percentage(num, end) {
      return num / end * 100
  }

  getElementPositions() {
      const top = this.elem.parentElement.offsetTop
      const height = this.elem.clientHeight
      const parentHeight = this.elem.parentElement.clientHeight

      this.start = top - ((window.innerHeight - height) / 2)
      this.end = this.start + parentHeight - height
      this.range = this.end - this.start
  }

  mapRange(number, startRange1, endRange1, startRange2, endRange2) {
      if (number < startRange1) {
        number = startRange1;
      } else if (number > endRange1) {
        number = endRange1;
      }
      
      const range1 = endRange1 - startRange1;
      const range2 = endRange2 - startRange2;
      
      const mappedValue = (((number - startRange1) * range2) / range1) + startRange2;
      
      return mappedValue;
    }

  subscribe() {
      this.getElementPositions()
      this.onResize()
      document.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
  }

  unsubscribe() {
      document.removeEventListener('scroll', this.handleScroll)
      window.removeEventListener('resize', this.handleResize)
  }
}