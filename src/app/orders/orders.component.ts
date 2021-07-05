import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WaybillService } from '../waybill.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  choice = ""

  //Shipment Rates
  sameRegionPrices = [50, 70, 90, 190, 310, 405, 515, 555, 655, 755, 855, 955, 1055, 1155, 1255, 1355, 1455, 1555, 1655, 1755, 1855, 1955, 2055, 2155, 2255, 2355, 2455, 2555, 2655, 2755, 4307.50, 4457.50, 5357.50, 5507.50, 5657.50, 5807.50, 5957.50, 6107.50, 6257.50, 6407.50, 6557.50, 6707.50, 6857.50, 7007.50, 7157.50, 7307.50, 7457.50, 7607.50, 7757.50, 7907.50, 8057.50, 8207.50, 8357.50, 8507.50, 8657.50, 8807.50, 8957.50,
    9107.50, 9257.50, 9407.50, 9557.50, 9707.50, 9857.50, 10007.50, 10157.50, 10307.50, 10457.50, 10607.50, 10757.50, 10907.50, 11057.50, 11207.50, 11357.50, 11507.50, 11657.50, 11807.50, 11957.50, 12107.50, 12257.50, 13157.50, 13307.50, 13457.50, 13607.50, 13757.50, 13907.50, 14057.50, 14207.50, 14357.50, 14507.50, 14657.50, 14807.50, 14957.50, 15107.50, 15257.50, 15407.50, 15557.50, 15707.50, 15857.50, 16007.50, 16157.50]

  nearbyRegionPrices = [55.00, 110.00, 150.00, 220.00, 320.00, 415.00, 545.00, 585.00, 701.00, 817.00, 933.00, 1049.00, 1165.00, 1281.00, 1397.00, 1513.00, 1629.00, 1745.00, 1861.00, 1977.00, 2093.00, 2209.00, 2325.00, 2441.00, 2557.00, 2673.00, 2789.00, 2905.00, 3021.00, 3137.00, 4904.50, 5078.50, 6122.50, 6296.50, 6470.50, 6644.50, 6818.50, 6992.50, 7166.50, 7340.50, 7514.50, 7688.50, 7862.50, 8036.50, 8210.50, 8384.50, 8558.50, 8732.50, 8906.50, 9080.50, 9254.50, 9428.50,
    9602.50, 9776.50, 9950.50, 10124.50, 10298.50, 10472.50, 10646.50, 10820.50, 10994.50, 11168.50, 11342.50, 11516.50, 11690.50, 11864.50, 12038.50, 12212.50,   12386.50, 12560.50, 12734.50, 12908.50, 13082.50, 13256.50, 13430.50, 13604.50, 13778.50, 13952.50, 14126.50, 15170.50, 15344.50, 15518.50, 15692.50, 15866.50, 16040.50, 16214.50, 16388.50, 16562.50, 16736.50, 16910.50, 17084.50, 17258.50, 17432.50, 17606.50, 17780.50, 17954.50, 18128.50, 18302.50, 18476.50, 18650.50]

  farRegionPrices = [85.00, 140.00, 170.00, 250.00, 350.00, 450.00, 585.00, 625.00, 741.00, 857.00, 973.00, 1089.00, 1205.00, 1321.00, 1437.00, 1553.00, 1669.00, 1785.00, 1901.00, 2017.00, 2133.00, 2249.00, 2365.00, 2481.00, 2597.00, 2713.00, 2829.00, 2945.00, 3061.00, 3177.00, 4964.50, 5138.50, 6182.50, 6356.50, 6530.50, 6704.50, 6878.50, 7052.50, 7226.50, 7400.50, 7574.50, 7748.50, 7922.50, 8096.50, 8270.50, 8444.50, 8618.50, 8792.50, 8966.50, 9140.50, 9314.50, 9488.50, 9662.50, 9836.50,
     10010.50, 10184.50, 10358.50, 10532.50, 10706.50, 10880.50, 11054.50, 11228.50, 11402.50, 11576.50, 11750.50, 11924.50, 12098.50, 12272.50, 12446.50, 12620.50, 12794.50, 12968.50, 13142.50, 13316.50, 13490.50, 13664.50, 13838.50, 14012.50, 14186.50, 15230.50, 15404.50, 15578.50, 15752.50, 15926.50, 16100.50, 16274.50, 16448.50, 16622.50, 16796.50, 16970.50, 17144.50, 17318.50, 17492.50, 17666.50, 17840.50, 18014.50, 18188.50, 18362.50, 18536.50, 18710.50]

  veryFarRegionPrices = [90.00, 150.00, 180.00, 280.00, 390.00, 500.00, 605.00, 645.00, 761.00, 877.00, 993.00, 1109.00, 1225.00, 1341.00, 1457.00, 1573.00, 1689.00, 1805.00, 1921.00, 2037.00, 2153.00, 2269.00, 2385.00, 2501.00, 2617.00, 2733.00, 2849.00, 2965.00, 3081.00, 3197.00, 4994.50, 5168.50, 6212.50, 6386.50, 6560.50, 6734.50, 6908.50, 7082.50, 7256.50, 7430.50, 7604.50, 7778.50, 7952.50, 8126.50, 8300.50, 8474.50, 8648.50, 8822.50, 8996.50, 9170.50, 9344.50, 9518.50, 9692.50, 9866.50,
     10040.50, 10214.50, 10388.50, 10562.50, 10736.50, 10910.50, 11084.50, 11258.50, 11432.50, 11606.50, 11780.50, 11954.50, 12128.50, 12302.50, 12476.50, 12650.50, 12824.50, 12998.50, 13172.50, 13346.50, 13520.50, 13694.50, 13868.50, 14042.50, 14216.50, 15260.50, 15434.50, 15608.50, 15782.50, 15956.50, 16130.50, 16304.50, 16478.50, 16652.50, 16826.50, 17000.50, 17174.50, 17348.50, 17522.50, 17696.50, 17870.50, 18044.50, 18218.50, 18392.50, 18566.50, 18740.50]

  //Shipment Fee Values
  region = ""
  regionLuzon = ["Albay", "Camarines Sur"]
  regionVisayas = ["Cebu", "Leyte"]
  regionMindanao = ["Davao", "General Santos"]
  regionNCR = ["Manila"]
  provinces = [...this.regionNCR,...this.regionLuzon, ...this.regionVisayas, ...this.regionMindanao]
  shopProvinces = [...this.regionNCR,...this.regionLuzon]
  shopRegion = ""

  //OBSERVABLE
  parcelObs = this.waybillService.parcelObs

  //Template Values
  weightNumber = ""
  itemValueNumber = 0
  codFeeNumber = 0
  insuranceFeeNumber = 0
  parcelsNumber = 0

  //Input Values
  awbInput =  0
  shipmentFee = 0
  volumetricWeight = 0
  itemValueConvert = 0                                              //Stores the itemValue's value as an integer
  weightIntConvert = 0                                              //Stores the weight's value as an integer
  codFeeIntConvert = 0                                              //Stores the codFee's value as an integer
  insuranceFeeIntConvert = 0                                        //Stores the insuranceFee's value as an integer
  ordersID = this.waybillService.orderIDService                    //returns a random 8 digit number from waybill.service.ts

  codFeeValue = 0                                                   
  insuranceFeeValue = 0   
  shipmentFeeValue = 0                                         

  constructor(private waybillService: WaybillService) { 
    
  }

  ngOnInit(): void {
    this.provinces.sort()
    this.shopProvinces.sort()
    //Observables that return the total values and displays it in the template
    this.waybillService.getTotalWeight().subscribe(weights => {
      this.weightNumber = weights
    })

    this.waybillService.getTotalItemValue().subscribe(itemValues => {
      this.itemValueNumber = itemValues
    })
    
    this.waybillService.getTotalCodFee().subscribe(codFees => {
      this.codFeeNumber = codFees
    })

    this.waybillService.getTotalInsuranceFee().subscribe(insuranceFees => {
      this.insuranceFeeNumber = insuranceFees
    })

    this.waybillService.getTotalParcels().subscribe(parcelCounts => {
      this.parcelsNumber = parcelCounts
    })
  }

  //Adds values to the parcel collection in Firestore Database
  addParcel(customerNameInput: string, mobileNumberInput: string, provinceInput: string, shopProvinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string,itemValueInt: string, codFeeInput: string,  weightInput: string, insuranceFeeInput: string, shipmentFeeInput: string, remarksInput: string, sizeInput: string, weightInt: string, lengthInput: string, widthInput:string, heightInput: string){
    this.awbInput = Math.floor(Math.random() * 10000000000)

    this.itemValueConvert = parseInt(itemValueInt)                  //Converts the "Item Value's" value to an integer and stores it in a local variable
    this.weightIntConvert = parseInt(weightInt) / 1000              //Converts the weight's value to an integer, divides it into 1000, and stores it in a local variable
    this.codFeeIntConvert = this.itemValueConvert * 0.02            //Takes the value of itemValue, multiplies it by 0.02, and stores it in a local variable
    this.insuranceFeeIntConvert = this.itemValueConvert * 0.01      //Takes the value of itemValue, multiplies it by 0.01, and stores it in a local variable

    this.setShipmentFeeAndVolumetricWeight(provinceInput, shopProvinceInput, sizeInput, lengthInput, widthInput, heightInput)

    this.codFeeValue = this.codFeeIntConvert                        //returns the value of codFee and stores it in a local variable
    this.insuranceFeeValue = this.insuranceFeeIntConvert            //returns the value of insuranceFee and stores it in a local variable
    this.shipmentFeeValue = this.shipmentFee

    //DYNAMIC
    this.waybillService.addToFirestore(customerNameInput, this.awbInput, mobileNumberInput, provinceInput, municipalityInput, addressLineInput, barangayInput, productDescriptionInput, this.itemValueConvert, this.codFeeIntConvert, this.weightIntConvert, this.insuranceFeeIntConvert, shipmentFeeInput, remarksInput, sizeInput, this.shipmentFee, this.volumetricWeight, shopProvinceInput)
  }

  setShipmentFeeAndVolumetricWeight(provinceInput: string, shopProvinceInput: string, sizeInput: string, lengthInput: string, widthInput: string, heightInput:string){
    //Sets the region depending on the province
    if(this.regionLuzon.includes(provinceInput)){
      this.region = "Luzon"
    }else if(this.regionVisayas.includes(provinceInput)){
      this.region = "Visayas"
    }else if(this.regionMindanao.includes(provinceInput)){
      this.region = "Mindanao"
    }else if(this.regionNCR.includes(provinceInput)){
      this.region = "NCR"
    }

    if(this.regionLuzon.includes(shopProvinceInput)){
      this.shopRegion = "Luzon"
    }else if(this.regionVisayas.includes(shopProvinceInput)){
      this.shopRegion = "Visayas"
    }else if(this.regionMindanao.includes(shopProvinceInput)){
      this.shopRegion = "Mindanao"
    }else if(this.regionNCR.includes(shopProvinceInput)){
      this.shopRegion = "NCR"
    }

    if(this.region == "NCR" && this.shopRegion == "NCR" || this.region == "Luzon" && this.shopRegion == "Luzon"){
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

    }else if(this.region == "NCR" && this.shopRegion == "Luzon" || this.region =="Luzon" && this.shopRegion == "NCR"){
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

    }else if(this.region == "Visayas" && this.shopRegion == "NCR" || this.region == "Visayas" && this.shopRegion == "Luzon"){
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

    }else if(this.region == "Mindanao" && this.shopRegion == "NCR" || this.region == "Mindanao" && this.shopRegion == "Luzon"){
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
}
