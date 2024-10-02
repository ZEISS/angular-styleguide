/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0, // trigger when 100% of the target is visible
};

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  public isInViewport(element: HTMLElement): Observable<boolean> {
    return new Observable((observer) => {
      if (!element) {
        observer.next(false);
        observer.complete();
        // @ts-ignore
        return;
      }

      const intersectionObserver = new IntersectionObserver((entries) => {
        const isInTheViewPort: boolean = entries[0].isIntersecting;
        if (isInTheViewPort) {
          observer.next(true);
          observer.complete();
          intersectionObserver.disconnect();
        }
      }, options);

      intersectionObserver.observe(element);
    });
  }
}
