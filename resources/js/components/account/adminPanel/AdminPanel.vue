<template>
  <div>
    <div v-if="loading" class="d-flex justify-content-center margin-top-loading">
      <self-building-square-spinner
        :animation-duration="2500"
        :size="150"
        color="#8d3dc6"
      />
    </div>
    <div v-else>
      <h5 class="text-center mb-4"> --- There are {{ allPendingListings.length | singularORplural }} pending --- </h5>
      <!-- listings -->
      <transition-group tag="div" class="card-deck" name='move' appear enter-active-class="animated fadeInUp faster">
        <div class="card mb-4" 
          v-for='listing in allPendingListings' 
          :key='listing.id'>
          <img class="card-img-top" :src="listing.image" alt="Card image cap">
          <div class="card-body py-3">
            <h5 class="card-title text-center mb-1"><strong>{{ listing.type.charAt(0).toUpperCase() + listing.type.slice(1) }}</strong></h5>
            <hr>
            <h5 class="card-title">Rent: <strong>${{ listing.rent }}</strong></h5>
            <div class="row">
              <div class="col">
                <p class="card-text"><i class="fas fa-bed"></i> Beds: {{ listing.bedrooms }}</p>
              </div>
              <div class="col">
                <p class="card-text"><i class="fas fa-bath"></i> Baths: {{ listing.bathrooms }}</p>
              </div>
            </div>
            <hr>
            <div class="card-text text-muted">{{ listing.street }},</div>
            <div class="card-text text-muted">{{ listing.city }}, CA {{ listing.zip }}</div>
          </div>
          <div class="card-footer">
            <button class="ui fluid inverted violet button" @click="viewListing(listing.id)"> Click to View </button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import { SelfBuildingSquareSpinner  } from 'epic-spinners'
  import axios from 'axios';

  export default {
    data() {
      return {
        loading: true,
        allPendingListings: [],
      }
    },
    components: {
      SelfBuildingSquareSpinner,
    },
    beforeCreate() {
      axios.get('/api/listings?pending=1')
        .then(response => {
          this.allPendingListings = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      viewListing(id){
        this.$router.push(`adminPanel/${id}`);
      }
    },
    filters: {
      singularORplural(value){
        if (value.length === 1) return String(value) + ' listing';
        return String(value) + ' listings';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card{
    box-shadow: 0 1px 10px black;
    -moz-box-shadow: 0 1px 10px black;
    -webkit-box-shadow: 0 1px 10px black;
    border: 1px solid grey;
  }

  .margin-top-loading{
    margin-top: 200px;
  }
  /* Bootstrap 4 breakpoints & gutter */
  $grid-breakpoints: (
    xs: 0,
    sm: 576px,
    md: 768px,
    lg: 992px,
    xl: 1200px
  ) !default;

  $grid-gutter-width: 30px !default;

  /* number of cards per line for each breakpoint */
  $cards-per-line: (
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  );

  @each $name, $breakpoint in $grid-breakpoints {
    @media (min-width: $breakpoint) {
      .card-deck .card {
        flex: 0 0 calc(#{100/map-get($cards-per-line, $name)}% - #{$grid-gutter-width});
      }
    }
  }
</style>
