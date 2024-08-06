/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const options = {
  root: null, // use the viewport
  rootMargin: '0px',
  threshold: 1.0, // trigger when 100% of the target is visible
};

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  public isInViewport(elementRef: ElementRef<any>): Observable<boolean> {
    return new Observable((observer) => {
      const element = elementRef?.nativeElement.getElementsByTagName('p')[0];
      if (!element) {
        observer.next(false);
        observer.complete(); // Complete the observable when the element is not found
        // @ts-ignore
        return;
      }

      const intersectionObserver = new IntersectionObserver((entries) => {
        const isInTheViewPort: boolean = entries[0].isIntersecting;
        if (isInTheViewPort) {
          observer.next(true);
          observer.complete();
          intersectionObserver.disconnect(); // disconnect the observable when the element is found, no longer requires observation for that
        }
      }, options);

      intersectionObserver.observe(element);
    });
  }
}
