<template>
    <div id="Map" class="position-sticky my-2"></div>
</template>

<script>
    export default {
        props: {
            lat: Number,
            lng: Number,
            zoom: Number,
            gestureHandling: String
        },
        mounted() {
            this.map = new google.maps.Map(document.getElementById('Map'), {
                center: {lat:this.$props.lat, lng: this.$props.lng},
                zoom: this.$props.zoom,
                gestureHandling: this.$props.gestureHandling,
            })

            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: {lat:this.$props.lat, lng: this.$props.lng}
            });
        }
    }
</script>

<style scoped>
    #Map {
        border: 1px solid black;
        box-shadow: 0 1px 10px black;
        -moz-box-shadow: 0 1px 10px black;
        -webkit-box-shadow: 0 1px 10px black;
    }
</style>