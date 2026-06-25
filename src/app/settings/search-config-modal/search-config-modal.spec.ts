import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConfigModal } from './search-config-modal';

describe('SearchConfigModal', () => {
  let component: SearchConfigModal;
  let fixture: ComponentFixture<SearchConfigModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchConfigModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchConfigModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
