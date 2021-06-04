
export class contactForm{
    name:string;
    lastName:string;
    email:string;
    phone:number;
    code:number;
    colonies:any;
    state:string;
    city:string;
    town:string;
    street:string;
    billingAddress:string;

    constructor(values: object = {}){
        //Contructor initialization
        Object.assign(this, values);
    }
}