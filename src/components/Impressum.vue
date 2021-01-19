<template>
    <v-container class="pa-10">

        <v-btn @click="back" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>


        <v-col class="col-12 mt-6">
            <h1 class="mb-10 headingsize">{{ $t('site.imprint.title') }}</h1>
            <p class="mb-1" style="margin-top: -35px">
            </p>
            <div class="mt-12 normaltextsize">
                <p> {{ $t('site.imprint.description') }}</p>
                <p> Team ROS </p>
                <p class="ma-0"> Rennweg 89B</p>
                <p class="ma-0"> 1030 {{ $t('site.imprint.city') }}</p>
                <p> {{ $t('site.imprint.country') }}</p>

                <p class="ma-0"> {{ $t('site.imprint.email') }}: team@ros-cloud.at</p>
                <p class="ma-0"> Internet: www.ros-cloud.at</p>
            </div>
            <div class="mt-12 normaltextsize">
                <p> {{ $t('site.imprint.questions') }} </p>
            </div>

            <v-col class="col-12 mt-12 text-center">
                <img width="30%" src="../assets/ROS_Logo.png"/>
            </v-col>


        </v-col>

    </v-container>
</template>

<script>
export default {
    name: "Impressum",
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