import { ComponentType, VbenFormSchema } from '#/form'

const p = {
  form: {
    labelCol: 6,
    wrapperCol: 12,
  },
  schema: {
    type: 'object',
    properties: {
      nwgnlhgsnj0: {
        type: 'string',
        title: 'TextArea',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'nwgnlhgsnj0',
        'x-index': 0,
      },
      '5c4oq7tr0es': {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': '5c4oq7tr0es',
        'x-index': 1,
      },
      aaa: {
        title: 'Password',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-validator': [],
        'x-component-props': {},
        'x-decorator-props': {},
        'x-designable-id': 'gb9vrk9w62v',
        'x-index': 2,
        name: 'aaa',
      },
    },
    'x-designable-id': 'upq9aewfvhi',
  },
}

export function transferFormilySchemas(props?: any): VbenFormSchema[] {
  let schemas: VbenFormSchema[] = []
  for (let field in props) {
    schemas.push(propsToSchema(field, props[field]))
  }
  console.log(schemas)
  return schemas
}

const propsToSchema = (field: string, props: any): VbenFormSchema => {
  return {
    field,
    label: props['title'],
    component: getComponent(props['x-component']) as ComponentType,
    componentProps: props['x-component-props'],
  }
}
const getComponent = (c: String): String => {
  switch (c) {
    case 'Input.TextArea':
      return 'InputTextArea'
    case 'Password':
      return 'InputPassword'
    case 'NumberPicker':
      return 'InputNumber'
    default:
      return c
  }
}
