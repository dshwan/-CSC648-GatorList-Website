import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        search: '',
        addListing: {
            type: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            rent: '',
            image: '',
            description: '',
            bedrooms: '',
            bathrooms: '',
        },
        allListings: null,
        loading: true,
        user: {},
    },
    // getters
    getters: {
        getSearch: (state) => {
            return state.search;
        },
        getAddListing: (state) => {
            return state.addListing;
        },
        getAllListings: (state) => {
            return state.allListings;
        },
        getLoading: (state) => {
            return state.loading;
        },
        getUser: (state) => {
            return state.user;
        },
    },
    // setters MUST BE Synchronous
    mutations: {
        mutateSearch: (state, payload) => {
            state.search = payload;
        },
        mutateAddListing: (state, payload) => {
            state.addListing.type = payload.type;
            state.addListing.street = payload.street;
            state.addListing.city = payload.city;
            state.addListing.state = payload.state;
            state.addListing.zip = payload.zip;
            state.addListing.rent = payload.rent;
            state.addListing.image = payload.image;
            state.addListing.description = payload.description;
            state.addListing.bedrooms = payload.numBeds;
            state.addListing.bathrooms = payload.numBaths;
        },
        mutateAllListings: (state, payload) => {
            state.allListings = payload;
        },
        mutateLoading: (state, bool) => {
            state.loading = bool;
        },
        mutateUser: (state, payload) => {
            state.user = payload;
        },
    },
    // call setters CAN BE Asynchronous
    actions: {
        mutateSearch: ({
            commit
        }, payload) => {
            commit('mutateSearch', payload);
        },
        mutateAddListing: ({
            commit
        }, payload) => {
            commit('mutateAddListing', payload);
        },
        mutateAllListings: ({
            commit
        }, payload) => {
            commit('mutateAllListings', payload);
        },
        mutateLoading: ({
            commit
        }, bool) => {
            commit('mutateLoading', bool);
        },
        mutateUser: ({
            commit
        }, payload) => {
            commit('mutateUser', payload);
        },
    },
})
