import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarsService } from 'src/app/services/cars.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service'; // Importamos el servicio de localStorage para poder usarlo
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{
  car: any = {};
  images: string[] = [];
  carID = this.route.snapshot.params['id'];
  selectedImage: string = '';
  clientInfo: any = null;
  clientDocument: string = '';
  finalSalePrice: number = 0;
  clientNotFound: boolean = false;
  sellerToken: any = null;
  sellerID: any = null;
  decodeSellerToken: any = null;
  

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private carsService: CarsService,
     private localStorageService: LocalStorageService ) { };

  ngOnInit(): void {
    this.obtainCar();
    console.log(this.car);
    this.sellerToken = this.localStorageService.getItem('token'); // Obtenemos el ID del vendedor del localStorage
    console.log("Token --> "+this.sellerToken.token);
    this.decodeSellerToken = jwt_decode(this.sellerToken); // Decodificamos el token para obtener el ID del vendedor
    console.log(this.decodeSellerToken);
    console.log(this.decodeSellerToken.id);
    this.sellerID = this.decodeSellerToken.id; // Obtenemos el ID del vendedor
  }


  obtainCar(){
    this.http.get(`http://localhost:5000/car/images/${this.carID}`).subscribe(
      (response: any) => {
        console.log('Cars obtained:', response);
        this.car = response.car;
        for (const image of response.carImages) {
          this.images.push(image.ImageURL); // Agregamos cada URL de imagen al array "images"
        }
        this.selectedImage = this.images[0]; // Seleccionamos la primera imagen del array
        this.finalSalePrice = parseInt(this.car.appraisal) * 1.1;
      },
      (error: any) => {
        console.error('Error obtaining cars:', error);
      }
    );
  }

  getClientInfo() {
    this.http.get(`http://localhost:5000/clients/identificationNumber/${this.clientDocument}`).subscribe(
      (response: any) => {
        this.clientInfo = response;
        console.log('Información del cliente obtenida:', response); 
        this.clientNotFound = false;
      },
      (error: any) => {
        this.clientNotFound = true;
        console.error('Error obteniendo información del cliente:', error);
      }
    );}

  changeImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  // registerSale(){
  //   this.http.post(`http://localhost:5000/sales`, {
  //     "carID": this.carID,
  //     "clientID": this.clientInfo.clientID,
  //     "salePrice": this.finalSalePrice
  //     "sellerID": 
  //   }).subscribe(
  //     (response: any) => {
  //       console.log('Venta registrada:', response);
  //       this.router.navigate([`/home`]);
  //     },
  //     (error: any) => {
  //       console.error('Error registrando la venta:', error);
  //     }
  //   );}

  registerSale(){}




}
