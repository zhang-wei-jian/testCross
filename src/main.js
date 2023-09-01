import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import './mock/mockAxios.js'
/* these are necessary styles for vue flow */
// @import '@vue-flow/core/dist/style.css';

// /* this contains the default theme, these are optional styles */
// @import '@vue-flow/core/dist/theme-default.css';


const app = createApp(App)
app.use(ElementPlus)


app.mount('#app')
