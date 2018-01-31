import { TestBed, inject } from '@angular/core/testing';

import { FiltersService } from './filters.service';

describe('FiltersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersService]
    });
  });

  it('should be created', inject([FiltersService], (service: FiltersService) => {
    expect(service).toBeTruthy();
  }));
});
