<template>
  <div>
    <div v-if="loading" class="d-flex justify-content-center margin-top">
      <orbit-spinner
        :animation-duration="1200"
        :size="200"
        color="orange"
      />
    </div>

    <div v-else class="mt-5">
      <div class="row">
        <div class="col-md-6 mb-4">
          <!-- Details -->
          <h5 class="text-center">
            <strong>
              {{ listing.type | capitalize }} Details
            </strong>
          </h5>
          <hr class="w-50"/>
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
        </div>

        <!-- Image & Google Maps -->
        <div class="col-md-6">
          <img :src="listing.image" class="rounded mx-auto d-block img-fluid w-75 mb-5">

          <google-maps 
            :lat='37.7749' 
            :lng='-122.4194' 
            :zoom='12' 
            gestureHandling='cooperative' 
            class="mapStyle mb-5 w-75 mx-auto">
          </google-maps>
        </div>
      </div>

      <div class="ui large buttons mb-4 d-flex justify-content-center">
        <button class="ui red button" @click="approveListing(false)">
          <i class="fas fa-times"></i> 
          <span class="ml-2">Disapprove</span>
        </button>
        <div class="or"></div>
        <button class="ui green button" @click="approveListing(true)">
          <i class="fas fa-check"></i> 
          <span class="ml-2">Approve</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { OrbitSpinner } from 'epic-spinners';
  import GoogleMaps from '../../search/GoogleMaps.vue';

  export default {
    data() {
      return{
        loading: true,
        listing: [],
      }
    },
    components: {
      OrbitSpinner,
      GoogleMaps,
    },
    beforeCreate() {
      axios.get(`/api/listings?pending=1&id=${this.$route.params.id}`)
        .then(res => {
          this.listing = res.data[0];
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        })
    },
    methods: {
      approveListing(approved){
        console.log(approved);
        axios.post('/api/listings', {
          id: this.$route.params.id,
          approved,
        }).then(response => {
          this.$router.push('/account/adminPanel');
          }).catch(error => {
            console.log(error)
          })
      },
    },
  }
</script>

<style scoped>
  .margin-top{
    margin-top: 150px;
  }
  img{
    border: 1px solid grey;
    box-shadow: 0 1px 10px black;
    -moz-box-shadow: 0 1px 10px black;
    -webkit-box-shadow: 0 1px 10px black;
  }
  .mapStyle {
    width: 100%;
    height: 40vh;
    border-radius: 5px;
  }
</style>