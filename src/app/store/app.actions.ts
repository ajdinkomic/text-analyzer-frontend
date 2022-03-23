import { createAction, props } from '@ngrx/store';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';

export const ADD_TEXT_ANALYZER = 'ADD_TEXT_ANALYZER';
export const TEXT_ANALYSIS_REQUEST_START = 'TEXT_ANALYSIS_REQUEST_START';

export const textAnalysisRequestStart = createAction(
  TEXT_ANALYSIS_REQUEST_START,
  props<{
    userInput: UserInput;
  }>()
);

export const addTextAnalyzer = createAction(
  ADD_TEXT_ANALYZER,
  props<{
    textAnalyzer: TextAnalyzer;
  }>()
);
