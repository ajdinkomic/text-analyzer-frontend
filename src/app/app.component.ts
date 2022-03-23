import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnalysisModeEnum, AnalysisParameterEnum } from './enumeration/enums';
import { TextAnalyzer } from './models/text-analyzer';
import { UserInput } from './models/user-input';
import { TextAnalyzerService } from './services/text-analyzer.service';
import * as AppActions from './store/app.actions';
import * as fromApp from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  analysisModeEnum = AnalysisModeEnum;
  analysisParameterEnum = AnalysisParameterEnum;

  errorMessage$!: Observable<string>;
  textAnalyzers$!: Observable<TextAnalyzer[]>;

  textAnalyzerForm: FormGroup = this.formBuilder.group({
    text: ['', Validators.required],
    parameter: [this.analysisParameterEnum.VOWELS, Validators.required],
    mode: [this.analysisModeEnum.ONLINE, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private textAnalyzerService: TextAnalyzerService,
    private store: Store<{ app: fromApp.AppState }>
  ) {
    this.textAnalyzers$ = this.store.select((state) => state.app.textAnalyzers);
    this.errorMessage$ = this.store.select((state) => state.app.errorMessage);
  }

  onSubmit(): void {
    const userInput: UserInput = this.textAnalyzerForm.value;

    if (this.textAnalyzerForm.value.mode === AnalysisModeEnum.ONLINE) {
      this.store.dispatch(AppActions.textAnalysisRequestStart({ userInput }));
    } else {
      const textAnalyzer = this.textAnalyzerService.analyzeText(userInput);
      this.store.dispatch(AppActions.addTextAnalyzer({ textAnalyzer }));
    }
  }
}
