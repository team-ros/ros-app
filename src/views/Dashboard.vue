<template>
  <div>
    <DashboardMain style="margin-top: 130px"></DashboardMain>
    <DashboardFooter style="position: fixed; bottom: 0"></DashboardFooter>
    </div>
</template>

<script>
import DashboardFooter from "../components/DashboardFooter";
import DashboardMain from "../components/DashboardMain";

export default {
  data() {
    return {};
  },

  components: {
    DashboardFooter,
    DashboardMain
  }
};
</script>