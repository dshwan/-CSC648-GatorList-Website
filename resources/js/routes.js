import Home from './components/Home.vue';
import Listing from './components/search/Listing.vue';
import Login from './components/authentication/Login.vue';
import Register from './components/authentication/Register.vue';
import Account from './components/account/Account.vue';
import AdminPanel from './components/account/adminPanel/AdminPanel.vue';
import PendingListing from './components/account/adminPanel/PendingListing.vue';
import Account_details from './components/account/Account_details.vue';
import PendingListings from './components/account/PendingListings.vue';
// import EditListings from './components/account/EditListings.vue';
import PostListing from './components/postListing/PostListing.vue';
import AddListing from './components/postListing/AddListing.vue';
import ConfirmListing from './components/postListing/ConfirmListing.vue';
import Messages from './components/account/Messages.vue';
import About from './components/about/About.vue';
import Victor from './components/about/employee/Victor.vue'
import Aditya from './components/about/employee/Aditya.vue'
import Daniel from './components/about/employee/Daniel.vue'
import Dylan from './components/about/employee/Dylan.vue'
import Huawei from './components/about/employee/Huawei.vue'
import Karuna from './components/about/employee/Karuna.vue'
import Gabriel from './components/about/employee/Gabriel.vue'

export const routes = [
    { path: '/', component: Home, name: 'home'},
    { path: '/listing/:id', component: Listing},
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register },
    { path: '/account', component: Account, children:[
        { path: '', component: Account_details },
        { path: 'adminPanel', component: AdminPanel },
        { path: 'adminPanel/:id', component: PendingListing },
        { path: 'pendingListings', component: PendingListings },
        // { path: 'editListings', component: EditListings },
        { path: 'messages', component: Messages },
    ] },
    { path: '/postListing', component: PostListing, children: [
        { path: '', component: AddListing },
        { path: 'confirm', component: ConfirmListing },
    ]},
    { path: '/about', component: About },
    { path: '/about/victor', component: Victor },
    { path: '/about/aditya', component: Aditya },
    { path: '/about/daniel', component: Daniel },
    { path: '/about/dylan', component: Dylan },
    { path: '/about/huawei', component: Huawei },
    { path: '/about/karuna', component: Karuna },
    { path: '/about/gabriel', component: Gabriel },
    { path: '*', redirect: {name: 'home'} },
];