<template>
  <div class="overlay" @click.self="closeModal">
    <div class="modal">
      <h2>SEARCH VOLUME</h2>
      <div class="close" @click="closeModal">
        <SVGClose />
      </div>
      <div class="chart">
        <ApexChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ApexChart from '@/components/ApexChart.vue'
import SVGClose from '@/svg/svg-close.vue'

@Component({
  components: {
    ApexChart,
    SVGClose
  }
})
export default class Modal extends Vue {
  public closeModal(): void {
    this.$store.state.isChartModalActive = false
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(#000, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  display: inline-block;
  background: #fff;
  padding: 30px;
  margin-top: 50px;
  border-radius: var(--container-radius);
  box-shadow: var(--container-shadow);
  position: relative;
}

.close {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}

.chart {
  margin-top: 30px;
}

h2 {
  color: var(--gray3);
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  padding: 0;
}
</style>
