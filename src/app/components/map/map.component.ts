import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
  graphicsLayer?: esri.GraphicsLayer;
  point?: {};
  webStyleSymbol?: esri.WebStyleSymbol;
  pointGraphic?: esri.Graphic;
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
            zoom: 12,

          }).catch(function (error) {
            console.error(error)
          });

          if (centerArr && this.map && this.graphicsLayer) {
            this.map.remove(this.graphicsLayer)

            this.addPoint(centerArr[0], centerArr[1])
          };
        };
      });

  };

 
 
 
  private async initDefaultMap(): Promise<void> {
    const [Map, MapView, GraphicsLayer] = await loadModules(['esri/WebMap', 'esri/views/MapView', 'esri/layers/GraphicsLayer']);



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
      }
    });


    this.graphicsLayer = new GraphicsLayer();

    if (this.map && this.graphicsLayer) {
      this.map.add(this.graphicsLayer);
    };
 
 
  };




  
  private async addPoint(lon: number, lat: number): Promise<void> {
    
    const [ GraphicsLayer, WebStyleSymbol, Graphic] = await loadModules([ 'esri/layers/GraphicsLayer', 'esri/symbols/WebStyleSymbol', 'esri/Graphic']);

    this.graphicsLayer = new GraphicsLayer();

    if (this.map && this.graphicsLayer) {
      this.map.add(this.graphicsLayer);
    };

    this.point = {
      type: "point",
      longitude: lon,
      latitude: lat
    };


    this.webStyleSymbol = new WebStyleSymbol({
      name: "push-pin-1",
      styleName: "Esri2DPointSymbolsStyle"
    });


    this.pointGraphic = new Graphic({
      geometry: this.point,
      symbol: this.webStyleSymbol
    });


    if (this.graphicsLayer && this.pointGraphic) {
      this.graphicsLayer.add(this.pointGraphic);

    };


  }



}
