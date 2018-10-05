import { inject, TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
