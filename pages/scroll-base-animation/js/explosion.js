import ScrollBase from "./scroll-base"

export default class Explosion extends ScrollBase {
    constructor(elem) {
        super(elem)
        this.box = this.elem.querySelector('.explotion-box')
    }

    onScroll(scrollY) {
        if (scrollY < this.start) {
            this.drawFire(6, 6)
        } else if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const code = this.mapRange(percentage, 0, 100, 1, 75)
            const { x, y } = this.getXnY(code)
            this.drawFire(x, y)
        } else {
            this.drawFire(6, 6)
        }
    }

    getXnY(code) {
        const index = Math.round(code)
        const x = Math.round(index % 5) || 5
        const yIndex = Math.round(index % 25) || 25
        const y = Math.ceil(yIndex / 5)

        return { x, y }
    }

    drawFire(x, y) {
        this.box.style.backgroundPosition = `${25 * (x - 1)}% ${25 * (y - 1)}%`

    }

    onResize() {
        this.boxWidth = this.box?.clientWidth || 0
    }
}