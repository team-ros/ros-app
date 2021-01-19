<template>
    <v-container class="pa-10">

        <v-btn @click="back" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>


        <v-col class="col-12 mt-6">
            <h1 class="mb-10 headingsize">Support</h1>
            <p class="mb-1" style="margin-top: -35px">
            </p>
            <div class="mt-12 normaltextsize">
              {{$t('site.support.description')}}            </div>
            <v-btn class="mt-12 rosblue" block depressed
            > <a style="color: #eeeeee" href="mailto:support@ros-cloud.at">{{$t('site.support.support_button')}} </a>
            </v-btn>

        </v-col>

    </v-container>
</template>

<script>
export default {
    name: "Support",
    data() {
        return {};
    },

    methods: {
        back: function () {

            this.$router.go(-1)

        }
    }

};
</script>

<style scoped>
</style>