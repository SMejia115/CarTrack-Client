import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarsService } from 'src/app/services/cars.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  car: any = {};
  images: string[] = [];
  carID = this.route.snapshot.params['id'];
  

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private carsService: CarsService) { }

  ngOnInit(): void {
    this.obtainCar();
    console.log(this.car);
  }


  obtainCar(){
    this.http.get(`http://localhost:5000/car/images/${this.carID}`).subscribe(
      (response: any) => {
        console.log('Cars obtained:', response);
        this.car = response.car;
        console.log(this.car);
      },
      (error: any) => {
        console.error('Error obtaining cars:', error);
      }
    );
  }


}
