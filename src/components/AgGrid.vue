<template>
  <div>
    <input
      type="text"
      class="search-any-column"
      v-model="inputText"
      @input="onFilterChanged"
      placeholder="Filter any column"
    />
    <ag-grid-vue
      style="width: 1100px; height: 500px;"
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :headerHeight="headerHeight"
      :icons="icons"
      :pagination="pagination"
      :paginationPageSize="pageSize"
      :modules="modules"
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
              <span v-bind="pageSelectAttributes">
                <SVGChevronDown />
              </span>
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
          of
          <span class="pg-row-summary-panel-number" id="totalPage">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator'
import { AgGridVue } from '@ag-grid-community/vue'
import { LicenseManager } from '@ag-grid-enterprise/core'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { SetFilterModule } from '@ag-grid-enterprise/set-filter'
import { MenuModule } from '@ag-grid-enterprise/menu'
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel'
import vSelect from 'vue-select'

import FetchData from '@/mixins/fetchData.ts'
import NumFormetter from '@/mixins/numFormatter.ts'

import SVGChevronLeft from '@/svg/svg-chevron-left.vue'
import SVGChevronRight from '@/svg/svg-chevron-right.vue'
import SVGChevronDown from '@/svg/svg-chevron-down.vue'
import SVGVolume from '@/svg/svg-volume.vue'
import SVGStar from '@/svg/svg-star.vue'

@Component({
  components: {
    AgGridVue,
    SVGChevronLeft,
    SVGChevronRight,
    SVGChevronDown,
    SVGVolume,
    SVGStar,
    vSelect
  }
})
export default class Home extends Mixins(FetchData, NumFormetter) {
  columnDefs: any = null
  rowData: any = null
  gridApi: any = null
  columnApi: any = null
  defaultColDef: any = null
  headerHeight: any = null
  icons: any = null
  pageSize = '20'
  pagination = true
  modules = [
    ClientSideRowModelModule,
    SetFilterModule,
    MenuModule,
    FiltersToolPanelModule
  ]
  inputText = ''

  beforeMount() {
    this.headerHeight = 38

    this.defaultColDef = {
      editable: false,
      sortable: true,
      unSortIcon: true,
      resizable: false,
      minWidth: 110,
      floatingFilter: true
      // filterOptions: 'contains'
    }

    this.columnDefs = [
      {
        headerName: 'keywords',
        headerClass: 'header-text-left',
        field: 'keyword',
        width: 150,
        suppressSizeToFit: true,
        pinned: 'left',
        sortable: false,
        cellClass: 'grid-cell-keywords',
        filter: 'agTextColumnFilter',
        filterParams: this.searchFilterParams
      },
      {
        headerName: 'search volume',
        field: 'avgSearchVolume',
        width: 170,
        suppressSizeToFit: true,
        cellRenderer: this.searchVolumeRenderer,
        cellClass: 'grid-cell-searchvolume',
        filter: 'agNumberColumnFilter'
      },
      {
        headerName: 'rank',
        field: 'rank',
        cellRenderer: this.rankRenderer,
        cellClass: 'grid-cell-rank',
        filter: 'agNumberColumnFilter',
        filterOptions: 'greaterThan'
      },
      {
        headerName: 'change',
        field: 'diffRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffRank',
        filter: 'agNumberColumnFilter',
        filterOptions: 'greaterThan'
      },
      {
        headerName: 'px rank',
        field: 'pixelRank',
        cellRenderer: this.pixelRankRenderer,
        cellClass: 'grid-cell-pixelRank',
        filter: 'agNumberColumnFilter',
        filterOptions: 'greaterThan'
      },
      {
        headerName: 'change',
        field: 'diffPixelRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffPixelRank',
        filter: 'agNumberColumnFilter',
        filterOptions: 'greaterThan'
      },
      {
        headerName: 'url page',
        field: 'landingPage',
        sortable: false,
        width: 300,
        flex: 1,
        suppressSizeToFit: true,
        headerClass: 'header-text-left',
        cellRenderer: this.urlPageRenderer,
        cellClass: 'grid-cell-urlpage',
        filter: 'agTextColumnFilter',
        filterParams: this.searchFilterParams
      },
      {
        headerName: 'cpc - $',
        field: 'cpc',
        cellRenderer: this.cpcRenderer,
        cellClass: 'grid-cell-centered',
        filter: 'agNumberColumnFilter',
        filterOptions: 'greaterThan'
      }
    ]

    this.icons = {
      sortUnSort:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortAscending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#9999CC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortDescending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#9999CC" /></svg>'
    }

    this.fetchData(
      'http://95.217.76.23:5454/api/list_keyword_info_for_domain',
      '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"100", "page": 3 }'
    ).then(res => (this.rowData = res))
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api
    this.gridApi.sizeColumnsToFit()

    LicenseManager.setLicenseKey(
      'For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-7_November_2020_[v2]_MTYwNDcwNzIwMDAwMA==e092019c061c6f309c36d9ef6026a1b6'
    )
  }

