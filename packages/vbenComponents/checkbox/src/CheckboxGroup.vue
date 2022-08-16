<script lang="ts" setup name="VbenCheckboxGroup">
  import {maps} from '../../index'
  import Checkbox from './Checkbox.vue';
  import { computed, ref } from 'vue';
  import { VbenButton, VbenButtonGroup } from '../../button';
  const CheckboxGroup = maps.get('CheckboxGroup');
  const props = defineProps({
    options: {
      type: Array,
      default: [],
    },
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
    mode: {
      type: String,
      default: 'default',
    },
  });
  const value = ref([]);
  const emit = defineEmits(['update:value']);
  const option = computed(() => {
    const { options } = props;

    return options
      ? options.map((v) => {
          return { label: v[props.labelField], value: v[props.valueField], selected: false };
        })
      : [];
  });
  const select = (v) => {
    const i = value.value.findIndex((a) => a == v);
    if (i === -1) {
      value.value.push(v);
    } else {
      value.value.splice(i, 1);
    }
    emit('update:value', value.value);
  };
  const getType = (v) => {
    if (value.value.length == 0) {
      return '';
    }
    return value.value.find((a) => a == v) ? 'primary' : '';
  };
</script>
<template>
  <div>
    <CheckboxGroup v-bind="$attrs" v-model:value="value">
      <Checkbox
        v-for="(o, k) in option"
        :key="k"
        :value="o.value"
        :label="o.label"
        v-if="mode === 'default'"
      ></Checkbox>

      <VbenButtonGroup v-if="mode === 'button'"
        ><VbenButton
          v-for="(o, k) in option"
          :value="o.value"
          @click="select(o.value)"
          :type="getType(o.value)"
          >{{ o.label }}</VbenButton
        ></VbenButtonGroup
      >
    </CheckboxGroup></div
  >
</template>

<style scoped></style>
