<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <gatorlist-listings></gatorlist-listings>
            </div>
            <!-- <div class="col border-left hide">
                <gatorlist-google-maps 
                    :lat='37.7749' 
                    :lng='-122.4194' 
                    :zoom='12' 
                    gestureHandling='cooperative' 
                    class="mapStyle">
                </gatorlist-google-maps>
            </div> -->
        </div>
    </div>
</template>

<script>
    import Listings from './search/Listings.vue'
    // import GoogleMaps from './search/GoogleMaps.vue'

    export default {
        components: {
            'gatorlist-listings': Listings,
            // 'gatorlist-google-maps': GoogleMaps,
        }
    }
</script>


<style>
    /* .mapStyle {
        position: fixed;
        top: 14px;
        width: 100%;
        height: 96vh;
    } */
    /* @media only screen and (max-width: 992px) {
        .hide{
            display: none;
        }
    } */
</style>
