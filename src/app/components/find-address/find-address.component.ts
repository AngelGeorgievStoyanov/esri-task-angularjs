import { Component, ElementRef, ViewChild } from '@angular/core';
import { ArcgisService } from 'src/app/services/arcgisService';

@Component({
  selector: 'app-find-address',
  templateUrl: './find-address.component.html',
  styleUrls: ['./find-address.component.css']
})
export class FindAddressComponent {
  @ViewChild("inpAdrs") inpAdrs: ElementRef | undefined;

  constructor(private arcgisService: ArcgisService) { }

  onHandleChange(e: Event): void {
    let inp = e.currentTarget as HTMLInputElement;
    if (typeof inp.value === "string" && inp.value.trim() !== "") {
      this.arcgisService.findSuggestAdress(inp.value).subscribe({
        next: (data: any) => {
          console.log(data)
        },
        error: (err) => {
          console.log(err)

        }
      })

    }
  }



  onHandleSubmit(e: Event) {

    e.preventDefault()
    if ((this.inpAdrs) && typeof this.inpAdrs.nativeElement.value === "string" && this.inpAdrs.nativeElement.value.trim() !== "") {
      this.arcgisService.findAddress(this.inpAdrs.nativeElement.value).subscribe({
        next: (data: any) => {

          console.log(data)

        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

}
