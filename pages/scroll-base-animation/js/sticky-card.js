import ScrollBase from "./scroll-base"

export default class StickyCard extends ScrollBase {
    constructor(elem) {
        super(elem)
        this.children = this.elem.querySelectorAll('.sticky-card')
    }

    onScroll(scrollY) {
        // console.log(scrollY, this.start, this.end)
        if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.range), 100)
            const code = Math.round(this.mapRange(percentage, 0, 100, 0, 5))
            this.setActive(code)
        }
    }

    getElementPositions() {
        const firstChild = this.elem.children[0]
        this.animationStart = firstChild.clientHeight * 0.5
        this.top = (window.innerHeight - firstChild.clientHeight) / 2
        this.start = this.elem.offsetTop - this.top
        this.end = this.start + this.elem.clientHeight - firstChild.clientHeight
        this.range = this.end - this.start
    }

    setActive(code) {
        this.children.forEach((child, index) => {
            const prevChild = this.children[index - 1]
            if (index < code) {
                this.setSclas(prevChild, .7)
            } else if (index == code) {
                const scroll = Math.round(child.getBoundingClientRect().top - this.top)
                const min = this.top
                const max = child.getBoundingClientRect().top
                const scale = this.mapRange(scroll, 0, this.animationStart, .7, 1)
                this.setSclas(prevChild, scale)
            }  else {
                this.setSclas(child, 1)
            }
        })
    }

    setSclas(elem, scale) {
        if (elem) elem.style.scale = scale
    }
}