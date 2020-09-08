<template>
  <div class="home">
    <ag-grid-vue
      style="width: 1000px; height:500px;"
      class="ag-theme-alpine"
      :rowData="rowData"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      @cell-clicked="onCellClicked"
      :gridOptions="gridOptions"
    ></ag-grid-vue>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";

@Component({
  components: {
    AgGridVue
  }
})
export default class Home extends Vue {
  columnDefs: any = null;
  rowData: any = null;
  gridApi: any = null;
  columnApi: any = null;

  gridOptions: any = {
    pagination: true,
    paginationPageSize: 20
  };

  listOfKeywords = "http://95.217.76.23:5454/api/list_keyword_info_for_domain";
  listEx =
    '{"firstDate": "2020-02-25", "lastDate": "2020-02-20", "domain":"akakce.com", "limit":"60", "page": 3 }';
  searchVolumeOfKeywords =
    "http://95.217.76.23:5454/api/get_specific_search_volume";

  beforeMount() {
    this.columnDefs = [
      { headerName: "keywords", field: "keyword" },
      { headerName: "search volume", field: "avgSearchVolume" },
      { headerName: "rank", field: "rank" },
      { headerName: "change", field: "diffRank" },
      { headerName: "px rank", field: "pixelRank" },
      { headerName: "change", field: "diffPixelRank" },
      { headerName: "url page", field: "landingPage" },
      { headerName: "cpc - $", field: "cpc" }
    ];

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
    this.gridApi.sizeColumnsToFit();
  }

  public onCellClicked(event: any): void {
    console.log("onCellClicked: " + event.rowIndex + " " + event.colDef.field);
    console.log(event.value.split(" "));
    console.log("cell clicked");
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
</style>