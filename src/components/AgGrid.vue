<template>
  <div>
    <ag-grid-vue
      style="width: 1100px; height: 500px;"
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
      :gridOptions="gridOptions"
      :defaultColDef="defaultColDef"
      :headerHeight="headerHeight"
      :icons="icons"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { Component, Vue, Mixins } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import AgGridProperties from '@/mixins/agGridProperties.ts'

@Component({
  components: {
    AgGridVue
  }
})
export default class Home extends Mixins(AgGridProperties) {}
</script>
