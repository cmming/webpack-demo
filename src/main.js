// import "@babel/polyfill"
import header from './modules/header'
import content from './modules/content'
import footer from './modules/footer'

import avator from './asset/image/avator.jpeg'

import './asset/css/index.scss'


$(window).ready(function () {
    new header()
    new content()
    new footer()
    var img = `<img class='w50h50' src="` + avator + `"/>`
    $('body').append(img)
    console.log(1112114423423)
    let a = new Promise(() => { })
    console.log(a)

})

function getComponent() {
    return import('lodash').then(({ default: _ }) => {
        let element = document.createElement('div');
        element.innerHTML = _.join(['cm', 'chmi'], '**')
        return element
    })
}

async function getComponent1() {
    const { default: _ } = await import('lodash')
    let element = document.createElement('div');
    element.innerHTML = _.join(['cm', 'chmi'], '**')
    return element
}

getComponent1().then(element => {
    document.body.appendChild(element)
})

