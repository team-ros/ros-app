<template>
  <v-container>
    <DashboardHeader></DashboardHeader>
    <DashboardFooter></DashboardFooter>
  </v-container>
</template>

<script>
import DashboardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";

export default {
  data() {
    return {};
  },
  components: {
    DashboardHeader,
    DashboardFooter
  }
};
</script>