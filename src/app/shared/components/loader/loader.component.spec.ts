import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    });
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the progress when process started', fakeAsync(() => {
    spyOn(component.progressFinished, 'emit');

    component.process();

    // Giving time for the progress to be able to finish
    tick(1100);

    //whenStable() waits for all tasks in the test NgZone to complete
    fixture.whenStable().then(() => {
      expect(component.process).toBe(100);
      expect(component.progressFinished.emit).toHaveBeenCalled();
    });
  }));
});
