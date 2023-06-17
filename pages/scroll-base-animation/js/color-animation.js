import ScrollBase from "./scroll-base"

export default class ColorAnimation extends ScrollBase {
    constructor(elem) {
        super(elem)
    }

    onScroll(scrollY) {
        if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const r = Math.round(this.mapRange(percentage, 0, 100, 239, 96))
            const g = Math.round(this.mapRange(percentage, 0, 100, 229, 2))
            const b = Math.round(this.mapRange(percentage, 0, 100, 253, 238))
            this.elem.innerText = this.rgbToHash(`rgb(${r}, ${g}, ${b})`).toUpperCase()
            this.elem.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        }
    }

    rgbToHash(rgb) {
        const rgbArray = rgb.match(/\d+/g).map(Number)
        const combinedValue = (rgbArray[0] << 16) + (rgbArray[1] << 8) + rgbArray[2]
        const hash = (combinedValue % 16777216).toString(16).padStart(6, '0')
      
        return `#${hash}`
    }
}