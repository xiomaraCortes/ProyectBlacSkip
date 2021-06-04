import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { products } from "@core/_models/products";

@Injectable({providedIn: 'root'})

export class productsService{
    constructor(private http: HttpClient){
    }
    
    getProducts(){
        return this.http.get<products[]>(`${environment.apiUrl}products`)
    }
}
