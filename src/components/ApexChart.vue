<template>
  <div>
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
import VueApexCharts from 'vue-apexcharts'
import ApexChartProperties from '@/mixins/apexChartProperties.ts'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class ApexChart extends Mixins(ApexChartProperties) {}
</script>
