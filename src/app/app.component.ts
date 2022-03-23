import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalysisModeEnum, AnalysisParameterEnum } from './enumeration/enums';
import { TextAnalyzer } from './models/text-analyzer';
import { UserInput } from './models/user-input';
import { HttpService } from './services/http.service';
import { TextAnalyzerService } from './services/text-analyzer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  analysisModeEnum = AnalysisModeEnum;
  analysisParameterEnum = AnalysisParameterEnum;
  textAnalyzers: TextAnalyzer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private textAnalyzerService: TextAnalyzerService
  ) {}

  textAnalyzerForm: FormGroup = this.formBuilder.group({
    text: ['', Validators.required],
    parameter: [this.analysisParameterEnum.VOWELS, Validators.required],
    mode: [this.analysisModeEnum.ONLINE, Validators.required],
  });

  onSubmit(): void {
    console.log('Submit form:', this.textAnalyzerForm.value);
    const userInput: UserInput = this.textAnalyzerForm.value;

    if (this.textAnalyzerForm.value.mode === AnalysisModeEnum.ONLINE) {
      this.httpService.requestAnalysis(userInput).subscribe((textAnalyzer) => {
        console.log('Text analyzer response:', textAnalyzer);
        this.textAnalyzers.unshift({
          ...textAnalyzer,
          mode: this.analysisModeEnum.ONLINE,
        });
      });
    } else {
      const textAnalyzer = this.textAnalyzerService.analyzeText(userInput);
      console.log('Text analyzer offline:', textAnalyzer);
      this.textAnalyzers.unshift(textAnalyzer);
    }
  }
}
