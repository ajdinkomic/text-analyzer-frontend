import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnalysisModeEnum, AnalysisParameterEnum } from './enumeration/enums';
import { TextAnalyzer } from './models/text-analyzer';
import { UserInput } from './models/user-input';
import { HttpService } from './services/http.service';
import { TextAnalyzerService } from './services/text-analyzer.service';
import * as fromApp from './store/app.reducers';
import * as AppActions from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  analysisModeEnum = AnalysisModeEnum;
  analysisParameterEnum = AnalysisParameterEnum;
  textAnalyzers$!: Observable<fromApp.AppState>;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private textAnalyzerService: TextAnalyzerService,
    private store: Store<{ app: fromApp.AppState }>
  ) {}

  textAnalyzerForm: FormGroup = this.formBuilder.group({
    text: ['', Validators.required],
    parameter: [this.analysisParameterEnum.VOWELS, Validators.required],
    mode: [this.analysisModeEnum.ONLINE, Validators.required],
  });

  ngOnInit(): void {
    this.textAnalyzers$ = this.store.select('app');
  }

  onSubmit(): void {
    console.log('Submit form:', this.textAnalyzerForm.value);
    const userInput: UserInput = this.textAnalyzerForm.value;

    if (this.textAnalyzerForm.value.mode === AnalysisModeEnum.ONLINE) {
      this.store.dispatch(AppActions.textAnalysisRequestStart({ userInput }));
    } else {
      const textAnalyzer = this.textAnalyzerService.analyzeText(userInput);
      console.log('Text analyzer offline:', textAnalyzer);
      this.store.dispatch(AppActions.addTextAnalyzer({ textAnalyzer }));
    }
  }
}
