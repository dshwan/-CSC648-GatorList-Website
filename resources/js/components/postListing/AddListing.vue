<template>
    <div>
        <div class="row justify-content-center margin-top">
            <div class="col-10 text-center">
                <h4><strong>Enter Address Info</strong></h4>
                <hr class="my-0">
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-10 col-sm-2 mb-0 mt-5">
                <select class="form-control text-reset mt-2" name="type" v-model='selected'>
                    <option disabled value="">Type</option>
                    <option v-for='(type, index) in listingTypes' :key='index' :value='type'> {{ type }} </option>
                </select>
            </div>
            <div class="col-10 col-sm-8 mt-4 mb-0">
                <div class="form-group">
                    <label for="street">Street:</label>
                    <input type="text" class="form-control" id="street" placeholder="Street" v-model='street'>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-12 col-sm-2"></div>
            <div class="col-5 col-sm-4">
                <div class="form-group my-1">
                    <label for="city">City:</label>
                    <input type="text" class="form-control" id="city" placeholder="City" v-model='city'>
                </div>
            </div>
            <div class="col-2 col-sm-2">
                <div class="form-group my-1">
                    <label for="state">State:</label>
                    <input type="text" class="form-control" id="state" placeholder="CA" disabled>
                </div>
            </div>
            <div class="col-3 col-sm-2">
                <div class="form-group my-1">
                    <label for="zip">ZIP:</label>
                    <input type="text" class="form-control" id="zip" placeholder="ZIP" v-model='zip'>
                </div>
            </div>
        </div>
        
        <div class="row justify-content-center mt-3">
            <div class="col-12 col-sm-2"></div>
            <div class="col-5 col-sm-4">
                <div class="form-group my-1">
                    <label for="numBeds">Num Bedrooms:</label>
                    <input type="text" class="form-control" id="numBeds" placeholder="numBeds" v-model.number='numBeds'>
                </div>
            </div>
            <div class="col-5 col-sm-4">
                <div class="form-group my-1">
                    <label for="numBaths">Num Bathrooms</label>
                    <input type="text" class="form-control" id="numBaths" placeholder="numBaths" v-model.number='numBaths'>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-4">
            <div class="col-10 col-sm-2">
                <div class="form-group my-1">
                    <label for="rent">Rent $:</label>
                    <input type="text" class="form-control" id="rent" placeholder="$" v-model='rent'>
                </div>
            </div>
            <div class="col-10 col-sm-8">
                <div class="form-group my-1">
                    <label for="image">Image URL:</label>
                    <input type="text" class="form-control" id="image" placeholder="https://www.example.com" v-model='url'>
                </div>
            </div>
        </div>

        <div class="row justify-content-center mt-3">
            <div class="col-10">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" placeholder="Description" rows="4" v-model='description' :class='{error: $v.description.$invalid}'></textarea>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <button type="submit" class="btn btn-outline-success btn-lg btn-block" :disabled='$v.$invalid' @click='validateListing'>Validate</button>
        </div>
    </div>
</template>

<script>
    import { required, numeric, minLength, maxLength, url, minValue, integer } from 'vuelidate/lib/validators';
    import ConfirmListing from './ConfirmListing.vue';

    export default {
        data: function (){
            return {
                listingTypes: ['Room', 'Apartment', 'House'],
                selected: '',
                street: '',
                city: '',
                numBeds: null,
                numBaths: null,
                zip: '',
                rent: '',
                url: '',
                description: '',
                showConfirm: false,
            }
        },
        validations: {
            selected: {
                required
            },
            street: {
                required
            },
            city: {
                required
            },
            zip: {
                required,
                numeric,
                minLen: minLength(5),
                maxLen: maxLength(5),
            },
            numBeds: {
                required,
                numeric,
                minVal: minValue(0),
                integer,
            },
            numBaths: {
                required,
                numeric,
                minVal: minValue(0),
                integer,
            },
            rent: {
                required,
                numeric
            },
            url: {
                required,
                url
            },
            description: {
                required
            }

        },
        methods: {
            validateListing() {
                // send listing to Vuex
                const addListing = {};
                addListing.type = this.selected;
                addListing.street = this.street;
                addListing.city = this.city;
                addListing.state = 'CA';
                addListing.zip = this.zip;
                addListing.rent = this.rent;
                addListing.image = this.url;
                addListing.description = this.description;
                addListing.numBeds = this.numBeds;
                addListing.numBaths = this.numBaths;
                this.$store.dispatch('mutateAddListing', addListing);
                this.$router.push('/postListing/confirm');
            }
        }
    }
</script>

<style scoped>
    .margin-top{
        margin-top: 150px;
    }
    .btn-outline-success{
        border: none;
    }
</style>
