import ScrollBase from "./scroll-base"

export default class VerticalScroll extends ScrollBase {
    constructor(elem) {
        super(elem)
    }

    onScroll(scrollY) {
        if (scrollY < this.start) {
            this.moveChild(0)
        } else if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const x = this.mapRange(percentage, 0, 100, 0, this.childWidth)
            this.moveChild(x)
        } else {
            this.moveChild(this.childWidth)
        }
    }

    moveChild(x) {
        if (this.child) {
            this.child.style.transform = `translateX(${x * -1}px)`
        }
    }

    onResize() {
        this.child = this.elem.querySelector('.scroll-x--container')
        this.childWidth = this.child ? this.child.clientWidth - this.elem.clientWidth : 0
    }
}