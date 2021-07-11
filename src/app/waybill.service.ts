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
  orderObs$!: Observable<any>
  newParcelObs$!: Observable<any>
  placeholder!: Observable<any>

  totalWeightAfs = [0]
  totalWeightOverall = 0

  orderIDService = Math.floor(Math.random() * 100000000)
  docRef: any

  constructor(private afs:AngularFirestore) {
    this.parcelObs = afs.collection("parcels").valueChanges()
    this.orderObs$ = afs.collection("orders").valueChanges()
  }

  addNewOrder(){
    let orderId = this.afs.createId()
    this.afs.collection("orders").doc(orderId).set({
      orderId: Math.floor(Math.random() * 1000000),
      id: orderId
    }).then(() => {
      alert("New Order Generated")
    })
  }

  insertParcel(documentId: string, customerNameInput: string, awbInput: string, mobileNumberInput: string, regionInput: string, provinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string, itemValueInput: number, codFeeInput: number, weightInput: number, insuranceFeeInput: number, shipmentFeeInput: string, remarksInput: string, sizeInput: string, shipmentFee: number, volumetricWeight: number, shopRegionInput: string){
    let documentParcelId = this.afs.createId()

    this.afs.collection("orders").doc(documentId).collection("parcels").doc(documentParcelId).set({
      id: documentParcelId,
      customerInfo: {
        customerName: customerNameInput,
        mobileNumber: mobileNumberInput,
      },
      address:{
        region: regionInput,
        province: provinceInput,
        municipality: municipalityInput,
        shopRegion: shopRegionInput,
        barangay: barangayInput,
        addressLine: addressLineInput,
      },
      
      parcelInfo:{
        awb: awbInput,
        productDescription: productDescriptionInput,
        itemValue: itemValueInput,
        weight: volumetricWeight,
        codFee: codFeeInput,
        insuranceFee: insuranceFeeInput,
        shipmentFee: shipmentFee,
        remarks: remarksInput,
        size: sizeInput,
      },
    }).then(() => {
      alert("Parcel added to Orders")
    })
  }

  addToFirestore(customerNameInput: string, awbInput: string, mobileNumberInput: string, regionInput: string, provinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string, itemValueInput: number, codFeeInput: number, weightInput: number, insuranceFeeInput: number, shipmentFeeInput: string, remarksInput: string, sizeInput: string, shipmentFee: number, volumetricWeight: number, shopRegionInput: string){
    let documentId = this.afs.createId()
    this.afs.collection("parcels").doc(documentId).set({
      id: documentId,
      customerName: customerNameInput,
      awb: awbInput,
      mobileNumber: mobileNumberInput,
      region: regionInput,
      shopRegion: shopRegionInput,
      province: provinceInput,
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

  delete(id: string){
    this.afs.collection("parcels").doc(id).delete()
  }

  getParcels(parcelId: string){
    return this.afs.collection("orders").doc(parcelId).collection("parcels").valueChanges()
  }
  
}

export interface Parcel{
  addressLine: string,
  awb: string,
  barangay: string,
  codFee: number,
  customerName: string,
  id: string,
  insuranceFee: number,
  itemValue: number,
  mobileNumber: string,
  province: string,
  municipality: string,
  ordersId: number,
  productDescription: string,
  region: string,
  remarks:string,
  shipmentFee: string
  size: string,
  weight: number,
}