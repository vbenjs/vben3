import { withInstall } from '../../index'
import Grid from './src/Grid.vue'
import GridItem from './src/GridItem.vue'
GridItem.__GRID_ITEM__ = true
export const VbenGrid = withInstall(Grid)
export const VbenGridItem = withInstall(GridItem)
