import ScrollBase from "./scroll-base"

export default class ActiveAnimation extends ScrollBase {
    constructor(elem) {
        super(elem)
        this.children = this.elem.querySelectorAll('.active-card')
    }

    onScroll(scrollY) {
        if (scrollY < this.start) {
            this.setActive(-1)
        } else if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const code = Math.round(this.mapRange(percentage, 0, 100, 0, 5))
            this.setActive(code)
        } else {
            this.setActive(-1)
        }
    }

    setActive(code) {
        this.children.forEach((child, index) => {
            if (code == index) {
                child.classList.add('activated')
            } else {
                child.classList.remove('activated')
            }
        })
    }
}