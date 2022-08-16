import {withInstall} from "../index";
import Table from './src/Table.vue';

export * from './src/type';

export const VbenTable = withInstall(Table);
export { useTable } from './src/hooks/useTable';
