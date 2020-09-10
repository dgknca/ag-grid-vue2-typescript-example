<template>
  <div class="modal">
    <apexchart
      width="610"
      height="180"
      type="bar"
      :options="options"
      :series="series"
      ref="realtimeChart"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import VueApexCharts from "vue-apexcharts";
import ApexChartProperties from "@/mixins/apexChartProperties.ts";

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class Modal extends Mixins(ApexChartProperties) {}
</script>

<style lang="scss" scoped>
.modal {
  display: inline-block;
  background: #fff;
  padding: 30px;
  margin-top: 50px;
  border-radius: var(--container-radius);
  box-shadow: var(--container-shadow);
}
</style>
