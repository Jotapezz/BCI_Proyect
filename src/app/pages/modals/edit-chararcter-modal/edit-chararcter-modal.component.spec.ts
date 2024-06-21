import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChararcterModalComponent } from './edit-chararcter-modal.component';

describe('EditChararcterModalComponent', () => {
  let component: EditChararcterModalComponent;
  let fixture: ComponentFixture<EditChararcterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChararcterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditChararcterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
