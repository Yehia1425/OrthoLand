import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { OffersServices } from '../../Core/services/OffersServices/offers-services';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IProduct } from '../../Shared/interfaces/iproduct';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './offers.html'
})
export class Offers implements OnInit {

  private route = inject(ActivatedRoute);
  private offerService = inject(OffersServices);
  private productService = inject(ProductServicesandCategories);
  private cartService = inject(CartServices);
  private toastr = inject(ToastrService);

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);

  searchControl = new FormControl('');

  BaseUrl = "https://ourtholand.runasp.net";

  ngOnInit(): void {

    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId) {

      this.offerService.GetAllOffers(Number(categoryId)).subscribe({

        next: (offers) => {

          const productsList: any[] = [];

          offers.forEach((offer: any) => {

            this.productService.GetProductById(offer.productId).subscribe({

              next: (product) => {

                product.offer = offer;

                productsList.push(product);

                this.products.set([...productsList]);
                this.filteredProducts.set([...productsList]);

              },

              error: () => {


              }

            });

          });


        },

        error: () => {


        }

      });

    }

    // SEARCH
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {

        const search = value?.toLowerCase() || '';

        this.filteredProducts.set(
          this.products().filter(p =>
            p.name.toLowerCase().includes(search)
          )
        );

      });

  }

addToCart(product: any) {

  const items = [...this.cartService.cartItems()];

  const existingItem = items.find(x => x.id === product.id);

  let quantityToAdd = 1;
  let buyQuantity;
  let getQuantity;

  if(product.offer){

    buyQuantity = product.offer.buyQuantity;
    getQuantity = product.offer.getQuantity;

    quantityToAdd = buyQuantity + getQuantity;

  }

  if(existingItem){

    existingItem.quantity += quantityToAdd;

  }else{

    items.push({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: quantityToAdd,
      pictureUrl: product.picturesUrls?.[0] ?? '',
      buyQuantity: buyQuantity,
      getQuantity: getQuantity
    });

  }

  this.cartService.cartItems.set(items);

  const basket = {
    id: this.cartService.basketId,
    items: items
  };

  this.cartService.createOrUpdateBasket(basket).subscribe({

    next: () => {

      this.toastr.success(`${product.name} added to cart 🛒`);

    },

    error: () => {

      this.toastr.error("Failed to add product");

    }

  });

}

  getImageUrl(img: string | null | undefined) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_').split('/').pop();

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;

  }

}