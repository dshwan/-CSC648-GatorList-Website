<template>
    <div class="container mb-4">
        <div class="form-row justify-content-center">
            <div class="col-2 col-lg-1">
                <select class="form-control btn btn-dark" name="type" v-model='listingSelected'>
                    <option disabled value="">Type</option>
                    <option v-for='(type, index) in listingTypes' :key='index'> {{ type }} </option>
                </select>
            </div>
            <div class="col-2 col-lg-1">
                <button id="priceMenuButton" class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Price
                </button>
                <div class="dropdown-menu" aria-labelledby="priceMenuButton">
                    <div class="form-row">
                        <div class="col">
                            <input type="text" class="form-control" name="minprice" v-model.number.lazy='minPrice' placeholder="Min">
                        </div>
                        <div class="col-1 text-center pt-2">
                            -
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" name="maxprice" v-model.number.lazy='maxPrice' placeholder="Max">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3 col-lg-2">
                <select class="form-control btn btn-dark" name="bedrooms" v-model='numBedrooms'>
                    <option disabled value="">Bedrooms</option>
                    <option v-for='(bed, index) in bedAndBathList' :key='index'> {{ bed }} </option>
                </select>
            </div>
            <div class="col-3 col-lg-2">
                <select class="form-control btn btn-dark" name="bathrooms" v-model='numBathrooms'>
                    <option disabled value="">Bathrooms</option>
                    <option v-for='(bathroom, index) in bedAndBathList' :key='index'> {{ bathroom }} </option>
                </select>
            </div>
            <div class="col-2 col-lg-2">
                <gatorlist-sortbutton/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import SortButton from './SortButton.vue';

    export default {
        data: function (){
            return {
                listingTypes: ['All', 'Room', 'Apartment', 'House'],
                bedAndBathList: ['0+', '1+', '2+', '3+', '4+'],
                listingSelected: '',
                minPrice: null,
                maxPrice: null,
                numBedrooms: '',
                numBathrooms: '',
            }
        },
        beforeCreate(){
            // extract from DB before component is created
            const endpoint = '/api/listings?';

            axios.get(endpoint)
                .then(res => {
                    // send all listings to Vuex
                    this.$store.dispatch('mutateAllListings', res.data);
                    this.$store.dispatch('mutateLoading', false);
                })
                .catch(() => {
                    console.log('Error retrieving from ', endpoint);
                });
        },
        beforeUpdate() {
            let endpoint = '/api/listings?';

            if(this.listingSelected !== 'All' && this.listingSelected !== ''){
                endpoint += 'type=' + this.listingSelected + '&';
            }
            if(this.numBedrooms !== '0+' && this.numBedrooms !== ''){
                endpoint += 'bedrooms=' + this.numBedrooms[0] + '&';
            }
            if(this.numBathrooms !== '0+' && this.numBathrooms !== ''){
                endpoint += 'bathrooms=' + this.numBathrooms[0] + '&';
            }
            if(this.minPrice)
            {
                endpoint += 'min_rent=' + this.minPrice + '&';
            }
            if(this.maxPrice)
            {
                endpoint += 'max_rent=' + this.maxPrice + '&';
            }
            
            // set loading to true while extracting from DB
            this.$store.dispatch('mutateLoading', true);
            axios.get(endpoint)
                .then(res => {
                    // send all listings to Vuex
                    this.$store.dispatch('mutateAllListings', res.data);
                    this.$store.dispatch('mutateLoading', false);
                })
                .catch(() => {
                    console.log('Error retrieving from ', endpoint);
                });
            // redirect to home page when component updates
            this.$router.push({name: 'home'});
        },
        components: {
            'gatorlist-sortbutton': SortButton,
        }
    }
</script>

<style scoped>
    #priceMenuButton{
        width: 95%;
        padding-left: 2px;
    }
    select{
        cursor: pointer;
    }
    .show{
        padding: 0;
        margin: 0;
    }
</style>

