import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { WaybillService } from '../waybill.service';
import { FormsModule } from '@angular/forms';

import locations from 'src/assets/data/locations.json'
import prices from 'src/assets/data/prices.json'
import waybillLocations from 'src/assets/data/waybill-locations.json'
import waybillNumbers from 'src/assets/data/waybill-numbers.json'
import waybills from 'src/assets/data/waybills.json'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnChanges {

  choice = ""

  documentId!: string
  parcelId!: string

  //Shipment Rates
  sameRegionPrices = prices[0]
  nearbyRegionPrices = prices[1]
  farRegionPrices = prices[2]
  veryFarRegionPrices = prices[3]
  
  //Shipment Fee Values
  island = ""
  regionNCR = locations[0]
  regionLuzon = locations[1]
  regionVisayas = locations[2]
  regionMindanao = locations[3]  
  shopRegions = [...this.regionNCR,...this.regionLuzon]
  shopIsland = ""

  //OBSERVABLE
  parcelObs = this.waybillService.parcelObs
  newParcelObs: any


  //Template Values
  weightNumber = "0"
  itemValueNumber = 0
  codFeeNumber = 0
  insuranceFeeNumber = 0
  parcelsNumber = 0

  //Input Values
  shipmentFee = 0
  volumetricWeight = 0
  itemValueConvert = 0                                              //Stores the itemValue's value as an integer
  weightIntConvert = 0                                              //Stores the weight's value as an integer
  codFeeIntConvert = 0                                              //Stores the codFee's value as an integer
  insuranceFeeIntConvert = 0                                        //Stores the insuranceFee's value as an integer

  codFeeValue = 0                                                   
  insuranceFeeValue = 0   
  shipmentFeeValue = 0     
  
  /////Waybill Number Values
  awbInput =  ""
  regionsNew = new Map<string, any>()
  provincesNew = new Map<string, any>()
  municipalitiesNew = new Map<string, any>()

  selectedRegion!: string
  selectedProvince!: string

  orders$!: Observable<any>

  @Input() public vipId: any
  @Input() public shopId: any
  @Input() public shopRegion: any
  @Input() public user: any

  selectedOrder: any

  constructor(private waybillService: WaybillService) { 
  }

  ngOnInit(): void {
    for(let i = 0; i < waybillLocations[0].length; i++){
      this.regionsNew.set(waybillLocations[0][i].toString(), waybillLocations[0][i].toString())
    }
    
    //set province
    for(let i = 0; i < waybillLocations[1].length; i++){
      this.provincesNew.set(waybillLocations[0][i].toString(), waybillLocations[1][i])
    }

    //set municipality
    for(let i = 0; i < waybillLocations[2].length; i++){
      this.municipalitiesNew.set(waybillLocations[3][i].toString(), waybillLocations[2][i])
    }

    this.shopRegions.sort()

  }

  ngOnChanges(changes: SimpleChanges){
    const shopIdValue = changes['shopId']

    if(changes['shopId'] != undefined){
      if(shopIdValue.currentValue != shopIdValue.previousValue){
        this.displayOrders()
      }
    }

    
  }

  setShipmentFeeAndVolumetricWeight(regionInput: string, shopRegionInput: string, sizeInput: string, lengthInput: string, widthInput: string, heightInput:string){
    //Sets the region depending on the region
    if(this.regionLuzon.includes(regionInput)){
      this.island = "Luzon"
    }else if(this.regionVisayas.includes(regionInput)){
      this.island = "Visayas"
    }else if(this.regionMindanao.includes(regionInput)){
      this.island = "Mindanao"
    }else if(this.regionNCR.includes(regionInput)){
      this.island = "NCR"
    }

    if(this.regionLuzon.includes(this.shopRegion)){
      this.shopIsland = "Luzon"
    }else if(this.regionVisayas.includes(this.shopRegion)){
      this.shopIsland = "Visayas"
    }else if(this.regionMindanao.includes(this.shopRegion)){
      this.shopIsland = "Mindanao"
    }else if(this.regionNCR.includes(this.shopRegion)){
      this.shopIsland = "NCR"
    }

    if(this.island == "NCR" && this.shopIsland == "NCR" || this.island == "Luzon" && this.shopIsland == "Luzon"){
      if(sizeInput == "Small"){
        this.shipmentFee = this.sameRegionPrices[0]
        this.volumetricWeight = 0.5
      }else if(sizeInput == "Medium"){
        this.shipmentFee = this.sameRegionPrices[1]
      this.volumetricWeight = 1
      }else if(sizeInput == "Large"){
        this.shipmentFee = this.sameRegionPrices[2]
        this.volumetricWeight = 2
      }else if(sizeInput == "Volumetric"){
        this.regionShipment(lengthInput, widthInput, heightInput, this.sameRegionPrices)
      }

    }else if(this.island == "NCR" && this.shopIsland == "Luzon" || this.island =="Luzon" && this.shopIsland == "NCR"){
      if(sizeInput == "Small"){
        this.shipmentFee = this.nearbyRegionPrices[0]
        this.volumetricWeight = 0.5
      }else if(sizeInput == "Medium"){
        this.shipmentFee = this.nearbyRegionPrices[1]
        this.volumetricWeight = 1
      }else if(sizeInput == "Large"){
        this.shipmentFee = this.nearbyRegionPrices[2]
        this.volumetricWeight = 2
      }else if(sizeInput == "Volumetric"){
        this.regionShipment(lengthInput, widthInput, heightInput, this.nearbyRegionPrices)
      }

    }else if(this.island == "Visayas" && this.shopIsland == "NCR" || this.island == "Visayas" && this.shopIsland == "Luzon"){
      if(sizeInput == "Small"){
        this.shipmentFee = this.farRegionPrices[0]
        this.volumetricWeight = 0.5
      }else if(sizeInput == "Medium"){
        this.shipmentFee = this.farRegionPrices[1]
        this.volumetricWeight = 1
      }else if(sizeInput == "Large"){
        this.shipmentFee = this.farRegionPrices[2]
        this.volumetricWeight = 2
      }else if(sizeInput == "Volumetric"){
        this.regionShipment(lengthInput, widthInput, heightInput, this.farRegionPrices)
      }

    }else if(this.island == "Mindanao" && this.shopIsland == "NCR" || this.island == "Mindanao" && this.shopIsland == "Luzon"){
      if(sizeInput == "Small"){
        this.shipmentFee = this.veryFarRegionPrices[0]
        this.volumetricWeight = 0.5
      }else if(sizeInput == "Medium"){
        this.shipmentFee = this.veryFarRegionPrices[1]
        this.volumetricWeight = 1
      }else if(sizeInput == "Large"){
        this.shipmentFee = this.veryFarRegionPrices[2]
        this.volumetricWeight = 2
      }else if(sizeInput == "Volumetric"){
        this.regionShipment(lengthInput, widthInput, heightInput, this.veryFarRegionPrices)
      }
    }
  }

  regionShipment(length: string, width: string, height: string, prices: number[]){
    this.volumetricWeight = parseInt(length) * parseInt(width) * parseInt(height) / 4200

    if(this.volumetricWeight <= 2){
      console.log("Volumetric Weight must be greater than 2KG")
      this.volumetricWeight = 0
    }
    
    for(let i = 4; i <  200; i++){
      if(this.volumetricWeight <= i && this.volumetricWeight >= i -1){
        this.shipmentFee = prices[i - 1]
      }
    }
  }

  onChange(event: any){
    this.selectedRegion = event.target.value
  }

  onChangeProvince(event: any){
    this.selectedProvince = event.target.value
  }

  generateWaybill( municipalityInput: string){
    let waybillNumber = ""

    for(let k = 0; k < waybillLocations[4].length; k++){
      if(municipalityInput == waybillLocations[4][k]){
        waybillNumber = waybills[k]
        console.log(waybillNumber)
        this.awbInput = waybillNumber + "-"+ Math.floor(Math.random()*100000+1)
        console.log(this.awbInput)
      }
    }
    
  }

  createNewOrder(){
    if(this.vipId && this.shopId != undefined){
      this.waybillService.addNewOrder(this.vipId, this.shopId)
    }else{
      alert("Please choose a User and a Shop first")
    }

  }

  displayOrders(){
    this.orders$ = this.waybillService.getOrders(this.vipId, this.shopId)
    if(this.vipId && this.shopId != undefined){

    }else{
      alert("Please choose a User and a Shop first")
    }
    
  }

  getParcels(item: any){

    this.selectedOrder = item
    this.parcelId = this.selectedOrder.id
    console.log(this.selectedOrder)


    this.waybillService.getParcels(this.vipId, this.shopId, this.parcelId).subscribe(val => {
      this.newParcelObs = val
      this.parcelsNumber = this.newParcelObs.length

      let overallWeight = 0
      let overallSales = 0
      let overallCodFee = 0
      let overallInsuranceFee = 0

      for(let i = 0; i < this.newParcelObs.length; i++){
         overallWeight += this.newParcelObs[i].orderInformation.weight
      }

      for(let i = 0; i < this.newParcelObs.length; i++){
        overallSales += this.newParcelObs[i].orderInformation.itemValue
      }

      for(let i = 0; i < this.newParcelObs.length; i++){
        overallCodFee += this.newParcelObs[i].orderInformation.codFee
      }

      for(let i = 0; i < this.newParcelObs.length; i++){
        overallInsuranceFee += this.newParcelObs[i].orderInformation.insuranceFee
      }

      this.weightNumber = overallWeight.toFixed(2)
      this.itemValueNumber = overallSales
      this.codFeeNumber = overallCodFee
      this.insuranceFeeNumber = overallInsuranceFee

      
    }) 
  }

  insertParcel(customerNameInput: string, mobileNumberInput: string, regionInput: string, provinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string,itemValueInt: string, codFeeInput: string,  weightInput: string, insuranceFeeInput: string, shipmentFeeInput: string, remarksInput: string, sizeInput: string, weightInt: string, lengthInput: string, widthInput:string, heightInput: string){
    if(this.selectedOrder == undefined){
      alert("Please Select an Order ID First Before Saving a Waybill")
    }
    this.documentId = this.selectedOrder.id
    this.generateWaybill(municipalityInput)

    this.itemValueConvert = parseInt(itemValueInt)                  //Converts the "Item Value's" value to an integer and stores it in a local variable
    this.weightIntConvert = parseInt(weightInt) / 1000              //Converts the weight's value to an integer, divides it into 1000, and stores it in a local variable
    this.codFeeIntConvert = this.itemValueConvert * 0.02            //Takes the value of itemValue, multiplies it by 0.02, and stores it in a local variable
    this.insuranceFeeIntConvert = this.itemValueConvert * 0.01      //Takes the value of itemValue, multiplies it by 0.01, and stores it in a local variable

    this.setShipmentFeeAndVolumetricWeight(regionInput, this.shopRegion, sizeInput, lengthInput, widthInput, heightInput)

    this.codFeeValue = this.codFeeIntConvert                        //returns the value of codFee and stores it in a local variable
    this.insuranceFeeValue = this.insuranceFeeIntConvert            //returns the value of insuranceFee and stores it in a local variable
    this.shipmentFeeValue = this.shipmentFee

    this.waybillService.insertParcel(this.vipId, this.shopId, this.documentId, customerNameInput, this.awbInput, mobileNumberInput, regionInput, provinceInput, municipalityInput, addressLineInput, barangayInput, productDescriptionInput, this.itemValueConvert, this.codFeeIntConvert, this.weightIntConvert, this.insuranceFeeIntConvert, shipmentFeeInput, remarksInput, sizeInput, this.shipmentFee, this.volumetricWeight, this.shopRegion)

  }

}
