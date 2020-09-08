<template>
  <div class="home">
    <div class="grid-container">
      <h1>Zeo Interview</h1>
      <SVGVolume />
      <ag-grid-vue
        style="width: 1000px; height: 500px;"
        class="ag-theme-alpine"
        :rowData="rowData"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        @cell-clicked="onCellClicked"
        :gridOptions="gridOptions"
        :defaultColDef="defaultColDef"
      ></ag-grid-vue>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue'
import axios from 'axios'

import SVGVolume from '@/svg/svg-volume.vue'

@Component({
  components: {
    AgGridVue,
    SVGVolume
  }
})
export default class Home extends Vue {
  columnDefs: any = null
  rowData: any = null
  gridApi: any = null
  columnApi: any = null
  defaultColDef: any = null

  gridOptions: any = {
    pagination: true,
    paginationPageSize: 20
    // paginationAutoPageSize: true
  }

  listOfKeywords = 'http://95.217.76.23:5454/api/list_keyword_info_for_domain'
  listEx =
    '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"60", "page": 3 }'
  searchVolumeOfKeywords =
    'http://95.217.76.23:5454/api/get_specific_search_volume'

  beforeMount() {
    this.columnDefs = [
      {
        headerName: 'keywords',
        field: 'keyword',
        width: 200,
        suppressSizeToFit: true,
        pinned: 'left'
      },
      {
        headerName: 'search volume',
        field: 'avgSearchVolume',
        sortable: true,
        unSortIcon: true,
        cellRenderer: this.searchVolumeRenderer
      },
      { headerName: 'rank', field: 'rank', sortable: true, unSortIcon: true },
      {
        headerName: 'change',
        field: 'diffRank',
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: 'px rank',
        field: 'pixelRank',
        sortable: true,
        unSortIcon: true
      },
      {
        headerName: 'change',
        field: 'diffPixelRank',
        sortable: true,
        unSortIcon: true
      },
      { headerName: 'url page', field: 'landingPage' },
      { headerName: 'cpc - $', field: 'cpc', sortable: true, unSortIcon: true }
    ]

    this.defaultColDef = {
      editable: false,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: false,
      resizable: true
    }

    this.fetchData()
  }

  public fetchData(): void {
    axios
      .post(this.listOfKeywords, this.listEx)
      .then(response => {
        console.log(response.data)
        this.rowData = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api
    params.api.sizeColumnsToFit()
  }

  public onCellClicked(event: any): void {
    console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field)
    console.log(event.value.split(' '))
    console.log('cell clicked')
  }

  public searchVolumeRenderer(params: any): string {
    const ComponentClass = Vue.extend(SVGVolume)
    const myicon = new ComponentClass().$mount().$el.innerHTML

    return myicon + params.value
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(#31314d, 0.04);
}
</style>

<style lang="scss">
@import '../styles/variables';
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500&display=swap');

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  background: var(--gray1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Barlow', sans-serif;
}

.ag-theme-alpine {
  .ag-root-wrapper {
    border: none;
    border-radius: 3px;
  }
  .ag-header {
    background: var(--gray1);
    border-bottom-color: var(--border-color);
  }
  .ag-header-cell-text {
    text-transform: uppercase;
    font-weight: 500;
    color: var(--gray3);
  }
  .ag-cell-value {
    color: var(--gray4);
    font-weight: 400;
    font-size: 14px;
  }
  .ag-row {
    height: var(--cell-height);
    border: none !important;
    border-bottom: 1px solid var(--border-color) !important;

    &-odd {
      background: #fff;
    }
  }
  .ag-cell {
    line-height: var(--cell-height);
  }
  .ag-pinned-left-header,
  .ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(.ag-cell-range-single-cell) {
    border-right-color: var(--border-color);
  }
}
</style>
