import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { loadModules } from 'esri-loader';

import esri = __esri; // Esri types

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: false })
  private mapElementRef?: ElementRef;
  mapView?: esri.MapView;
  map?: esri.Map;
  defaultCenterLat: number = 42.697866831005435;//LOCATION SOFIA
  defaultCenterLon: number = 23.321590139866355;//LOCATION SOFIA
  defaultZoom: number = 10;
  defaultBaseMap: string = 'streets-vector';
  constructor(private shared: CommonService) { }

  ngAfterViewInit(): void {
    this.initDefaultMap();
  }



  ngOnInit() {
    this.shared.centerArr$.subscribe(
      centerArr => {

        if (this.mapView) {

          this.mapView!.goTo({
            center: centerArr,
            zoom: 14,

          }).catch(function (error) {
            console.error(error)
          })
        }
      })
  }

  private async initDefaultMap(): Promise<void> {
    const [Map, MapView] = await loadModules(['esri/WebMap', 'esri/views/MapView']);
    this.map = new Map({
      basemap: this.defaultBaseMap,
    });

    this.mapView = new MapView({
      map: this.map,
      center: [this.defaultCenterLon, this.defaultCenterLat],
      zoom: this.defaultZoom,
      container: this.mapElementRef?.nativeElement,
      ui: {
        components: ['attribution'],
      },
    });
  }
}
