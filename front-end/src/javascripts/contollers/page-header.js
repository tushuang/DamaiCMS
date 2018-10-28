import page_header_template from '../views/page_header.html'

const render = (data={
    title:'',
    description:'',
    list:[]
})=>{
    let html = template.render(page_header_template,data)
    $('.content-header').html(html)
}

export default {
    render
} 