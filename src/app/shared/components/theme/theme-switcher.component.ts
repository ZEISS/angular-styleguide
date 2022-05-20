import { Component, OnInit } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  faMoon = faMoon;
  faSun = faSun;
  theme: Theme;

  public switcherClicked() {
    this.theme = this.theme == 'dark' ? 'light' : 'dark';
    this.saveTheme();
    this.applyTheme();
  }

  public ngOnInit(): void {
    this.theme = this.getSavedTheme() || 'light';
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.className = this.theme == 'dark' ? 'dark-theme' : 'light-theme';
  }

  private saveTheme(): void {
    localStorage.setItem('theme', this.theme);
  }

  private getSavedTheme(): Theme {
    switch (localStorage.getItem('theme')) {
      case 'light':
        return 'light';
      case 'dark':
        return 'dark';
      default:
        return null;
    }
  }
}

type Theme = 'light' | 'dark';
