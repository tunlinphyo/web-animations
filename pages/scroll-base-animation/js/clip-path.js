import ScrollBase from "./scroll-base"

export default class ClipPath extends ScrollBase {
    constructor(elem) {
        super(elem)
    }

    onScroll(scrollY) {
        if (scrollY < this.start) {
            this.handleClipPath(0, 1)
        } else if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const code = this.mapRange(percentage, 0, 100, 0, 76)
            // const number = this.mapRange(percentage, 0, 100, 1, 6)
            this.handleClipPath(code)
        } else {
            this.handleClipPath(76, 6)
        }
    }

    handleClipPath(value) {
        if (this.endEl) {
            this.endEl.style.clipPath = `circle(${value}% at 50% 50%)`
            this.endEl.textContent = value.toFixed(2)
        }
    }

    onResize() {
        this.endEl = this.elem.querySelector('.end')
    }
}