<template>
    <div class = "container-fluid mb-5">
        <div v-if='!this.loading'>
            <div class="row mt-5">

                <!-- image -->
                <div class="col-12 col-md-6 col-lg-4">
                    <img :src="listing.image" class="rounded mx-auto d-block img-fluid mb-5">
                </div>
                
                <!-- listing details -->
                <div class="col-12 col-md-6 col-lg-4 mb-5">
                    <h2 class="text-center">{{ listing.type | capitalize }} Details</h2>
                    <hr class="text-center w-75"/>
                    
                    <div class="container">
                        <div class="row ml-2 text-size mb-3">
                            <div class="col">
                                <p><strong>Type:</strong> {{ listing.type | capitalize }}</p>
                                <p><strong>Street:</strong> {{ listing.street }}</p>
                                <p><strong>City:</strong> {{ listing.city }}</p>
                                <p><strong>State:</strong> CA </p>
                                <p><strong>ZIP:</strong> {{ listing.zip }} </p>
                            </div>
                            <div class="col">
                                <p><strong>Rent:</strong> ${{ listing.rent }} / Month</p>
                                <p><strong>Bedrooms:</strong> {{ listing.bedrooms }}</p>
                                <p><strong>Bathrooms:</strong> {{ listing.bathrooms }}</p>
                                <p><strong>Distance From Campus:</strong> {{ listing.distance_from_campus | subjectVerbMiles }} </p>
                                <p><strong>Commute Time to Campus:</strong> {{ listing.commute_time_to_campus | subjectVerbMinutes }} </p>
                            </div>
                        </div>
                        <p class="ml-4"><strong>Full Address:</strong> {{ listing.street }}, {{ listing.city }}, CA, {{ listing.zip }}</p>
                        <p class="ml-4"><strong>Description:</strong> {{ listing.description }}</p>
                        <p class="ml-4"><strong>Date Added:</strong> {{ listing.date }}</p>

                        <div class="container">
                            <!-- text area -->
                            <div v-if="this.loggedIn" class="mt-5">
                                <transition appear enter-active-class="animated zoomIn faster">
                                    <div class="form-group">
                                        <textarea class="form-control" rows="4" :value="this.message"></textarea>
                                    </div>
                                </transition>
                            </div>

                            <!-- buttons -->
                            <transition appear name="smooth" enter-active-class="animated flipInX faster">
                                <div v-if="!this.loggedIn" key="1">
                                    <div class="row text-center mt-5">
                                        <div class="col">
                                            <button class="btn btn-secondary btn-lg btn-block" @click="goBack"> Go Back </button>
                                        </div>
                                        <div class="col">
                                            <button class="btn btn-primary btn-lg btn-block" @click="contactLandlord"> Contact Landlord </button>
                                        </div>
                                    </div>
                                </div>
                                <div v-else key="2">
                                    <div class="row text-center mt-5">
                                        <div class="col">
                                            <button class="btn btn-warning btn-lg btn-block" @click="cancel"> Cancel </button>
                                        </div>
                                        <div class="col">
                                            <button class="btn btn-success btn-lg btn-block" @click="sendMessage"> Send Message </button>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- google maps -->
                <div class="col-12 col-lg-4">
                    <gatorlist-google-maps 
                        :lat='37.7749' 
                        :lng='-122.4194' 
                        :zoom='12' 
                        gestureHandling='cooperative' 
                        class="mapStyle mb-5 mx-auto">
                    </gatorlist-google-maps>
                </div>

            </div>
        </div>
        <div v-else>
            <fingerprint-spinner class="d-flex justify-content-center w-100 mt-5"
                :size="300"
                color="#8d3dc6"
            />
        </div>
    </div>
</template>

<script>
    import { FingerprintSpinner } from 'epic-spinners';
    import GoogleMaps from './GoogleMaps.vue';

    export default {
        data(){
            return {
                listing: null,
                loading: true, 
                loggedIn: false,  
                message: "Hello, I'm sincerely interested in your property. Please message me back when you get the time. Thank You.",
            }
        },
        beforeCreate(){
            // extract from DB before component is created
            const endpoint = '/api/listings?id=' + this.$route.params.id;
            axios.get(endpoint)
                .then(res => {
                    this.listing = res.data[0];
                    this.loading = false;
                    console.log(this.listing);
                })
                .catch(() => {
                    console.log('Error retrieving from ', endpoint);
                });

        },
        components: {
            FingerprintSpinner,
            'gatorlist-google-maps': GoogleMaps,
        },
        methods: {
            goBack(){
                // redirect to home page when search is updated
                this.$router.push({name: 'home'});
            },
            contactLandlord(){
                this.loggedIn = true;
            },
            cancel(){
                this.loggedIn = false;
            },
            sendMessage(){
                console.log("test");
            }
        },
    }
</script>


<style scoped>
    .text-size{
        font-size: .9rem;
    }
    strong{
        font-size: 1.05rem;
    }
    img{
        border: 1px solid grey;
        box-shadow: 0 1px 10px black;
        -moz-box-shadow: 0 1px 10px black;
        -webkit-box-shadow: 0 1px 10px black;
    }
    .mapStyle {
        width: 100%;
        height: 50vh;
        border-radius: 5px;
    }
    .smooth-leave-active{
        opacity: 0;
    }
    .smooth-move{
        transition: all .5s;
    }
</style>
