import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { HogwartsService } from '../../services/hogwarts.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  columns: any[] = [
    {
      name: 'name',
      title: 'Name',
      sortable: true,
      type: 'string',
    },
    {
      name: 'patronus',
      title: 'Patronus',
      sortable: true,
      type: 'string',
    },
    {
      name: 'age',
      title: 'Age',
      sortable: true,
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      sortable: false,
      type: 'image',
    },
  ];

  constructor(
    private services: HogwartsService,
    private utilsServices: UtilsService
  ) {}

  ngOnInit(): void {
    let local: any[] = [];
    if (localStorage.getItem('students')) {
      let arrString: string = localStorage.getItem('students')!;
      let arr: any[] = JSON.parse(arrString?.toString());
      local = arr;
    }

    this.services.getStudents().subscribe((res) => {
      local.forEach((item) => {
        res.unshift(item);
      });

      res.map((item) => {
        return item.yearOfBirth
          ? item.yearOfBirth !== ''
            ? (item.age = this.utilsServices.calculateAge(item.yearOfBirth))
            : (item.age = 0)
          : (item.age = 0);
      });

      this.students = res;
    });
  }
}
