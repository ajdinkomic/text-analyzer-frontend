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

  it('should analyze for vowels', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed.!"#$%&/()=?*-_.:,;@{}[]€|\\÷×¤ß~ˇ^~˘°˛`˙´˝¨¸§<>Łł',
      parameter: AnalysisParameterEnum.VOWELS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.analysisResult).toEqual({
      a: 3,
      e: 5,
      o: 2,
    });
  });

  it('should analyze for consonants', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed.!"#$%&/()=?*-_.:,;@{}[]€|\\÷×¤ß~ˇ^~˘°˛`˙´˝¨¸§<>Łł',
      parameter: AnalysisParameterEnum.CONSONANTS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.analysisResult).toEqual({
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

  it('should analyze for incorrect parameter', () => {
    const userInput: UserInput = {
      text: 'Random sentence to be analyzed.!"#$%&/()=?*-_.:,;@{}[]€|\\÷×¤ß~ˇ^~˘°˛`˙´˝¨¸§<>Łł',
      parameter: AnalysisParameterEnum.NONE,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.id).toEqual('');
    expect(actualTextAnalyzer.analysisResult).toEqual({});
    expect(actualTextAnalyzer.analysisDuration).toEqual(0);
    expect(actualTextAnalyzer.mode).toEqual('');
  });

  it('should analyze blank text for vowels', () => {
    const userInput: UserInput = {
      text: '  ',
      parameter: AnalysisParameterEnum.VOWELS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.id).toEqual('');
    expect(actualTextAnalyzer.analysisResult).toEqual({});
    expect(actualTextAnalyzer.analysisDuration).toEqual(0);
    expect(actualTextAnalyzer.mode).toEqual('');
  });

  it('should analyze blank text for consonants', () => {
    const userInput: UserInput = {
      text: '  ',
      parameter: AnalysisParameterEnum.CONSONANTS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.id).toEqual('');
    expect(actualTextAnalyzer.analysisResult).toEqual({});
    expect(actualTextAnalyzer.analysisDuration).toEqual(0);
    expect(actualTextAnalyzer.mode).toEqual('');
  });

  it('should analyze only non letters for vowels', () => {
    const userInput: UserInput = {
      text: '.!"#$%&/()=?*-_.:,;@{}[]€|\\÷×¤ß~ˇ^~˘°˛`˙´˝¨¸§<>Łł',
      parameter: AnalysisParameterEnum.VOWELS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.analysisResult).toEqual({});
  });

  it('should analyze only non letters for consonants', () => {
    const userInput: UserInput = {
      text: '.!"#$%&/()=?*-_.:,;@{}[]€|\\÷×¤ß~ˇ^~˘°˛`˙´˝¨¸§<>Łł',
      parameter: AnalysisParameterEnum.CONSONANTS,
    };

    const actualTextAnalyzer: TextAnalyzer = service.analyzeText(userInput);

    expect(actualTextAnalyzer).toBeTruthy();
    expect(actualTextAnalyzer.analysisResult).toEqual({});
  });
});
