// import "@babel/polyfill"
import header from './modules/header'
import content from './modules/content'
import footer from './modules/footer'

import avator from   './asset/image/avator.jpeg'

import './asset/css/index.scss'


$(window).ready(function(){
    new header()
    new content()
    new footer()
    var img = `<img class='w50h50' src="`+avator+`"/>`
    $('body').append(img)
    console.log(1112114423423)
    let a = new Promise(()=>{})
    console.log(a)

})

