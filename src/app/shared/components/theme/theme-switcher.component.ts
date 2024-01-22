// SPDX-FileCopyrightText: 2022 Carl Zeiss AG
//
// SPDX-License-Identifier: MIT

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit {
  faMoon = faMoon;
  faSun = faSun;
  theme: Theme;

  public switcherClicked() {
    this.theme = this.theme == 'dark-theme' ? 'light-theme' : 'dark-theme';
    this.saveTheme();
    this.applyTheme();
  }

  public ngOnInit(): void {
    this.theme = this.getSavedTheme() || 'light-theme';
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.className = this.theme;
  }

  private saveTheme(): void {
    localStorage.setItem('theme', this.theme);
  }

  private getSavedTheme(): Theme {
    const item = localStorage.getItem('theme');
    if (this.isTheme(item)) {
      return item;
    } else {
      return null;
    }
  }

  isTheme(theme: string): theme is Theme {
    return themes.includes(theme as Theme);
  }
}

const themes = ['light-theme', 'dark-theme'] as const;
type Theme = (typeof themes)[number];
