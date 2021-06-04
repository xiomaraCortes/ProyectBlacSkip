import { Component, OnInit } from '@angular/core';
import { productsService } from '@core/_services/products.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  public products : any
  constructor(
    private productsService : productsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts()
    .subscribe((data:any)=>{
      this.products = data;
    }, err =>{
        console.log(err)
    })
  }
 
}
