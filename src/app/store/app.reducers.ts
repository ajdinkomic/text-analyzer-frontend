import { Action, createReducer, on } from '@ngrx/store';
import { TextAnalyzer } from '../models/text-analyzer';
import * as AppActions from './app.actions';

export interface AppState {
  textAnalyzers: TextAnalyzer[];
  errorMessage: string;
}

const initialState: AppState = {
  textAnalyzers: [],
  errorMessage: '',
};

const _appReducer = createReducer(
  initialState,

  on(AppActions.addTextAnalyzer, (state, action) => ({
    ...state,
    textAnalyzers: [action.textAnalyzer, ...state.textAnalyzers],
    errorMessage: '',
  })),

  on(AppActions.textAnalysisRequestFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
  })),

  on(AppActions.textAnalysisOfflineFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
  }))
);

export function appReducer(state: any, action: Action) {
  return _appReducer(state, action);
}
