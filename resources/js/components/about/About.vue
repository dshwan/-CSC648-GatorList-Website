<template>
    <div>
        <h1 class="display-4 text-center mb-5">
            About the Team
        </h1>

        <!-- card section, load appropriate cards (Team Lead, Frontend, Backend)-->
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <transition appear enter-active-class="animated fadeInLeft">
                        <gatorlist-team-lead-card/>
                    </transition>
                </div>
                <div class="col-lg-4">
                    <transition appear enter-active-class="animated fadeInUp">
                        <gatorlist-team-frontend-card/>
                    </transition>
                </div>
                <div class="col-lg-4">
                    <transition appear enter-active-class="animated fadeInRight">
                        <gatorlist-team-backend-card/>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import TeamLeadCard from './TeamLeadCard.vue';
    import TeamFrontendCard from './TeamFrontendCard.vue';
    import TeamBackendCard from './TeamBackendCard.vue';

    export default{
        data: function () {
            return {
                showAboutHomePage: true,
                selectedComponent: '',
            }
        },
        components: {
            'gatorlist-team-lead-card': TeamLeadCard,
            'gatorlist-team-frontend-card': TeamFrontendCard,
            'gatorlist-team-backend-card': TeamBackendCard,
        },
    }
    
</script>