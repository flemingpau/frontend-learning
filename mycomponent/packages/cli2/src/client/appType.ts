import { defineComponent, h } from 'vue'//h函数帮助我们生成"VNode"


export default defineComponent({
  name: 'AppType',
  setup(props, { slots }) {
    return () => h('div', { class: 'app-type' }, [slots.default?.()])
  },
})
