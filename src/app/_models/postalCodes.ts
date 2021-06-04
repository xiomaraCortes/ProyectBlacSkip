
export class postalCodes{
    code: number;
    state: string;
    city: string;
    town:string;
    colonies: any;

    constructor(values: object = {}){
        //Contructor initialization
        Object.assign(this, values);
    }
}