<script lang="tsx">
import { defineComponent, useSlots } from 'vue'
import LeftMenuLayout from './left-menu.vue'
import TopMenuLayout from './top-menu.vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'left-menu',
    },
  },
  setup(props) {
    const layouts = {
      'left-menu': LeftMenuLayout,
      'top-menu': TopMenuLayout,
    }

    const slots = useSlots()

    return () => {
      const Layout = layouts[props.type]
      if (!Layout) {
        return null
      }
      return <Layout>{slots}</Layout>
    }
  },
})
</script>
