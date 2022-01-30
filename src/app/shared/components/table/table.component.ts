import { DecimalPipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  PipeTransform,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DecimalPipe],
})
export class TableComponent implements OnInit {
  @Input() arrItems: any[] = [];
  @Input() columns: any[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = this.arrItems.length;
  items: any[] = [];
  arrItemsCopy: any[] = [];

  direction = '';
  sort = '';
  searchForm = new FormGroup({
    text: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    // OnChange in input search
    this.searchForm.controls['text'].valueChanges.subscribe((change) => {
      this.search(change);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update original array
    this.arrItems = changes['arrItems'].currentValue;

    // Load Table
    this.refreshItems();

    // Save copy original array
    this.arrItemsCopy = [...this.arrItems];
  }

  refreshItems() {
    this.items = this.arrItems
      .map((item, i) => ({
        ...(item as {}),
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );

    this.collectionSize = this.arrItems.length;
  }

  onSort(column: string, dir?: string) {
    this.sort = column;

    if (!dir) {
      if (this.direction == 'asc') {
        this.direction = 'desc';
      } else {
        this.direction = 'asc';
      }
    } else {
      this.direction = dir;
    }

    if (this.direction === 'asc') {
      this.arrItems.sort(function (a, b) {
        if (a[column] > b[column]) {
          return 1;
        }
        if (a[column] < b[column]) {
          return -1;
        }
        return 0;
      });
    } else if (this.direction === 'desc') {
      this.arrItems.sort(function (a, b) {
        if (a[column] > b[column]) {
          return -1;
        }
        if (a[column] < b[column]) {
          return 1;
        }
        return 0;
      });
    } else {
      this.arrItems.sort(function (a, b) {
        return 0;
      });
    }

    this.refreshItems();
  }

  search(text: string) {
    if (text == '') {
      this.arrItems = [...this.arrItemsCopy];
      if (this.sort !== '') {
        if (this.direction !== '') {
          this.onSort(this.sort, this.direction);
        } else {
          this.onSort(this.sort);
        }
      }
    } else {
      this.arrItems = [...this.arrItemsCopy];
      this.arrItems = this.arrItems.filter((item) => {
        const term = text.toLowerCase();
        let include = false;
        for (let index = 0; index < this.columns.length; index++) {
          if (this.columns[index].sortable) {
            if (this.columns[index].type == 'string') {
              if (item[this.columns[index].name].toLowerCase().includes(term)) {
                include = true;
              }
            } else {
              if (
                item[this.columns[index].name]
                  .toString()
                  .toLowerCase()
                  .includes(term)
              ) {
                include = true;
              }
            }
          }
        }

        return include;
      });
    }

    this.refreshItems();

    this.collectionSize = this.arrItems.length;
  }
}
