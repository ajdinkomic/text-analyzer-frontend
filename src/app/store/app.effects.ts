import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AnalysisModeEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import * as AppActions from './app.actions';

const handleError = (errorResponse: any) => {
  const errorMessage: string = `
    Your last request failed!
    Response from the server: "${errorResponse.error.error}".
    Status: ${errorResponse.error.status}.
    Please, check your parameters and try again.
  `;

  return of(AppActions.textAnalysisRequestFail({ errorMessage }));
};

@Injectable()
export class AppEffects {
  appTextAnalysis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.textAnalysisRequestStart),
      switchMap((action) => {
        return this.http
          .post<TextAnalyzer>(
            'http://localhost:8080/text-analyzer',
            action.userInput
          )
          .pipe(
            map((response) => {
              return AppActions.addTextAnalyzer({
                textAnalyzer: { ...response, mode: AnalysisModeEnum.ONLINE },
              });
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
