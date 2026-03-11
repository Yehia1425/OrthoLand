import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategories } from '../../Shared/interfaces/icategories';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-offers',
  imports: [RouterLink],
  templateUrl: './categories-offers.html',
  styleUrl: './categories-offers.css',
})
export class CategoriesOffers {
 private readonly ProductServices=inject(ProductServicesandCategories);

  categories:WritableSignal<ICategories[]>=signal([]);

  products:any[]=[];

ngOnInit(): void {
    this.GetAllProduct();
    
}


GetAllProduct():void{
  this.ProductServices.GetAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
      this.categories.set(res)

    },
    error:(err)=>{
      console.log(err);
    }
  })
}


GetProductByCategoriesForAllProduct(id:number):void
{
  this.ProductServices.GetGetProductsByCategoryId(id).subscribe({
    next:(res)=>{
      console.log(res);
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
}
