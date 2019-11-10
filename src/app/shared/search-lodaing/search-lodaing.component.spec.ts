import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLodaingComponent } from './search-lodaing.component';

describe('SearchLodaingComponent', () => {
  let component: SearchLodaingComponent;
  let fixture: ComponentFixture<SearchLodaingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLodaingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLodaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
