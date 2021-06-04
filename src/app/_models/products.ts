
export class products{
    name:string;
    price:number;
    image:string;

    constructor(values: object = {}){
        //Contructor initialization
        Object.assign(this, values);
    }
}