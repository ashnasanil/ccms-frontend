import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchLogsComponent } from './batch-logs.component';

describe('BatchLogsComponent', () => {
  let component: BatchLogsComponent;
  let fixture: ComponentFixture<BatchLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
