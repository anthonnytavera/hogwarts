import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.scss'],
})
export class StudentsAddComponent implements OnInit {
  submitted = false;
  image: any = '';
  studentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    patronus: new FormControl(''),
    yearOfBirth: new FormControl(1900, [
      Validators.max(2022),
      Validators.min(1900),
    ]),
    house: new FormControl('slytherin'),
    image: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result?.toString();
      };
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.valid) {
      let student = this.studentForm.value;

      if (this.studentForm.get('image')?.value !== '') {
        student.image = this.image;
      }

      if (localStorage.getItem('students')) {
        let arrString: string = localStorage.getItem('students')!;
        let arr: any[] = JSON.parse(arrString?.toString());
        arr.push(student);
        localStorage.setItem('students', JSON.stringify(arr));
      } else {
        localStorage.setItem('students', JSON.stringify([student]));
      }
      this.router.navigate(['/hogwarts/students']);
    }
  }
}
