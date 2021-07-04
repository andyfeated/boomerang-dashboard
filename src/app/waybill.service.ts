import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class WaybillService {
  parcelObs!: Observable<any>
  placeholder!: Observable<any>

  totalWeightAfs = [0]
  totalWeightOverall = 0

  orderIDService = Math.floor(Math.random() * 100000000)

  parcels = [
    {customerName: "sample",
     awb: 0,
     mobileNumber: "sample",
     province: "sample",
     municipality: "sample",
     addressLine: "sample",
     barangay: "sample",
     productDescription: "sample",
     codFeeInt: 0,
     insuranceFeeInt: 0,
     weightInt: 0,

     codFee: "sample",
     weight: "0",
     insuranceFee: "sample",
     shipmentFee: "sample",
     remarks:"sample",
     size: "sample",

     itemValueInt: 0,
     ordersId: 0,
    }
     
  ]

  docRef: any

  constructor(private afs:AngularFirestore) {
    this.parcelObs = afs.collection("parcels").valueChanges()
   }

  returnParcel(){
    return this.parcels
  }

  addToFirestore(customerNameInput: string, awbInput: number, mobileNumberInput: string, provinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string, itemValueInput: number, codFeeInput: number, weightInput: number, insuranceFeeInput: number, shipmentFeeInput: string, remarksInput: string, sizeInput: string, shipmentFee: number, volumetricWeight: number, shopProvinceInput: string){
    this.afs.collection("parcels").add({
      customerName: customerNameInput,
      awb: awbInput,
      mobileNumber: mobileNumberInput,
      province: provinceInput,
      shopProvince: shopProvinceInput,
      municipality: municipalityInput,
      addressLine: addressLineInput,
      barangay: barangayInput,
      productDescription: productDescriptionInput,
      itemValue: itemValueInput,
      codFee: codFeeInput,
      weight: volumetricWeight,
      insuranceFee: insuranceFeeInput,
      shipmentFee: shipmentFee,
      remarks: remarksInput,
      size: sizeInput,
      ordersId: this.orderIDService
    }).then(() => {
      alert("added to database")
    })
  }

  //adds every weight and stores it in totalWeightOverall
  //  getValue(){
  //    return this.afs.collection<Parcel>("parcels").valueChanges().subscribe(parcel => {
  //      for(let i = 0; i < parcel.length; i++){
  //        const weightArray = parcel[i].weight
  //        this.totalWeightAfs.push(weightArray)
  //      }
  //      for(let j = 0; j < this.totalWeightAfs.length; j++){
  //        this.totalWeightOverall += this.totalWeightAfs[j]
  //      }
  //      console.log("Total Weight: " + this.totalWeightOverall)
  //    })
  //  }

  getTotalWeight(): Observable<string> {
    return this.afs.collection<Parcel>("parcels").valueChanges().pipe(
      map(parcel => {
       let totalWeight = 0;
       for (let i = 0; i < parcel.length; i++) {
          totalWeight += parcel[i].weight
       }
       return totalWeight.toFixed(2);       
    }))
  }

  getTotalItemValue(): Observable<number> {
    return this.afs.collection<Parcel>("parcels").valueChanges().pipe(
      map(parcel => {
        let totalValue = 0
        for (let i = 0; i < parcel.length; i++){
          totalValue += parcel[i].itemValue
        }
        return totalValue;
      })
    )
  }

  getTotalCodFee(): Observable<number> {
    return this.afs.collection<Parcel>("parcels").valueChanges().pipe(
      map(parcel => {
        let totalCodFee = 0
        for( let i = 0; i < parcel.length; i++){
          totalCodFee += parcel[i].codFee
        }
        return totalCodFee
      })
    )
  }
  
  getTotalInsuranceFee(): Observable<number> {
    return this.afs.collection<Parcel>("parcels").valueChanges().pipe(
      map(parcel => {
        let totalInsuranceFee = 0
        for(let i = 0; i < parcel.length; i++){
          totalInsuranceFee += parcel[i].insuranceFee
        }
        return totalInsuranceFee
      })
    )
  }

  getTotalParcels(): Observable<number> {
    return this.afs.collection<Parcel>("parcels").valueChanges().pipe(
      map(parcel => {
        let totalSales = 0
        for(let i = 0; i < parcel.length; i++){
          totalSales += 1
        }
        return totalSales
      })
    )
  }
  
}

export interface Parcel{
  addressLine: string,
  awb: number,
  barangay: string,
  codFee: number,
  customerName: string,
  insuranceFee: number,
  itemValue: number,
  mobileNumber: string,
  municipality: string,
  ordersId: number,
  productDescription: string,
  province: string,
  remarks:string,
  shipmentFee: string
  size: string,
  weight: number,
}