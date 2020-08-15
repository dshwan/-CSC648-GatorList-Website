<template>
    <div class="container"> 
        <h3 class="text-center mt-4">User Details</h3>
        <hr class="w-75 text-center mt-2 mb-4"/>
        <div class="row my-4">
            <div class="col">
                <strong>First Name:</strong>
            </div>
            <div class="col">
                {{ this.getUser.firstName }}
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <strong>Last Name:</strong>
            </div>
            <div class="col">
                {{ this.getUser.lastName }}
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <strong>Username:</strong>
            </div>
            <div class="col">
                {{ this.getUser.userName }}
            </div>
        </div>
        <div class="row my-4">
            <div class="col">
                <strong>Account Created:</strong>
            </div>
            <div class="col">
                {{ this.getUser.accountCreation }}
            </div>
        </div>
    </div> 
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                // get user from Vuex
                'getUser'
            ]),
        },
    }
</script>
