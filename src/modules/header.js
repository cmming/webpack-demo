import render from '../utils/render'
import core from '../utils/core'
console.log(render)

let headerHtml = `
<div> this is a header</div>
`

export default function header() {
    console.log(document.getElementById('root'))
    // document.getElementById('root')[0].appendChild(headerHtml)
    // $('body').append('header')
}