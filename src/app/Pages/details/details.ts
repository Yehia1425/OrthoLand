import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { IProductSpec } from '../../Shared/interfaces/iproduct-spec';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { ToastrService } from 'ngx-toastr';
import { OffersServices } from '../../Core/services/OffersServices/offers-services';
import { IOffer } from '../../Shared/interfaces/ioffer';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductServicesandCategories);
  private cart = inject(CartServices);
  private toastr = inject(ToastrService);
  private offerService = inject(OffersServices);

  BaseUrl = "https://ourtholand.runasp.net";

  product = signal<IProductSpec | null>(null);
  offer = signal<IOffer | null>(null);

  quantity = signal(1);

  selectedImage = signal<string | null>(null);

  getImageUrl(img: string | undefined | null){
    if(!img) return '';
    const cleanName = img.replace(/\s+/g,'_');
    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      const productId = Number(id);

      // GET PRODUCT
      this.productService.GetProductById(productId).subscribe({

        next: (res: IProductSpec) => {

          this.product.set(res);

          if(res.picturesUrls?.length){
            this.selectedImage.set(res.picturesUrls[0]);
          }

        },

        error: (err) => {
          console.error(err);
        }

      });

      // GET OFFER
      this.offerService.GetOfferByProductId(productId).subscribe({

        next:(offer:IOffer)=>{

          if(!offer) return;

          const today = new Date();
          const start = new Date(offer.startDate);
          const end = new Date(offer.endDate);

          if(today >= start && today <= end){
            this.offer.set(offer);
          }

        },

        error:()=>{}

      });

    }

  }

  changeImage(img:string){
    this.selectedImage.set(img);
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

    let quantityToAdd = this.quantity();

    let buyQuantity;
    let getQuantity;

    if(this.offer()){

      buyQuantity = this.offer()!.buyQuantity;
      getQuantity = this.offer()!.getQuantity;

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
        pictureUrl: product.picturesUrls[0],
        buyQuantity: buyQuantity,
        getQuantity: getQuantity
      });

    }

    this.cart.cartItems.set(items);

    const basket = {
      id: this.cart.basketId,
      items: items
    }

    this.cart.createOrUpdateBasket(basket).subscribe({

      next:()=>{

        this.toastr.success("Product added to cart 🛒");

      },

      error:()=>{

        this.toastr.error("Failed to add product");

      }

    });

  }

}