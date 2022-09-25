import { withInstall } from '../../index'
import Radio from './src/Radio.vue'
import RadioGroup from './src/RadioGroup.vue'
import RadioButton from './src/RadioButton.vue'

export const VbenRadio = withInstall(Radio)
export const VbenRadioButton = withInstall(RadioButton)
export const VbenRadioGroup = withInstall(RadioGroup)
