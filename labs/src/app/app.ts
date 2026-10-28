import { Component } from '@angular/core';
import { NameListComponent } from './lab3/name-list/name-list';
import { Lab4Component } from './lab4/lab4';

@Component({
  selector: 'app-root',
  imports: [NameListComponent, Lab4Component],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  tab: 'lab3' | 'lab4' = 'lab3';
}
