import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { HogwartsService } from '../../services/hogwarts.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters: any[] = [];
  house: string = 'slytherin';
  logos: string[] = [
    '../assets/images/sl.png',
    '../assets/images/gri.png',
    '../assets/images/ra.png',
    '../assets/images/hu.png',
  ];

  logo: string = this.logos[0];
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
    this.init(this.house);
  }

  init(house: string) {
    this.services.getCharacters(house).subscribe((res) => {
      res.map((item) => {
        return item.yearOfBirth
          ? item.yearOfBirth !== ''
            ? (item.age = this.utilsServices.calculateAge(item.yearOfBirth))
            : (item.age = 0)
          : (item.age = 0);
      });

      this.characters = res;
    });
  }

  onChange(val: any) {
    this.house = val.target.value;

    this.logo =
      this.house == 'slytherin'
        ? this.logos[0]
        : this.house == 'gryffindor'
        ? this.logos[1]
        : this.house == 'ravenclaw'
        ? this.logos[2]
        : this.house == 'hufflepuff'
        ? this.logos[3]
        : '';

    this.init(this.house);
  }
}
