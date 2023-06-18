import './style.css'
import Card from './js/card'

window.onload = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    const elem = new Card(card)

    const logo = card.querySelector('.media')
    logo.addEventListener('transitionend', () => {
      elem.afterOpen()
    })
  })
}