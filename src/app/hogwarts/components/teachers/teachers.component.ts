import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { HogwartsService } from '../../services/hogwarts.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];
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
    this.services.getTeachers().subscribe((res) => {
      res.map((item) => {
        return item.yearOfBirth
          ? item.yearOfBirth !== ''
            ? (item.age = this.utilsServices.calculateAge(item.yearOfBirth))
            : (item.age = 0)
          : (item.age = 0);
      });

      this.teachers = res;
    });
  }
}
