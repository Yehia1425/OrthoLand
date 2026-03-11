import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IOffer } from '../../Shared/interfaces/ioffer';
import { OffersServices } from '../../Core/services/OffersServices/offers-services';

@Component({
  selector: 'app-offers',
  imports: [RouterLink],
  templateUrl: './offers.html'
})
export class Offers implements OnInit {

  private route = inject(ActivatedRoute);
  private service = inject(OffersServices);

  offers = signal<IOffer[]>([]);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.service.GetAllOffers(Number(id)).subscribe({
        next:(res)=>{
          console.log(res)
          this.offers.set(res);
        }
      })
    }

  }

}