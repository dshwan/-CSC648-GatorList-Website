<template>
    <div>
        <div class="card text-white bg-dark mb-5">
            <h5 class="card-header text-center">{{ employees[0].role }}</h5>
            <div class="card-body text-center">
                <!-- iterate through frontend 'employees' and create appropriate buttons -->
                <div v-for='employee in employees' :key="employee.name">
                    <router-link :to='employee.link' class="ui inverted purple button small w-75 mx-auto name-of-person my-2">{{ employee.name }}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data: function () {
            return{
                employees: [{
                    role: 'Backend',
                    name: 'Daniel Mossaband',
                    component: 'gatorlist-daniel-component',
                    link: '/about/daniel',
                },{
                    role: 'Backend',
                    name: 'Gabriel Alfaro',
                    component: 'gatorlist-gabriel-component',
                    link: '/about/gabriel',
                },{
                    role: 'Backend',
                    name: 'Aditya Sheoran',
                    component: 'gatorlist-aditya-component',
                    link: '/about/aditya',
                }],
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