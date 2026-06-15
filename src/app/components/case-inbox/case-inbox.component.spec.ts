import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInboxComponent } from './case-inbox.component';

describe('CaseInboxComponent', () => {
  let component: CaseInboxComponent;
  let fixture: ComponentFixture<CaseInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseInboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
