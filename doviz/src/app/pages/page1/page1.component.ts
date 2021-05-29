import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { IDataModel } from 'src/app/models/data-model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { interval } from 'rxjs';

export interface DataModel {
  success: string;
  timestamp: number;
  rates: object;
  date: string;
  base: string;
}

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
})
export class Page1Component implements OnInit {
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  model: any = [];
  dataModel: DataModel;
  rates: IDataModel[] = [];
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  sayi: number = 1903;
  dataSource = new MatTableDataSource<IDataModel>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
  }

  displayedColumns: string[] = ['name', 'weight'];


  constructor(private apiService: ApiServiceService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
    //10 saniye de bir veriler güncellenecektir.
    interval(10000).subscribe((val) => {
      this.getData();
    });
  }

  getData() {
    this.rates.length = 0;
    this.apiService.getData().subscribe((data: DataModel) => {
      this.model = data;
      this.dataModel = this.model;


      //Gelen Datayı Array Formatıyla Kapsülleme yaptım.
      Object.keys(this.model.rates).forEach((key) => {
        let value = this.model.rates[key];
        this.rates.push({ name: key, price: value });
      });

      if (this.dataSource.data.length == 0) {
        this.dataSource.data = this.rates;
      } else {
        this.rates.forEach((element) => {
          this.dataSource.data = this.dataSource.data.filter((value, key) => {
            if (value.name == element.name) {
              value.price = element.price; //Sayfann yenilenmeden sadece değerlerin güncellendiği kısım
            }
            return true;
          });
        });
      }
      // console.log('istek atıldı');
      // console.log(this.dataSource.filteredData);
    });
  }


}
