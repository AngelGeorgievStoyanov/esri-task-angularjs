import { Component, ElementRef, ViewChild } from '@angular/core';
import { ArcgisService } from 'src/app/services/arcgisService';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-find-address',
  templateUrl: './find-address.component.html',
  styleUrls: ['./find-address.component.css']
})
export class FindAddressComponent {

  @ViewChild("inpAdrs") inpAdrs: ElementRef | undefined;
  findAddresses: Blob[] | undefined;

  constructor(private arcgisService: ArcgisService, private shared: CommonService) { }

  onHandleChange(e: Event): void {
    let inp = e.currentTarget as HTMLInputElement;
    if (typeof inp.value === "string" && inp.value.trim() !== "") {
      this.arcgisService.findSuggestAdress(inp.value).subscribe({
        next: (data: any) => {
          this.findAddresses = data.suggestions;
        },
        error: (err) => {
          console.log(err);

        }
      });

    };
  };


  onHandleSubmit(e: Event) {

    e.preventDefault();
    if ((this.inpAdrs) && typeof this.inpAdrs.nativeElement.value === "string" && this.inpAdrs.nativeElement.value.trim() !== "") {
      this.arcgisService.findAddress(this.inpAdrs.nativeElement.value).subscribe({
        next: (data: any) => {

          this.shared.updateCenterArr([data.candidates[0].location.x, data.candidates[0].location.y]);

        },
        error: (err) => {
          console.log(err);
        }
      });
    };
  };


  handleClickSuggestion(e: Event) {

    const seggestion = e.target as HTMLLIElement;
    if (this.inpAdrs !== undefined) {
      this.inpAdrs.nativeElement.value = seggestion.innerText;
      this.findAddresses = [];
    };
  };

};
