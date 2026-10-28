import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Student } from '../student';

@Component({
  selector: 'app-child',
  imports: [DecimalPipe],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class ChildComponent {
  @Input() students: Student[] = [];

  get average() {
    const sum = this.students.reduce((acc, s) => acc + s.grade, 0);
    return sum / this.students.length;
  }
}
