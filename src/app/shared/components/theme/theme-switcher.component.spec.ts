import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let localStorageGetItemSpy: jasmine.Spy;
  let localStorageSetItemSpy: jasmine.Spy;

  beforeEach(
    waitForAsync(() => {
      localStorageGetItemSpy = spyOn(window.localStorage, 'getItem');
      localStorageSetItemSpy = spyOn(window.localStorage, 'setItem');

      TestBed.configureTestingModule({
        declarations: [ThemeSwitcherComponent],
        providers: [],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('start behavior', () => {
    it('should have light theme', () => {
      expect(component.theme).toEqual('light');
    });

    it('should have light theme from local storage', () => {
      localStorageGetItemSpy.and.returnValue('light');
      component.ngOnInit();

      expect(component.theme).toEqual('light');
      expect(document.documentElement.className).toEqual('light-theme');
    });

    it('should have theme provided in local storage if present', () => {
      localStorageGetItemSpy.and.returnValue('dark');
      component.ngOnInit();

      expect(component.theme).toEqual('dark');
      expect(document.documentElement.className).toEqual('dark-theme');
    });
  });

  describe('theme toggle', () => {
    it('should switch from light to dark and the other way round on click', () => {
      const toggleButton = fixture.debugElement.query(By.css('.theme-switcher')).nativeElement;

      expect(component.theme).toEqual('light');

      toggleButton.click();

      expect(component.theme).toEqual('dark');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('theme', 'dark');

      toggleButton.click();

      expect(component.theme).toEqual('light');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('theme', 'light');
    });
  });
});
