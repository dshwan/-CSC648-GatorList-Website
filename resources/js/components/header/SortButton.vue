<template>
  <select class="form-control btn btn-dark" name="sort" v-model='sort'>
      <option disabled value="">Sort</option>
      <option v-for='(sort, index) in sortList' :key='index'> {{ sort }} </option>
  </select>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        sortList: ['Most Recent', 'Distance to Campus', 'Commute Time', 'Max Price', 'Min Price'],
        sort: '',
      }
    },
    beforeUpdate() {
      
    },
    computed: {
      ...mapGetters(['getAllListings']),
    },
    watch:{
      sort(){
        switch(this.sort){
          case 'Most Recent':
            this.getAllListings.sort((a, b) => b.date.localeCompare(a.date));
            break;
          case 'Distance to Campus':
            this.getAllListings.sort((a, b) => a.distance_from_campus - b.distance_from_campus);
            break;
          case 'Commute Time':
            this.getAllListings.sort((a, b) => a.commute_time_to_campus - b.commute_time_to_campus);
            break;
          case 'Max Price':
            this.getAllListings.sort((a, b) => b.rent - a.rent);
            break;
          case 'Min Price':
            this.getAllListings.sort((a, b) => a.rent - b.rent);
            break;
        }
      }
    }

  }
</script>
