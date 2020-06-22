<template>
  <div>
    <DashboardHeader></DashboardHeader>
    <DashboardFooter></DashboardFooter>
    </div>
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