import ScrollBase from "./scroll-base"

export default class TextAnimation extends ScrollBase {
    constructor(elem) {
        super(elem)
        this.texts = this.getTexts()
        this.textTotal = this.texts.length - 1
    }

    onScroll(scrollY) {
        // console.log(scrollY, this.end, this.range)
        if (scrollY < this.start) {
            this.writeText(null, 1)
        } else if (scrollY > this.start && scrollY < this.end) {
            const current = scrollY - this.start
            const percentage = Math.min(this.percentage(current, this.end), 100)
            const step = Math.round(this.mapRange(percentage, 0, 100, 0, this.textTotal))
            this.writeText(step)
        } else {
            this.writeText(null, 2)
        }

    }

    writeText(step, all) {
        const t1 = this.elem.querySelector('.t1')
        const t2 = this.elem.querySelector('.t2')
        const t3 = this.elem.querySelector('.t3')
        const t4 = this.elem.querySelector('.t4')
        const t5 = this.elem.querySelector('.t5')
        const t6 = this.elem.querySelector('.t6')
        const t7 = this.elem.querySelector('.t7')
        const t8 = this.elem.querySelector('.t8')
        const t9 = this.elem.querySelector('.t9')
        const t10 = this.elem.querySelector('.t10')

        const elems = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10]
        const words = ['H','E','L','L','O','W','O','R','L','D']
        const steps = [9,15,28,41,57,81,97,116,129,134]

        if (all && all == 1) {
            elems.forEach((el, index) => {
                el.innerText = '_'
            })
        } else if (all && all == 2) {
            elems.forEach((el, index) => {
                el.innerText = words[index]
            })
        } else {
            steps.forEach((item, index) => {
                if (step < item && step > (steps[index - 1] || 0)) {
                    const prevs = elems.slice(0, index)
                    prevs.forEach((_, pIndex) => {
                        elems[pIndex].innerText = words[pIndex]
                    })
                    elems[index].innerText = this.texts[step]
                    const nexts = elems.slice(index + 1)
                    nexts.forEach((_, nIndex) => {
                        elems[nIndex + index + 1].innerText = '_'
                    })
                } 
                
            })
        }
    } 

    getTexts() {
        const alphabet = ['_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W']
        return [
            ...alphabet.slice(0, 9),
            ...alphabet.slice(0, 6),
            ...alphabet.slice(0, 13),
            ...alphabet.slice(0, 13),
            ...alphabet.slice(0, 16),
            ...alphabet.slice(0, 24),
            ...alphabet.slice(0, 16),
            ...alphabet.slice(0, 19),
            ...alphabet.slice(0, 13),
            ...alphabet.slice(0, 5)
        ]
    }
}