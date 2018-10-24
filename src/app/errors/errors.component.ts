import { Component, OnInit, Input } from '@angular/core';
import { Errors } from '../models/errors.model';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  formattedErrors: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {})
      .map(key => `${key} ${errorList.errors[key]}`);
  }

  get errorList() { return this.formattedErrors; }

}
