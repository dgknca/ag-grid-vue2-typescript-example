<template>
  <div class="home">
    <div class="grid-container">
      <h1>Zeo Interview</h1>
      <ag-grid-vue
        style="width: 1100px; height: 500px;"
        class="ag-theme-alpine"
        :rowData="rowData"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        @cell-clicked="onCellClicked"
        @row-clicked="onRowClicked"
        :gridOptions="gridOptions"
        :defaultColDef="defaultColDef"
        :headerHeight="headerHeight"
        :icons="icons"
      ></ag-grid-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator";
import AgGridProperties from "@/mixins/agGridProperties.ts";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

@Component({
  components: {
    AgGridVue
  }
})
export default class Home extends Mixins(AgGridProperties) {}
</script>

<style lang="scss" scoped>
.grid-container {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(#31314d, 0.04);
}

h1 {
  color: var(--gray4);
  font-weight: 600;
  font-size: 24px;
}
</style>

<style lang="scss">
@import "../styles/app";
</style>
