import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { ICategories } from '../../Shared/interfaces/icategories';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {

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

        this.toastr.success("Categories loaded successfully");

      },

      error: (err) => {

        console.log(err);

        this.toastr.error("Error loading categories");

      }

    })

  }


  GetProductByCategoriesForAllProduct(id:number):void
  {

    this.ProductServices.GetGetProductsByCategoryId(id).subscribe({

      next:(res)=>{

        console.log(res);

        this.products = res;

        this.toastr.info("Products loaded");

      },

      error:(err)=>{

        console.log(err);

        this.toastr.error("Error loading products");

      }

    })

  }


  getImageUrl(img: string | null | undefined) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_').split('/').pop();

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

}