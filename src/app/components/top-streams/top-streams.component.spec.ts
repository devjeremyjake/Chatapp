import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStreamsComponent } from './top-streams.component';

describe('TopStreamsComponent', () => {
  let component: TopStreamsComponent;
  let fixture: ComponentFixture<TopStreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
