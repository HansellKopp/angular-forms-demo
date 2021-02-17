import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private formBuilder: FormBuilder) { }

  passEquals(pass: string, passRepeat: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[pass]
      const passwordRepeat = formGroup.controls[passRepeat]

      if(password.value===passwordRepeat.value) {
        passwordRepeat.setErrors(null)
      } else {
        passwordRepeat.setErrors({ passwordMismatch: true})
      }      
    }
  }

  // Mock ajax request
  userExist(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>  {
    return new Promise((resolve, rejects ) => {
      setTimeout(() => {
        if(control.value && Math.random()>=0.5) {
          resolve({ userExist: true })
        } else {
          resolve({})
        }
      }, 1000)
    })
  }
}
