import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { contactForm } from "@core/_models/contactForm";
import { environment } from "@env/environment";

@Injectable({providedIn: 'root'})

export class postForm{
    constructor(private http:HttpClient){
    }

    postContactForm(data){
        console.log("Contact Form")
        console.log(data)
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('lastName', data.lastName)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('code', data.code)
        formData.append('colonies', data.colonies)
        formData.append('state', data.state)
        formData.append('city', data.city)
        formData.append('town', data.town)
        formData.append('street', data.street)
        formData.append('billingAddress', data.billingAddress)
        return this.http.post<contactForm[]>(`${environment.apiUrl}contact`, formData);
    }
}
