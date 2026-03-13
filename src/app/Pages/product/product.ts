import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductServicesandCategories } from '../../Core/services/ProductServicesandCategories/product-servicesand-categories';
import { IProduct } from '../../Shared/interfaces/iproduct';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {

  private productService = inject(ProductServicesandCategories);
  private cartService = inject(CartServices);
  private route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  BaseUrl = "https://ourtholand.runasp.net";

  products = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);

  videoUrl = signal<string>("");

  searchControl = new FormControl('');

  getImageUrl(img: string) {
    if (!img) return '';
    const cleanName = img.replace(/\s+/g, '_');
    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

  getVideoUrl(video: string) {
    if (!video) return '';
    const cleanName = video.replace(/\s+/g, '_');
    return `${this.BaseUrl}/api/Attachment/get-video/${cleanName}`;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (!id) return;

      this.loadProducts(Number(id));

    });

    this.route.queryParamMap.subscribe(params => {

      const video = params.get('video');

      if (video) {
        this.videoUrl.set(video);
      }

    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {

        const search = value?.toLowerCase() || '';

        const filtered = this.products().filter(p =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
        );

        this.filteredProducts.set(filtered);

      });

  }

  loadProducts(id: number): void {

    this.productService.GetGetProductsByCategoryId(id).subscribe({

      next: (res: IProduct[]) => {

        const sortedProducts = res.sort((a,b)=> b.rate - a.rate);

        this.products.set(sortedProducts);
        this.filteredProducts.set(sortedProducts);


      },

      error: (err) => {

        console.error(err);


      }

    });

  }

  addToCart(product: IProduct){

    let items = [...this.cartService.cartItems()];

    const existingItem = items.find(x => x.id === product.id);

    if(existingItem){
      existingItem.quantity++;
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

    this.cartService.cartItems.set(items);

    const basket = {
      id: this.cartService.basketId,
      items: items
    }

    this.cartService.createOrUpdateBasket(basket).subscribe({

      next: () => {

        this.toastr.success(`${product.name} added to cart `);

      },

      error: () => {

        this.toastr.error("Failed to add product");

      }

    });

  }

}