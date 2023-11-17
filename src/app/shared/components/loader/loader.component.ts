import { Component, NgZone, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  progress = 0;

  @Output()
  progressFinished: EventEmitter<void> = new EventEmitter<void>();

  constructor(private ngZone: NgZone) {
    this.ngZone = ngZone;

    this.process();
  }

  process(): void {
    this.ngZone.run(() => this.increaseProgress());
  }

  increaseProgress(): void {
    this.progress += 1;

    if (this.progress < 100) {
      setTimeout(() => this.increaseProgress(), 10);
    } else {
      this.progressFinished.emit();
    }
  }
}
