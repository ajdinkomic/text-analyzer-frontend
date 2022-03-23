import { Action, createReducer, on } from '@ngrx/store';
import { TextAnalyzer } from '../models/text-analyzer';
import * as AppActions from './app.actions';

export interface AppState {
  textAnalyzers: TextAnalyzer[];
}

const initialState: AppState = {
  textAnalyzers: [],
};

const _appReducer = createReducer(
  initialState,

  on(AppActions.addTextAnalyzer, (state, action) => ({
    ...state,
    textAnalyzers: [action.textAnalyzer, ...state.textAnalyzers],
  }))
);

export function appReducer(state: any, action: Action) {
  return _appReducer(state, action);
}
