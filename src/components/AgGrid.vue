<template>
  <div>
    <ag-grid-vue
      style="width: 1100px; height: 500px;"
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :gridOptions="gridOptions"
      :defaultColDef="defaultColDef"
      :headerHeight="headerHeight"
      :icons="icons"
      :paginationPageSize="pageSize"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
      @pagination-changed="onPaginationChanged"
    ></ag-grid-vue>
    <div class="custom-pagination">
      <div class="pg-content">
        <div class="pg-select">
          <div class="pg-select-label">Per page:</div>
          <v-select
            :options="pageSelectOptions"
            :clearable="false"
            :searchable="false"
            v-model="pageSize"
            @input="pageSizeChanged"
          >
            <template #open-indicator="{ pageSelectAttributes }">
              <span v-bind="pageSelectAttributes"><SVGChevronDown /></span>
            </template>
          </v-select>
        </div>
        <div class="pg-summary-panel">
          <div class="pg-btn pg-prev" @click="onBtPrev">
            <SVGChevronLeft />
          </div>
          <div class="pg-btn pg-current" id="currentPage">0</div>
          <div class="pg-btn pg-next" @click="onBtNext">
            <SVGChevronRight />
          </div>
        </div>
        <div class="pg-row-summary-panel">
          of <span class="pg-row-summary-panel-number" id="totalPage">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import AgGridProperties from '@/mixins/agGridProperties.ts'
import vSelect from 'vue-select'

import SVGChevronLeft from '@/svg/svg-chevron-left.vue'
import SVGChevronRight from '@/svg/svg-chevron-right.vue'
import SVGChevronDown from '@/svg/svg-chevron-down.vue'

@Component({
  components: {
    AgGridVue,
    SVGChevronLeft,
    SVGChevronRight,
    SVGChevronDown,
    vSelect
  }
})
export default class Home extends Mixins(AgGridProperties) {
  public onBtPrev(): void {
    this.gridApi.paginationGoToPreviousPage()
  }
  public onBtNext(): void {
    this.gridApi.paginationGoToNextPage()
  }

  public onPaginationChanged(): void {
    console.log('onPaginationPageLoaded')
    if (this.gridApi) {
      this.setText('#currentPage', this.gridApi.paginationGetCurrentPage() + 1)
      this.setText('#totalPage', this.gridApi.paginationGetTotalPages())
    }
  }

  public get currentpage(): string {
    return this.gridApi.paginationGetCurrentPage() + 1
  }

  public setText(selector: any, text: string): void {
    document.querySelector(selector).innerHTML = text
  }

  public pageSizeChanged(): void {
    this.gridApi.paginationSetPageSize(Number(this.pageSize))
  }

  pageSelectOptions = [10, 20, 30]
  pageSelectAttributes: any = {
    ref: 'openIndicator',
    role: 'presentation',
    class: 'vs__open-indicator'
  }
}
</script>

<style lang="scss" scoped>
.custom-pagination {
  width: 100%;
  height: var(--pagination-btn-height);
  display: flex;
  justify-content: flex-end;
  user-select: none;
  margin-top: 20px;

  .pg-content {
    display: flex;
    align-items: center;
  }

  .pg-summary-panel {
    display: flex;
    align-items: center;
  }

  .pg-btn {
    height: var(--pagination-btn-height);
    width: var(--pagination-btn-height);
    border: 1px solid var(--gray2);
    color: var(--gray3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 3px;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
  }

  .pg-prev,
  .pg-next {
    cursor: pointer;
  }

  .pg-current {
    width: 40px;
    border-color: var(--shade2);
    color: var(--gray4);
  }

  .pg-row-summary-panel {
    color: var(--gray4);
    font-weight: 500;
    font-size: 14px;
    padding-left: 10px;
  }

  .pg-select {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .pg-select-label {
    font-size: 14px;
    color: var(--gray4);
    font-weight: 500;
    margin-right: 10px;
  }
}
</style>
