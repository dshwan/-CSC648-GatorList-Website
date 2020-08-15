<template>
    <div>
        <div v-if='loadingCoordinates || loadingDistance' class="d-flex justify-content-center align-items-center loading">
            <hollow-dots-spinner
                :animation-duration="1000"
                :dot-size="30"
                :dots-num="5"
                color="green"
            />
        </div>

        <div v-else>
            <div class="row justify-content-center margin-top">
                <div class="col-10 text-center">
                    <h4><strong>Confirm Details</strong></h4>
                    <hr>
                </div>
            </div>

            <div v-if='confirmed'>
                <!-- Listing Details -->
                <div class="row justify-content-center mb-3">
                    <div class="col-5 border-right">
                        <p><strong class="mr-3">Listing Type:</strong> 
                            <span class="d-flex">{{ this.getAddListing.type }}</span>
                        </p> 
                        <p><strong class="mr-3">Monthly Rent:</strong> 
                            <span class="d-flex">${{ this.getAddListing.rent }}</span>
                        </p> 
                        <p><strong class="mr-3">Address:</strong> 
                            <span class="d-flex">
                                {{ this.getAddListing.street }} {{ this.getAddListing.city }}, 
                                {{ this.getAddListing.state }}  {{ this.getAddListing.zip }}
                            </span>
                        </p>
                        <p><strong class="mr-3">Num Beds:</strong> 
                            <span class="d-flex">{{ this.getAddListing.bedrooms }}</span>
                        </p> 
                        <p><strong class="mr-3">Num Baths:</strong> 
                            <span class="d-flex">{{ this.getAddListing.bathrooms }}</span>
                        </p> 
                        <img :src='this.getAddListing.image' class="img-fluid mb-3">
                        <p><strong class="mr-3">Description:</strong>
                            <span class="d-flex">{{ this.getAddListing.description }}</span>
                        </p> 
                    </div>

                    <!-- Google Maps -->
                    <div class="col-5">
                        <gatorlist-google-maps 
                            class="mapStyle" 
                            :lat="this.lat" 
                            :lng="this.lng" 
                            :zoom="15"
                            gestureHandling="none"
                        />

                        <div class="text-center">
                            <!-- Coordinates -->
                            <div class="mt-4">
                                Coordinates:
                            </div>
                            <hr class="w-75 my-0"/>
                            <div> Lat: {{this.lat}} </div>
                            <div> Lng: {{this.lng}} </div>

                            <!-- Distance -->
                            <div class="mt-4">
                                Distance to Campus:
                            </div>
                            <hr class="w-75 my-0"/>
                            <div> {{ this.distance.text }} </div>

                            <!-- Commute -->
                            <div class="mt-4">
                                Commute Time to Campus:
                            </div>
                            <hr class="w-75 my-0"/>
                            <div> {{ this.commute.text }} </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center mb-3 mt-5">
                    <div class="col-10">
                        <div class="alert alert-warning" role="alert">
                            Posting may take a maximum of 24hrs to be confirmed
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="row justify-content-center mb-3">
                    <div class="col-10">
                        <div class="alert alert-danger" role="alert">
                            Location does not exist. Please go back.
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center mb-4">
                <div class="col-5">
                    <button class="btn btn-dark btn-lg btn-block" @click='goBack'>Go Back</button>
                </div>
                <div class="col-5">
                    <button class="btn btn-primary btn-lg btn-block" :disabled='!confirmed' @click="confirm">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { HollowDotsSpinner } from 'epic-spinners'
    import GoogleMaps from '../search/GoogleMaps.vue'
    import axios from 'axios';

    export default {
        data: function () {
            return {
                confirmed: false,
                confirmedCoordinates: false,
                confirmedDistance: false,
                loadingCoordinates: true,
                loadingDistance: true, 
                lat: '',
                lng: '',
                distance: {},
                commute: {},
            }
        },
        components: {
            'gatorlist-google-maps': GoogleMaps,
            HollowDotsSpinner,
        },
        methods: {
            goBack(){
                // go back to post listing page
                this.$router.push('/postListing');
            },
            confirm(){
                if (this.getUser.userID) {
                    axios.post('/api/listings', {
                        ...this.getAddListing,
                        lat: this.lat,
                        lng: this.lng,
                        distance: this.distance,
                        commute: this.commute,
                        landlord_Id: this.getUser.userID
                    }).then(res => {
                        this.$router.push({name: 'home'})
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else{
                    console.log('need to be logged in first')
                }
            }
        },
        computed: {
            ...mapGetters([
                // get the listing from Vuex
                'getAddListing',
                'getUser'
            ]),
        },
        created() {
            // Create address string to search in google maps
            let address = [];
            address.push(this.getAddListing.street)
            address.push(this.getAddListing.city)
            address.push(this.getAddListing.state)
            address.push(this.getAddListing.zip)
            address = address.join(" ");
            const destination = 'San Francisco State University';
            
            // Find Coordinates
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address,
            }, (results, status) => {
                if (status === 'OK') {
                    // map.setCenter(results[0].geometry.location);
                    // var marker = new google.maps.Marker({
                    //     map: map,
                    //     position: results[0].geometry.location
                    // });
                    this.loadingCoordinates = false;
                    this.confirmedCoordinates = true;
                    this.confirmed = this.confirmedCoordinates && this.confirmedDistance;
                    this.lng = results[0].geometry.viewport.ia.l
                    this.lat = results[0].geometry.viewport.na.l
                } else {
                    this.loadingCoordinates = false;
                    this.confirmedCoordinates = false;
                    console.log('Coordinate Location does not exists');
                }
            });


            //Find Distance
            let service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix({
                origins: [address],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, ((response, status) => {
                if (status === 'OK'){
                    if(response.rows[0].elements[0].status === 'NOT_FOUND'){
                        this.loadingDistance = false;
                        this.confirmedDistance = false;
                        console.log('Distance Location does not exists');
                    } else {
                        this.loadingDistance = false;
                        this.confirmedDistance = true;
                        this.confirmed = this.confirmedCoordinates && this.confirmedDistance;
                        this.distance = response.rows[0].elements[0].distance;
                        this.commute = response.rows[0].elements[0].duration;
                    }
                }
                else{
                    this.loadingDistance = false;
                    this.confirmedDistance = false;
                    console.log('Error retrieving Distance Matrix')
                }
            }));
        },
    }
</script>

<style scoped>
    .loading{
        height: 75vh;
    }
    .margin-top{
        margin-top: 150px;
    }
    p{
        border: 1px solid rgb(212, 212, 212);
        border-radius: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    img{
        border-radius: 5px;
    }
    .mapStyle {
        position: static;
        width: 100%;
        height: 250px;
    }
</style>
