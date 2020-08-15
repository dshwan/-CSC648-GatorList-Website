<template>
    <div>
        <div class="card text-white bg-dark mb-5">
            <h5 class="card-header text-center">{{ employees.role }}</h5>
            <div class="card-body text-center">
                <router-link :to='employees.link' class="ui inverted purple button small w-75 mx-auto name-of-person my-2">{{ employees.name }}</router-link>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data: function () {
            return{
                employees:{
                    role: 'Team Lead',
                    name: 'Karuna Nagesh Nayak',
                    component: 'gatorlist-karuna-component',   
                    link: '/about/karuna',
                }
            }
        },
    }
</script>

<style scoped>
    /* restrict the size of the buttons that route to individual pages */
    .name-of-person {
        max-width: 300px;
    }

    /* control size and color of cards */
    .card {
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0px 2px 10px black;
        -moz-box-shadow: 0 2px 10px black;
        -webkit-box-shadow: 0 2px 10px black;

    }
    .card-body {
        background-color: rgba(255, 255, 255, 0.050);
    }
</style>