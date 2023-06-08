export * from './tree/index';
/**
 * 用于存储固定类型的数据字典
 * 
 * 比如：DataDictionary<Component>，用于存储组件清单
 */
export type DataDictionary<T> = {
  [key: string]: T;
};
