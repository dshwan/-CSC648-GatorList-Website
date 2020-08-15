/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import { routes } from './routes';
import { store } from './store/store'
import Navbar from './components/header/Navbar.vue';
// >>>>>>> develop

Vue.use(Vuelidate);
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes,
});

Vue.component('gatorlist-navbar', Navbar);

Vue.filter('capitalize', value => {
    return value.charAt(0).toUpperCase() + value.slice(1)
});
Vue.filter('subjectVerbMiles', value => {
    if (value === 1) return String(value) + ' Mile';
    return String(value) + ' Miles';
});
Vue.filter('subjectVerbMinutes', value => {
    if (value === 1) return String(value) + ' Minute';
    return String(value) + ' Minutes';
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
});
