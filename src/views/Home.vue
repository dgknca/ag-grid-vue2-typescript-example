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
import CellRenderers from "@/mixins/cellRenderers.ts";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";

@Component({
  components: {
    AgGridVue
  }
})
export default class Home extends Mixins(CellRenderers) {
  columnDefs: any = null;
  rowData: any = null;
  gridApi: any = null;
  columnApi: any = null;
  defaultColDef: any = null;
  headerHeight: any = null;
  icons: any = null;

  gridOptions: any = {
    pagination: true,
    paginationPageSize: 20
    // paginationAutoPageSize: true
  };

  listOfKeywords = "http://95.217.76.23:5454/api/list_keyword_info_for_domain";
  listEx =
    '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"60", "page": 3 }';
  searchVolumeOfKeywords =
    "http://95.217.76.23:5454/api/get_specific_search_volume";

  beforeMount() {
    this.columnDefs = [
      {
        headerName: "keywords",
        headerClass: "header-text-left",
        field: "keyword",
        width: 150,
        suppressSizeToFit: true,
        pinned: "left",
        sortable: false
      },
      {
        headerName: "search volume",
        field: "avgSearchVolume",
        width: 120,
        suppressSizeToFit: true,
        cellRenderer: this.searchVolumeRenderer,
        cellClass: "grid-cell-searchvolume"
      },
      {
        headerName: "rank",
        field: "rank",
        cellRenderer: this.rankRenderer,
        cellClass: "grid-cell-rank"
      },
      {
        headerName: "change",
        field: "diffRank",
        cellRenderer: this.diffRenderer,
        cellClass: "grid-cell-diff grid-cell-diffRank"
      },
      {
        headerName: "px rank",
        field: "pixelRank",
        cellClass: "grid-cell-centered"
      },
      {
        headerName: "change",
        field: "diffPixelRank",
        cellRenderer: this.diffRenderer,
        cellClass: "grid-cell-diff grid-cell-diffPixelRank"
      },
      {
        headerName: "url page",
        field: "landingPage",
        sortable: false,
        width: 250,
        suppressSizeToFit: true,
        headerClass: "header-text-left",
        cellClass: "grid-cell-urlpage"
      },
      {
        headerName: "cpc - $",
        field: "cpc",
        cellClass: "grid-cell-centered"
      }
    ];

    this.defaultColDef = {
      editable: false,
      sortable: true,
      unSortIcon: true,
      flex: 1,
      minWidth: 100,
      filter: false,
      resizable: false,
      width: 100
    };

    this.headerHeight = 38;
    this.icons = {
      sortUnSort:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortAscending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#9999CC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#E3E3FC" /></svg>',
      sortDescending:
        '<svg height="12" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 6L3 10L6 6" fill="#E3E3FC" /><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L3 0L6 4" fill="#9999CC" /></svg>'
    };

    this.fetchData();
  }

  public fetchData(): void {
    axios
      .post(this.listOfKeywords, this.listEx)
      .then(response => {
        console.log(response.data);
        this.rowData = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  public onCellClicked(event: any): void {
    console.log("onCellClicked: " + event.rowIndex + " " + event.colDef.field);
    console.log(event.value.split(" "));
    console.log("cell clicked");
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

h1 {
  color: var(--gray4);
  font-weight: 600;
  font-size: 24px;
}
</style>

<style lang="scss">
@import "../styles/app";

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
  font-family: "Barlow", sans-serif;
}
</style>
