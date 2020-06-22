<template>
  <div>
    <DashboardHeader></DashboardHeader>

    <p style="margin-top: 50px;">
      {{this.$cookies.get("user")}}
    </p>

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