import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-list',
  imports: [FormsModule],
  templateUrl: './name-list.html',
  styleUrl: './name-list.css'
})
export class NameListComponent {
  newName = '';
  names: string[] = [];

  addName() {
    const name = this.newName.trim();
    if (name) {
      this.names.push(name);
      this.newName = '';
    }
  }

  removeName(i: number) {
    this.names.splice(i, 1);
  }
}
