import { Component, Mixins, Watch } from 'vue-property-decorator'
import FetchData from '@/mixins/fetchData.ts'
// import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
// const apexStore = namespace('apexStore')

@Component
class ApexChartProperties extends Mixins(FetchData) {
  // TODO: Vuex

  series: any = this.getseries

  @Watch('getseries')
  updateSeries(newVal: string) {
    this.series = newVal
  }

  @Watch('getcategories')
  updateCategories(newVal: string) {
    this.options = {
      xaxis: {
        categories: newVal
      }
    }
  }

  public get getseries(): any {
    return this.$store.getters.series
  }
  public get getcategories(): any {
    return this.$store.getters.categories
  }

  options: any = {
    chart: {
      id: 'vuechart-example'
    },
    xaxis: {
      categories: this.getcategories,
      labels: {
        offsetY: 5
      }
    },
    colors: ['#9999CC'],
    dataLabels: {
      enabled: false
    },
    yaxis: {
      labels: {
        style: {
          cssClass: 'apexcharts-yaxis-label'
        },
        formatter: function(value: any) {
          const num =
            Math.abs(value) > 999
              ? Math.sign(value) *
                  parseFloat((Math.abs(value) / 1000).toFixed(1)) +
                'K'
              : Math.sign(value) * Math.abs(value)
          return num
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '45%'
      }
    }
  }

  //   @apexStore.Getter
  //   public getSeries!: any
}

export default ApexChartProperties
