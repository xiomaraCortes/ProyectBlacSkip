import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postalCodesService } from '@core/_services/getCodes.service';
import { postForm } from "@core/_services/contactForm.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  public code : string = null;
  public UserForm: FormGroup 
  public multipleColonies: Boolean = false;
  public loading: Boolean = false;
  public coloniesGroup: any = [];
  public error: any
  
  constructor
  (
    private formBuilder :FormBuilder,
    private codesService : postalCodesService,
    private postForm : postForm
  ) { }

  ngOnInit(): void {
    this.createForm()
  }
  submitForm(){
    this.UserForm.disable()
    this.loading =true
    this.postForm.postContactForm(this.UserForm.value)
    .pipe(first())
    .subscribe((data:any)=>{
      this.UserForm.reset()
      this.UserForm.enable()
      this.loading = false
      
    },err=>{
      if(err){
        this.error = err;
        console.log(this.error)
      }
    })
  }
  
  createForm(){
    this.UserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(150)]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{6,12}$')]],
      code: ['', [Validators.required, Validators.pattern('[0-9]{5,12}$')]],
      colonies: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      town: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.pattern('^[A-Za-z\ \ñäáàëéèíìöóòúùÄÁÀËÉÈÍÌÖÓÒÚÙÑñ]+'), Validators.minLength(3), Validators.maxLength(50)]],
      billingAddress: ['', [Validators.required]]
    });
  }
  
  getCodes(){
    if (this.UserForm.value.code && this.UserForm.value.code.length >=3){
      console.log(this.UserForm.value.code);
      this.codesService.getCodes(this.UserForm.value.code)
      .subscribe((data:any)=>{
        console.log(data);
        if(data== "" || data==[] || !data){
          this.UserForm.patchValue({          
            colonies:'',
            state:'',
            city:'',
            town:'',
            street:''
          })
        }else{
          //Operador ternario
          //data.colonies.length>1 ? this.multipleColonies=true : this.multipleColonies=false
          if( data.colonies && data.colonies.length>1 && typeof data.colonies == 'object'){
            this.multipleColonies = true
            this.coloniesGroup = data.colonies[0]
          }else{
            this.multipleColonies=false
            this.UserForm.patchValue({
              colonies:data.colonies.toString()
            })
          }
          this.UserForm.patchValue({          
            state:data.state,
            city:data.city,
            town:data.town,
            street:data.street
          })
        }
      },err => {
        console.log(err)
      })
    }
    
  }
}
