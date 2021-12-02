import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwantToBeInjectedComponent } from './iwant-to-be-injected.component';

describe('IwantToBeInjectedComponent', () => {
  let component: IwantToBeInjectedComponent;
  let fixture: ComponentFixture<IwantToBeInjectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IwantToBeInjectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IwantToBeInjectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
