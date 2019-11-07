import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mc-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`inside empty comp`);
  }
}
