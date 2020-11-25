<template>
    <v-container class="pa-10">

        <v-btn @click="back" icon>
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>


        <v-col class="col-12 mt-6">
            <h1 class="mb-10 headingsize">Impressum</h1>
            <p class="mb-1" style="margin-top: -35px">
            </p>
            <div class="mt-12 normaltextsize">
                <p> Für diese App verantwortlicher Herausgeber:</p>
                <p> Team ROS </p>
                <p class="ma-0"> Rennweg 89B</p>
                <p class="ma-0"> 1030 Wien</p>
                <p> Österreich</p>

                <p class="ma-0"> E-Mail: team@ros-cloud.at</p>
                <p class="ma-0"> Internet: www.ros-cloud.at</p>
            </div>
            <div class="mt-12 normaltextsize">
                <p> Für etwaige Fragen wenden Sie sich an den Support unter der E-Mail-Adresse:
                    info@ros-cloud.at </p>
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