import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConfigModalComponent } from './search-config-modal';

describe('SearchConfigModalComponent', () => {
  let component: SearchConfigModalComponent;
  let fixture: ComponentFixture<SearchConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchConfigModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
