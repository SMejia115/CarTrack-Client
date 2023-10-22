import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Definición de la estructura con la que se mandará el cuerpo de la petición
interface User {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  //Deinición del objeto user
  userData: User = {
    username: '',
    password: ''
  };

  apiUrl = 'http://localhost:5000/api/login'; //Ruta base de la API

  //Constructor
  constructor(private http: HttpClient) { }


  //Función que se ejecuta al hacer click en el botón de login
  submitLogin(){

    const getUserName = document.querySelector("#username") as HTMLInputElement;
    const getPassword = document.querySelector("#password") as HTMLInputElement;
    const username = getUserName.value;
    const password = getPassword.value;

    //Se asignan los valores de los inputs a los valores del objeto user
    this.userData = {
      username: username,
      password: password
    };

    //Se hace la petición GET a la API para verificar si el usuario existe
    this.http.get(this.apiUrl + '/' + this.userData.username).subscribe(response => {
      if (response == null){
        const user = username;
        console.log(user);
      }});

    

    };

  }

  



