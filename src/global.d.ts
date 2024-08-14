

declare module 'redux-persist/es/persistReducer' {
    import { Reducer } from '@reduxjs/toolkit';
    export default function persistReducer<S, A>(config: any, baseReducer: Reducer<S, A>): Reducer<S, A>;
  }
  
  declare module 'redux-persist/es/persistStore' {
    import { Store, Action } from '@reduxjs/toolkit';
    export default function persistStore(store: Store, options?: any, callback?: () => void): any;
  }
  
  declare module 'redux-persist/lib/storage' {
    const storage: any;
    export default storage;
  }
  