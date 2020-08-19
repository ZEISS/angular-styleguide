import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  @Input() public product: Product;
  @Output() public productImageClicked: EventEmitter<void> = new EventEmitter<void>();

  public imageClicked() {
    this.productImageClicked.emit();
  }
}
