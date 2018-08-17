import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmation-info',
  templateUrl: './confirmation-info.component.html',
  styleUrls: ['./confirmation-info.component.css']
})
export class ConfirmationInfoComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToProductOverview() {
    this.router.navigate(['']);
  }

}
