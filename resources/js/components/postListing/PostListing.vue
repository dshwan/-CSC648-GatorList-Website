<template>
    <div class="mt-5">
        <div class="form-title d-flex justify-content-center align-items-center">
            <h1>Post Listing</h1>
        </div>

        <div class="form-content justify-content-between">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
    .form-title{
        max-width: 400px;
        width: 70%;
        height: 150px;
        border: 1px solid black;
        border-radius: 5px;
        margin: auto;
        color: white;
        /* background-image: linear-gradient(to left top, #a8eb12, #e29f14, #ce6250, #864761, #3b3440); */
        background-color: #343a40;
        box-shadow: 0 2px 10px black;
        -moz-box-shadow: 0 2px 10px black;
        -webkit-box-shadow: 0 2px 10px black;
        z-index: 2;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .form-content{
        max-width: 750px;
        width: 90%;
        height: cover;
        border-radius: 5px;
        margin: 50px auto;
        border: 1px solid grey;
        z-index: 1;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-color: white;
        box-shadow: 0 1px 10px grey;
        -moz-box-shadow: 0 1px 10px grey;
        -webkit-box-shadow: 0 1px 10px grey;
    }
</style>

