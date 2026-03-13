import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { ICategories } from '../../Shared/interfaces/icategories';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-offers',
  imports: [RouterLink],
  templateUrl: './categories-offers.html',
  styleUrl: './categories-offers.css',
})
export class CategoriesOffers implements OnInit {

  private readonly ProductServices = inject(ProductServicesandCategories);
  private toastr = inject(ToastrService);

  categories: WritableSignal<ICategories[]> = signal([]);

  products: any[] = [];

  BaseUrl = "https://ourtholand.runasp.net";

  ngOnInit(): void {
    this.GetAllProduct();
  }

  GetAllProduct(): void {

    this.ProductServices.GetAllCategories().subscribe({

      next: (res) => {

        console.log(res);

        this.categories.set(res);



      },

      error: (err) => {

        console.log(err);


      }

    })
  }

  GetProductByCategoriesForAllProduct(id:number):void
  {

    this.ProductServices.GetGetProductsByCategoryId(id).subscribe({

      next:(res)=>{

        console.log(res);

        this.products = res;


      },

      error:(err)=>{

        console.log(err);


      }

    })
  }

  getImageUrl(img: string | null | undefined) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_').split('/').pop();

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

}