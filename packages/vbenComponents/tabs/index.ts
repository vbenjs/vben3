import {withInstall} from "../index";
import Tabs from './src/Tabs.vue';
import TabPane from './src/TabPane.vue';
TabPane.__TAB_PANE__ = true;
export const VbenTabs = withInstall(Tabs);
export const VbenTabPane = withInstall(TabPane);
