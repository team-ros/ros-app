<template>
    <div v-if="this.$cookies.get('user') != undefined">
        <p>Dashboard</p>
        <p> {{this.$cookies.get('user').vorname}}</p>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {

            }
        },
        beforeCreate() {
            if(this.$cookies.get('user') == undefined) {
                this.$router.push("/Login")
            }
        }
    }
</script>

<style scoped>

</style>