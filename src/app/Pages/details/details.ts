import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { IProductSpec } from '../../Shared/interfaces/iproduct-spec';
import { CartServices } from '../../Core/services/CartServcies/cart-services';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductServicesandCategories);
  private cart = inject(CartServices);

  BaseUrl = "https://ourtholand.runasp.net";

  product = signal<IProductSpec | null>(null);
  quantity = signal(1);

getImageUrl(img: string | undefined){
  if(!img) return '';
  const cleanName = img.replace(/\s+/g,'_');
  return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.GetProductById(Number(id)).subscribe({
        next: (res: IProductSpec) => {
          this.product.set(res);
        },
        error: (err) => console.error(err)
      });
    }

  }

  increase(): void {
    this.quantity.update(q => q + 1);
  }

  decrease(): void {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  addToCart(product: IProductSpec){

    let items = [...this.cart.cartItems()];

    const existingItem = items.find(x => x.id === product.id);

    if(existingItem){

      existingItem.quantity += this.quantity();

    }else{

items.push({
  id: product.id,
  name: product.name,
  description: product.description,
  price: product.price,
  quantity: 1,
  pictureUrl: product.picturesUrls[0]
});

    }

    this.cart.cartItems.set(items);

    const basket = {
      id: this.cart.basketId,
      items: items
    }

    this.cart.createOrUpdateBasket(basket).subscribe({

      next:(res)=>{
        console.log("Added To Cart",res);
      },

      error:(err)=>{
        console.log(err);
      }

    });

  }

}