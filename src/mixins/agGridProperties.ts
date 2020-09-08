import { Component, Vue, Mixins } from 'vue-property-decorator'
import CellRenderers from '@/mixins/cellRenderers.ts'
import axios from 'axios'

@Component
class AgGridProperties extends Mixins(CellRenderers) {
  columnDefs: any = null
  rowData: any = null
  gridApi: any = null
  columnApi: any = null
  defaultColDef: any = null
  headerHeight: any = null
  icons: any = null

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
        width: 120,
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
        width: 250,
        suppressSizeToFit: true,
        headerClass: 'header-text-left',
        cellClass: 'grid-cell-urlpage'
      },
      {
        headerName: 'cpc - $',
        field: 'cpc',
        cellClass: 'grid-cell-centered'
      }
    ]

    this.defaultColDef = {
      editable: false,
      sortable: true,
      unSortIcon: true,
      flex: 1,
      minWidth: 100,
      filter: false,
      resizable: false,
      width: 100
    }

    this.headerHeight = 38
    this.icons = {
      sortUnSort:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortAscending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#9999CC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortDescending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#9999CC" /></svg>'
    }

    this.fetchData()
  }

  listOfKeywords = 'http://95.217.76.23:5454/api/list_keyword_info_for_domain'
  listEx =
    '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"60", "page": 3 }'
  searchVolumeOfKeywords =
    'http://95.217.76.23:5454/api/get_specific_search_volume'

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
}

export default AgGridProperties
