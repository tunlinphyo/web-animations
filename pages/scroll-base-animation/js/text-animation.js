import ScrollBase from "./scroll-base"

export default class TextAnimation extends ScrollBase {
    constructor(elem) {
        super(elem)
        this.init()
    }

    onScroll(scrollY) {
        if (scrollY < this.start) {
            this.writeText(null, 1)
        } else if (scrollY >= this.start && scrollY <= this.end) {
            const current = scrollY - this.start
            const percentage = this.percentage(current, this.end)
            // need to add 2 to text total for total character count don't know why
            const step = Math.round(this.mapRange(percentage, 0, 100, 0, this.textTotal + 2)) 
            this.writeText(step)
        } else {
            this.writeText(null, 2)
        }

    }

    init() {
        this.texts = this.getTexts()
        this.textTotal = this.texts.length

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

        this.elems = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10]
        this.words = ['H','E','L','L','O','W','O','R','L','D']
        this.steps = [9,15,28,41,57,81,97,116,129,134]
    }

    writeText(step, all) {
        if (all && all == 1) {
            this.elems.forEach((el, index) => {
                el.innerText = '_'
            })
        } else if (all && all == 2) {
            this.elems.forEach((el, index) => {
                el.innerText = this.words[index]
            })
        } else {
            this.steps.forEach((item, index) => {
                if (step < item && step > (this.steps[index - 1] || 0)) {
                    const prevs = this.elems.slice(0, index)
                    prevs.forEach((_, pIndex) => {
                        this.elems[pIndex].innerText = this.words[pIndex]
                    })
                    this.elems[index].innerText = this.texts[step]
                    const nexts = this.elems.slice(index + 1)
                    nexts.forEach((_, nIndex) => {
                        this.elems[nIndex + index + 1].innerText = '_'
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