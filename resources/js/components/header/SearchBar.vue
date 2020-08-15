<template>
    <div class="container">
        <div class="form-row justify-content-center" >
            <div class="col-12 col-md-10 col-lg-8 justify-content-center pr-0 mr-0 pb-2">
                <form autocomplete="off">
                    <div class="ui icon input fluid">
                        <input type="text" v-model='search' placeholder="Address, City, Price, Type, ZIP" autocomplete="false">
                        <i class="search icon"></i>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        beforeUpdate() {
            // redirect to home page when search is updated
            this.$router.push({name: 'home'});
        },
        computed: {
            search: {
                get(){
                    // get search query from Vuex
                    return this.$store.getters.getSearch;
                },
                set(search){
                    // update search query to Vuex
                    this.$store.dispatch('mutateSearch', search)
                }
            }
        },
    }
</script>
