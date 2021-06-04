import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { postalCodes } from "@core/_models/postalCodes";

@Injectable({providedIn: 'root'})

export class postalCodesService{
    constructor(private http: HttpClient){
    }
    
    getCodes(code){
        return this.http.get<postalCodes[]>(`${environment.apiUrl}postalCodes/${code}`)
    }
}
