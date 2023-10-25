import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  nuevoAutoForm: FormGroup; 
  uploadedFiles: File[] = [];
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.nuevoAutoForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      color: ['', Validators.required],
      fuelType: ['', Validators.required],
      chassisNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(17)]],
      engineNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(17)]],
      licensePlate: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(7)]],
      city: ['', Validators.required],
      appraisal: ['', [Validators.required, Validators.min(1)]],
      cylinderCapacity: ['', Validators.required],
      transitLicenseNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(17)]],
      soatDate: [''],
      tecnoDate: [''],
      previousOwner: [''],
      type: ['', Validators.required]
    });
  }

  isSubmitButtonDisabled(): boolean {
    const requiredFields = [
      'brand',
      'model',
      'year',
      'color',
      'fuelType',
      'chassisNumber',
      'engineNumber',
      'licensePlate',
      'city',
      'appraisal',
      'cylinderCapacity',
      'transitLicenseNumber',
      'type'
    ];

    for (const fieldName of requiredFields) {
      if (!this.nuevoAutoForm.get(fieldName)?.value) {
        return true; // Desactivar el botón si algún campo requerido está vacío
      }
    }

    return false; // Habilitar el botón si todos los campos requeridos están completos
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const files = inputElement.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isImageFile(file)) {
          this.uploadedFiles.push(file);
        } else {
          this.errorMessage = 'Error: solo se pueden agregar imágenes.';
        }
      }
    }
  }

  isImageFile(file: File): boolean {
    // Verifica si la extensión del archivo corresponde a una imagen (puedes personalizar esta lógica)
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    return allowedExtensions.test(file.name);
  }

  obtainClientIDbyIdentificationNumber(identificationNumber : string){
    //Obtiene el ID del cliente a partir del número de identificación
    this.http.get(`http://localhost:5000/clients/identificationNumber/${identificationNumber}`).subscribe(
      (response: any) => {
        console.log('Client ID obtained:', response.clientID);
        return response.clientID;
      },
      (error: any) => {
        window.alert('No hay ningún cliente registrado el número de identificación "' + identificationNumber + '" regístrelo primero.');
        console.error('Error obtaining client ID:', error);
      }
    );
  }

  onSubmit() {
    // Verifica si hay un cliente registrado con el número de identificación ingresado y obtiene su ID
    // En caso de que no haya ningún cliente registrado con ese número de identificación notifica
    // al usuario que debe registrar al cliente primero
    const clientID = this.obtainClientIDbyIdentificationNumber(this.nuevoAutoForm.value.previousOwner);


  }
}