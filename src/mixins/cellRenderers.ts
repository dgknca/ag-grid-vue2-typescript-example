import { Component, Vue } from 'vue-property-decorator'
import SVGVolume from '@/svg/svg-volume.vue'
import SVGStar from '@/svg/svg-star.vue'

@Component({
  components: {
    SVGVolume,
    SVGStar
  }
})
class CellRenderers extends Vue {
  public searchVolumeRenderer(params: any): string {
    const ComponentClass = Vue.extend(SVGVolume)
    const myicon = new ComponentClass().$mount().$el.innerHTML
    return myicon + params.value
  }

  public rankRenderer(params: any): string {
    const ComponentClass = Vue.extend(SVGStar)
    const myicon = new ComponentClass().$mount().$el.innerHTML
    return params.value + myicon
  }

  public diffRenderer(params: any): string {
    return params.value
  }
}

export default CellRenderers
