// @ts-ignore
// eslint-disable-next-line
import type { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  export interface PersistedStateOptions {
    /**
     * Storage key to use.
     * @default $store.id
     */
    key?: string | ((id: string) => string);
    /**
     * Where to store persisted state.
     * @default localStorage
     */
    storage?: StorageLike;
    /**
     * Dot-notation paths to partially save state. Saves everything if undefined.
     * @default undefined
     */
    paths?: Array<string>;
    /**
     * Customer serializer to serialize/deserialize state.
     */
    serializer?: Serializer;
    /**
     * Hook called before state is hydrated from storage.
     * @default null
     */
    beforeRestore?: (context: PiniaPluginContext) => void;
    /**
     * Hook called after state is hydrated from storage.
     * @default undefined
     */
    afterRestore?: (context: PiniaPluginContext) => void;
    /**
     * Logs errors in console when enabled.
     * @default false
     */
    debug?: boolean;
  }
  export interface DefineStoreOptions<
    // eslint-disable-next-line
    Id,
    // eslint-disable-next-line
    S,
    // eslint-disable-next-line
    G,
    // eslint-disable-next-line
    A,
  > {
    /**
     * Persist store in storage.
     */
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[];
  }
}
