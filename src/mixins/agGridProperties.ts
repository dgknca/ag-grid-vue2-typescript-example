import { Component, Vue, Mixins } from 'vue-property-decorator'
import CellRenderers from '@/mixins/cellRenderers.ts'
import FetchData from '@/mixins/fetchData.ts'
// import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
// const apexStore = namespace('apexStore')

@Component
class AgGridProperties extends Mixins(CellRenderers, FetchData) {
  columnDefs: any = null
  rowData: any = null
  gridApi: any = null
  columnApi: any = null
  defaultColDef: any = null
  headerHeight: any = null
  icons: any = null

  // @apexStore.Mutation
  // public setSeries!: (newName: any) => void

  listOfKeywords = 'http://95.217.76.23:5454/api/list_keyword_info_for_domain'
  listEx =
    '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"60", "page": 3 }'

  gridOptions: any = {
    pagination: true,
    paginationPageSize: 20
    // paginationAutoPageSize: true
  }

  beforeMount() {
    this.columnDefs = [
      {
        headerName: 'keywords',
        headerClass: 'header-text-left',
        field: 'keyword',
        width: 150,
        suppressSizeToFit: true,
        pinned: 'left',
        sortable: false
      },
      {
        headerName: 'search volume',
        field: 'avgSearchVolume',
        width: 170,
        suppressSizeToFit: true,
        cellRenderer: this.searchVolumeRenderer,
        cellClass: 'grid-cell-searchvolume'
      },
      {
        headerName: 'rank',
        field: 'rank',
        cellRenderer: this.rankRenderer,
        cellClass: 'grid-cell-rank'
      },
      {
        headerName: 'change',
        field: 'diffRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffRank'
      },
      {
        headerName: 'px rank',
        field: 'pixelRank',
        cellRenderer: this.pixelRankRenderer,
        cellClass: 'grid-cell-pixelRank'
      },
      {
        headerName: 'change',
        field: 'diffPixelRank',
        cellRenderer: this.diffRenderer,
        cellClass: 'grid-cell-diff grid-cell-diffPixelRank'
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
        cellClass: 'grid-cell-urlpage'
      },
      {
        headerName: 'cpc - $',
        field: 'cpc',
        cellRenderer: this.cpcRenderer,
        cellClass: 'grid-cell-centered'
      }
    ]

    this.defaultColDef = {
      editable: false,
      sortable: true,
      unSortIcon: true,
      filter: false,
      resizable: false,
      minWidth: 110
    }

    this.headerHeight = 38

    this.icons = {
      previous:
        '<span class="ag-icon"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#9999CC" stroke-linecap="round" /></svg></span>',
      next:
        '<span class="ag-icon"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 13L7 7L1 1" stroke="#9999CC" stroke-linecap="round" /></svg></span>',
      sortUnSort:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortAscending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#9999CC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortDescending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#9999CC" /></svg>'
    }

    this.fetchData(this.listOfKeywords, this.listEx).then(
      res => (this.rowData = res)
    )
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api
    this.gridApi.sizeColumnsToFit()
  }

  public onCellClicked(event: any): void {
    console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field)
    // console.log(event.value.split(' '))
    console.log('cell clicked')
    // this.gridApi.ensureIndexVisible(event.rowIndex, 'top')
  }

  searchVolumeOfKeywords =
    'http://95.217.76.23:5454/api/get_specific_search_volume'

  public onRowClicked(event: any): void {
    this.fetchData(
      this.searchVolumeOfKeywords,
      '{"country": "tr", "lang": "tr", "keyword": "' +
        event.node.data.keyword +
        '" }'
    ).then(res => {
      this.$store.commit('setSeries', res)
      this.$store.commit('setCategories', res)
    })
  }
}

export default AgGridProperties