  public onCellClicked(event: any): void {
    if (
      event.column.colId == 'keyword' ||
      event.column.colId == 'avgSearchVolume'
    ) {
      this.$store.state.clickedKeywords = event.node.data.keyword

      this.fetchData(
        'http://95.217.76.23:5454/api/get_specific_search_volume',
        `{"country": "tr", "lang": "tr", "keyword": "${event.node.data.keyword}" }`
      ).then(res => {
        this.$store.commit('setSeries', res)
        this.$store.commit('setCategories', res)
        this.$store.state.isChartModalActive = true
      })
    }
  }

  searchFilterParams = {
    filterOptions: ['contains'],
    textFormatter: function(r: any) {
      if (r == null) return null
      return r.toLowerCase()
    },
    debounceMs: 0,
    suppressAndOrCondition: true
  }

  public onFilterChanged(): void {
    this.gridApi.setQuickFilter(this.inputText)
  }

  /*
  ======================
    Custom Pagination
  ======================
  */

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

  pageSelectOptions = [10, 20, 50]
  pageSelectAttributes: any = {
    ref: 'openIndicator',
    role: 'presentation',
    class: 'vs__open-indicator'
  }

  /*
  ======================
      Cell Renderers
  ======================
  */

  public searchVolumeRenderer(params: any): string {
    const value = params.value
    const ComponentClass = Vue.extend(SVGVolume)
    const icon = new ComponentClass().$mount().$el
    const wrapper = document.createElement('span')
    wrapper.appendChild(icon)

    if (value < 1000) {
      wrapper.classList.add('vol1')
    } else if (value >= 1000 && value <= 10000) {
      wrapper.classList.add('vol2')
    } else if (value >= 10000 && value <= 50000) {
      wrapper.classList.add('vol3')
    } else if (value >= 50000 && value <= 100000) {
      wrapper.classList.add('vol4')
    }

    const transporterDiv = document.createElement('div')
    transporterDiv.appendChild(wrapper)

    return transporterDiv.innerHTML + value
  }

  public rankRenderer(params: any): string {
    const ComponentClass = Vue.extend(SVGStar)
    const icon = new ComponentClass().$mount().$el
    const value = params.value
    const transporterDiv = document.createElement('div')
    transporterDiv.appendChild(icon)

    return value + transporterDiv.innerHTML
  }

  public pixelRankRenderer(params: any): string {
    return this.numFormatter(params.value)
  }

  public diffRenderer(params: any): string {
    return params.value
  }

  public urlPageRenderer(params: any): string {
    return `<a href="${params.value}" target="_blank">${params.value}</a>`
  }

  public cpcRenderer(params: any): string {
    return params.value.toFixed(2)
  }
}
</script>

<style lang="scss">
.search-any-column {
  height: var(--cell-height);
  width: 300px;
  background: var(--white);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  margin-bottom: 15px;
  outline: none;
  padding: 0 10px;
  color: var(--gray4);
  font-weight: 500;

  &::placeholder {
    font-weight: 400;
  }
}
</style>
