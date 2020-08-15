<template>
    <div>   
        <div v-if='!this.getLoading'> 
            <!-- # Listings showing -->
            <div class="lead text-center mb-3">
                -- Showing {{ filteredListings.length }} out of {{ getAllListings.length }} Listings --
            </div>

            <!-- Individual listing cards -->
            <transition-group tag="div" class="card-deck" name='move' appear enter-active-class="animated fadeInUp faster">
                <div class="card mb-4" 
                    v-for='listing in filteredListings' 
                    :key='listing.id'
                    @click="openNewTab(listing.id)">
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
                </div>
            </transition-group>
        </div> 

        <div v-else class="d-flex justify-content-center align-items-center loading">
            <transition appear enter-active-class="animated fadeIn faster">
                <breeding-rhombus-spinner class="mt-5"
                    :animation-duration="1200"
                    :size="200"
                    color="#8d3dc6"
                />
            </transition>
        </div>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import { BreedingRhombusSpinner } from 'epic-spinners'


    export default {
        components: {
            BreedingRhombusSpinner, 
        },
        computed: {
            ...mapGetters([
                'getSearch', 'getAllListings', 'getLoading'
            ]),
            filteredListings() {
                return this.getAllListings.filter((element) => {
                    // filter through combined column created by the Backend team
                    return element.combined.toLowerCase().match(this.getSearch.toLowerCase());
                });
            }
        },
        methods: {
            openNewTab(id){
                this.$router.push('listing/' + id);
                // window.open('listing/' + id, "_blank");
            }
        }
    }
</script>

<style scoped lang='scss'>
    .loading{
        height: 50vh;
    }
    hr{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .card{
        box-shadow: 0 1px 10px black;
        -moz-box-shadow: 0 1px 10px black;
        -webkit-box-shadow: 0 1px 10px black;
        border: 1px solid grey;
    }

    .card:hover{
        cursor: pointer;
        box-shadow: 0 5px 20px black;
        -moz-box-shadow: 0 5px 20px black;
        -webkit-box-shadow: 0 5px 20px black;
        transform: scale(1.05); 
        transition: all .2s ease-in-out;
    }
    .move-leave-active{
        opacity: 0;
        position: absolute;
    }
    .move-move{
        transition: all .5s;
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
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
    );

    @each $name, $breakpoint in $grid-breakpoints {
        @media (min-width: $breakpoint) {
            .card-deck .card {
                flex: 0 0 calc(#{100/map-get($cards-per-line, $name)}% - #{$grid-gutter-width});
            }
        }
    }
</style>
