import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cars-view',
  templateUrl: './cars-view.component.html',
  styleUrls: ['./cars-view.component.css']
})
export class CarsViewComponent {
  constructor(private http: HttpClient) {}


  cars: any[] = [];

  ngOnInit(): void {
    this.obtainCars();
  }

  obtainCars(){
    this.http.get('http://localhost:5000/available/cars/images').subscribe(
      (response: any) => {
        console.log('Cars obtained:', response);
        this.cars = response;
        console.log(this.cars);
      },
      (error: any) => {
        console.error('Error obtaining cars:', error);
      }
    );
  }


}
