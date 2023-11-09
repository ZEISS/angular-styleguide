/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThemeSwitcherComponent } from './theme-switcher.component';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let localStorageGetItemSpy: jasmine.Spy;
  let localStorageSetItemSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    localStorageGetItemSpy = spyOn(window.localStorage, 'getItem');
    localStorageSetItemSpy = spyOn(window.localStorage, 'setItem');

    TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
    });
  }));

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
      expect(component.theme).toEqual('light-theme');
    });

    it('should have light theme from local storage', () => {
      localStorageGetItemSpy.and.returnValue('light-theme');
      component.ngOnInit();

      expect(component.theme).toEqual('light-theme');
      expect(document.documentElement.className).toEqual('light-theme');
    });

    it('should have theme provided in local storage if present', () => {
      localStorageGetItemSpy.and.returnValue('dark-theme');
      component.ngOnInit();

      expect(component.theme).toEqual('dark-theme');
      expect(document.documentElement.className).toEqual('dark-theme');
    });
  });

  describe('theme toggle', () => {
    it('should switch from light to dark and the other way round on click', () => {
      const toggleButton = fixture.debugElement.query(By.css('.theme-switcher')).nativeElement;

      expect(component.theme).toEqual('light-theme');

      toggleButton.click();

      expect(component.theme).toEqual('dark-theme');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('theme', 'dark-theme');

      toggleButton.click();

      expect(component.theme).toEqual('light-theme');
      expect(localStorageSetItemSpy).toHaveBeenCalledWith('theme', 'light-theme');
    });
  });
});
