import { TestBed } from '@angular/core/testing';
import { AnalysisParameterEnum } from '../enumeration/enums';
import { TextAnalyzer } from '../models/text-analyzer';
import { UserInput } from '../models/user-input';
import { TextAnalyzerService } from './text-analyzer.service';

describe('TextAnalyzerService', () => {
  let service: TextAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should analyze vowels', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed',
      parameter: AnalysisParameterEnum.VOWELS,
    };

    const textAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(textAnalyzer).toBeTruthy();
    expect(textAnalyzer.analysisResult).toEqual({
      a: 3,
      e: 5,
      o: 2,
    });
  });

  it('should analyze consonants', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed',
      parameter: AnalysisParameterEnum.CONSONANTS,
    };

    const textAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(textAnalyzer).toBeTruthy();
    expect(textAnalyzer.analysisResult).toEqual({
      r: 1,
      n: 4,
      d: 2,
      m: 1,
      s: 1,
      t: 2,
      c: 1,
      b: 1,
      l: 1,
      y: 1,
      z: 1,
    });
  });

  it('should return empty analysis result', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed',
      parameter: AnalysisParameterEnum.NONE,
    };

    const textAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(textAnalyzer).toBeTruthy();
    expect(textAnalyzer.id).toEqual('');
    expect(textAnalyzer.analysisResult).toEqual({});
    expect(textAnalyzer.analysisDuration).toEqual(0);
    expect(textAnalyzer.mode).toEqual('');
  });
});
