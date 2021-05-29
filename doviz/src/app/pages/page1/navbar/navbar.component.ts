import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataModel } from '../page1.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dataTimeStamp:DataModel;
  timeStamp:number;
  constructor(private apiService:ApiServiceService) { }

  ngOnInit(): void {
    this.CatchTimeStamp()
    interval(10000).subscribe((val) => {

      this.CatchTimeStamp();
    });
  }

  CatchTimeStamp(){
    this.apiService.getData().subscribe((data:DataModel) => {
      this.timeStamp=data.timestamp;

  });

}
}
