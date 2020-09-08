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

  public diffRenderer(params: any): string {
    return params.value
  }
}

export default CellRenderers