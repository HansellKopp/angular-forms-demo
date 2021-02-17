import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userValidators: ValidatorsService) {
     this.logChanges()
   }

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)], this.userValidators.userExist],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordRepeat: ['', [Validators.required, Validators.minLength(6)]],
    address: this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['', [Validators.required, Validators.minLength(2)]],  
    }),
    contacts: this.formBuilder.array([''])
  }, {
    validators: this.userValidators.passEquals('password','passwordRepeat')
  })

  logChanges() {
    this.form.valueChanges.subscribe(data=> console.log(data))
  }

  addContact() {
    this.contacts.push(this.formBuilder.control('', Validators.required))    
  }

  removeContact(index: number) {
    this.contacts.removeAt(index)
  }

  ngOnInit(): void {
  }

  save() {
    Object.values(this.form.controls)
          .forEach((control: AbstractControl) => control?.markAllAsTouched());
  }
  
  get nameExist() {
    return this.form.get('name')?.errors?.userExist &&
           this.form.get('name')?.touched
  }

  get nameIsRequired() {
    return this.form.get('name')?.errors?.required
  }

  get passwordsMismatch() {
    return this.form.get('passwordRepeat')?.errors?.passwordMismatch
  }

  get contacts() {
    return this.form.get('contacts') as FormArray
  }

  hasErrors(p: string) {
    const field=this.form.get(p)
    return field?.invalid && field?.touched
  }
}
