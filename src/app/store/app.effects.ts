import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { AnalysisModeEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import * as AppActions from './app.actions';

const handleError = (error: any) => {
  console.log('Error', error);
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
              console.log('response:', response);

              return AppActions.addTextAnalyzer({
                textAnalyzer: { ...response, mode: AnalysisModeEnum.ONLINE },
              });
            })
          );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
