<template>
  <div>
    <DashboardHeader style="position: fixed; top: 0"></DashboardHeader>
    <DashboardMain style="margin-top: 130px"></DashboardMain>
    <DashboardFooter style="position: fixed; bottom: 0"></DashboardFooter>
    </div>
</template>

<script>
import DashboardHeader from "../components/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";
import DashboardMain from "../components/DashboardMain";

export default {
  data() {
    return {};
  },

  components: {
    DashboardHeader,
    DashboardFooter,
    DashboardMain
  }
};
</script>