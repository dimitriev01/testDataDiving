import { rootReducer, store } from './redux.store';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = store.dispatch;

export type AppSelector<Return> = (state: RootState) => Return;
