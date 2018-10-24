require('../stylesheets/app.scss')

import router from './router/index.js'
const body_template = require('./views/body_view.html')

$('#wrapper').html(body_template)

router.init()