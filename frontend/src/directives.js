import { svgService } from './services/svg.service'

const edit = {
  mounted: (el, binding) => {
    el.setAttribute('contenteditable', binding.value)
  },
  updated: (el, binding) => {
    el.setAttribute('contenteditable', binding.value)
  },
}

const icon = {
  mounted: (el, binding) => {
    const icon = svgService.getSvg(binding.value)
    el.innerHTML = icon
  },
}

export { edit, icon }
