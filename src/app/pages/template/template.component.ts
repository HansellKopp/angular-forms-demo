import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  user = {
    name:'',
    lastname: '',
    email: '',
    country: '',
    genre: ''
  }

  countries: any[] = [];

  ngOnInit(): void {
    this.countriesService.getCountries()
      .subscribe((data: any) => this.countries = data)
  }

  onSubmit(form: NgForm) {
    console.log('saved', form.value)
  }

  onChange(form: NgForm) {
    console.log('Changed', form)
  }

}
