import { createAction, props } from '@ngrx/store';
import { AppActionsEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';

export const textAnalysisRequestStart = createAction(
  AppActionsEnum.TEXT_ANALYSIS_REQUEST_START,
  props<{
    userInput: UserInput;
  }>()
);

export const textAnalysisRequestFail = createAction(
  AppActionsEnum.TEXT_ANALYSIS_REQUEST_FAIL,
  props<{
    errorMessage: string;
  }>()
);

export const addTextAnalyzer = createAction(
  AppActionsEnum.ADD_TEXT_ANALYZER,
  props<{
    textAnalyzer: TextAnalyzer;
  }>()
);

export const textAnalysisOfflineFail = createAction(
  AppActionsEnum.TEXT_ANALYSIS_OFFLINE_FAIL,
  props<{
    errorMessage: string;
  }>()
);
