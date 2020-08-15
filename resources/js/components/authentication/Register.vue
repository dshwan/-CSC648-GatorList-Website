<template>
    <div>
        <div class="login d-flex justify-content-center align-items-center">
            <h1>
                Register
            </h1>
        </div>

        <form @submit.prevent="submit">
            <div class="form-content">
                <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group margin-top">
                            <label for="firstName">First Name:</label>
                            <input type="text" class="form-control" id="firstName" placeholder="First Name" v-model='firstName'>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Last Name" v-model='lastName'>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center pt-4">
                    <div class="col-10">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" placeholder="Username" v-model='username'>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="Password" v-model='password'>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-10">
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password:</label>
                            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" v-model='confirmPassword'>
                        </div>
                    </div>
                </div>

                <div class="ml-5 my-3">
                    <!-- terms and services -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="accept" id="accept" v-model='agreeAndAccept'>
                        <label class="form-check-label" for="accept">
                            Accept Terms and Conditions
                        </label>
                    </div>
                    <div class="form-check mb-4">
                        <input class="form-check-input" type="checkbox" value="agree" id="agree" v-model='agreeAndAccept'>
                        <label class="form-check-label" for="agree">
                            Agree to Post Ethical Content
                        </label>
                    </div>
                </div>

                <!-- submit -->
                <div class="d-flex justify-content-center margin-top-button">
                    <button type="submit" class="btn btn-outline-dark btn-lg btn-block" :disabled='$v.$invalid'>Submit</button>
                </div>

                <div v-if="loading" class="mt-3 d-flex justify-content-center">
                    <looping-rhombuses-spinner
                        :animation-duration="2000"
                        :rhombus-size="25"
                        color="#22682d"
                    />
                </div>
            </div>
            <!-- recaptcha -->
            <vue-recaptcha 
                ref="recaptcha"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                size="invisible"
                sitekey="6Lfz-6MUAAAAAPqIsnKhdnbNhe2Ut4PJwTtaq_zj">
            </vue-recaptcha>
        </form>
    </div>
</template>

<script>
    import { required, sameAs, minLength } from 'vuelidate/lib/validators';
    import VueRecaptcha from 'vue-recaptcha';
    import { LoopingRhombusesSpinner } from 'epic-spinners'
    import axios from 'axios';

    export default {
        data: function(){
            return {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                confirmPassword: '',
                agreeAndAccept: [],
                loading: false,
            }
        },
        validations: {
            firstName: {
                required
            },
            lastName: {
                required
            },
            username: {
                required
            },
            password: {
                required
            },
            confirmPassword: {
                required,
                matchText: sameAs('password'),
            },
            agreeAndAccept: {
                required,
                length: minLength(2),
            }
        },
        components: {
            VueRecaptcha,
            LoopingRhombusesSpinner,
        },
        methods: {
            submit() {
                this.$refs.recaptcha.execute();
            },
            onCaptchaVerified(reCaptchaToken){
                this.loading = true;
                this.$refs.recaptcha.reset();

                axios.post('/api/register', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    password: this.password,
                    reCaptchaToken,
                }).then(response => {
                    // redirect to login
                    this.$router.push({name: 'login'});
                }).catch(error => {
                    console.log(error)
                });
            },
            onCaptchaExpired() {
                this.$refs.recaptcha.reset();
            }
        }

    }
</script>


<style scoped>
    .margin-top{
        margin-top: 125px;
    }
    .login{
        max-width: 350px;
        width: 70%;
        height: 150px;
        border: 1px solid black;
        border-radius: 5px;
        margin: auto;
        color: white;
        background-image: radial-gradient(circle, #22682d, #275e32, #2b5436, #304a38, #344038);
        /* background-color: #343a40; */
        box-shadow: 0 2px 10px black;
        -moz-box-shadow: 0 2px 10px black;
        -webkit-box-shadow: 0 2px 10px black;
        z-index: 1;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%)
    }
    
    .form-content{
        max-width: 500px;
        width: 90%;
        height: 700px;
        border-radius: 5px;
        margin: 50px auto;
        border: 1px solid grey;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-color: white;
        box-shadow: 0 1px 10px grey;
        -moz-box-shadow: 0 1px 10px grey;
        -webkit-box-shadow: 0 1px 10px grey;
    }
    .btn-outline-dark{
        border: none;
    }
</style>
