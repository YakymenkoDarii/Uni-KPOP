import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child';
import { Student } from './student';

@Component({
  selector: 'app-lab4',
  imports: [FormsModule, ChildComponent],
  templateUrl: './lab4.html',
  styleUrl: './lab4.css'
})
export class Lab4Component {
  name = '';
  grade: number | null = null;
  students: Student[] = [];

  isValid() {
    return this.name.trim() !== '' && this.grade !== null && this.grade >= 0 && this.grade <= 100;
  }

  addStudent() {
    if (this.isValid()) {
      // новий масив, щоб дочірній компонент отримав оновлене значення @Input
      this.students = [...this.students, { name: this.name.trim(), grade: this.grade! }];
      this.name = '';
      this.grade = null;
    }
  }

  removeStudent(i: number) {
    this.students = this.students.filter((_, index) => index !== i);
  }
}
