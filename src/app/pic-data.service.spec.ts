import { TestBed } from '@angular/core/testing';

import { PicDataService } from './pic-data.service';

describe('PicDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicDataService = TestBed.get(PicDataService);
    expect(service).toBeTruthy();
  });
});
