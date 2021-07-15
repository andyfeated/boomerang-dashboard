import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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

  vips$!: Observable<Vip[]>
  shops$?: Observable<any>
  orders$?: Observable<any>

  userCredentialsService: any
  user: any

  isLoggedIn = false

  constructor(private afs:AngularFirestore, private auth: AngularFireAuth) {
    this.vips$ = afs.collection<Vip>("vips").valueChanges()
    this.shops$ = afs.collection("shops").valueChanges()
    this.orders$ = afs.collection("orders").valueChanges()

    this.parcelObs = afs.collection("parcels").valueChanges()
    this.orderObs$ = afs.collection("orders").valueChanges()

    
  }

  getIsLoggedIn(){
    return this.auth.onAuthStateChanged(user => {
      if(user){
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    })
  }

  async registerAuth(email: string, password: string){
    await this.auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
      this.userCredentialsService = userCredentials
    }).catch(error => {
      console.log(error)
    })
  }

  async addToVip(uid: string){
    await this.afs.collection("vip").doc(uid).set({
      bankDetails:{
        accountName: "",
        accountNumber: "",
        bankBranch: "",
        bankName: ""
      },
      vipAddress:{
        vipAddressField: "",
        vipMunicipality: "",
        vipProvince: "",
        vipRegion: ""
      },
      vipUid: uid,
      vipMobileNumber: "",
      vipName: ""
    })
  }

  async loginAuth(email: string, password: string){
    await this.auth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true
      localStorage.setItem('rows', JSON.stringify(res.user))
    })
  }

  logoutAuth(){
    this.auth.signOut()
    localStorage.removeItem('rows');
  }

  addNewOrder(vipId: string, shopId: string){
    let orderId = this.afs.createId()
    this.afs.collection("vips").doc(vipId).collection("shops").doc(shopId).collection("orders").doc(orderId).set({
      orderId: Math.floor(Math.random() * 1000000),
      id: orderId,
      status: "New Parcel"
    }).then(() => {
      alert("New Order Generated")
    })
  }

  insertParcel(vipId: string, shopId: string, documentId: string, customerNameInput: string, awbInput: string, mobileNumberInput: string, regionInput: string, provinceInput: string, municipalityInput: string, addressLineInput: string, barangayInput: string, productDescriptionInput: string, itemValueInput: number, codFeeInput: number, weightInput: number, insuranceFeeInput: number, shipmentFeeInput: string, remarksInput: string, sizeInput: string, shipmentFee: number, volumetricWeight: number, shopRegionInput: string){
    let documentParcelId = this.afs.createId()
    let year: string = new Date().getFullYear().toString()
    let month: string = (new Date().getMonth()+1).toString()
    let day: string = new Date().getDate().toString()
    let date = year + "/" + month + "/" + day

    this.afs.collection("vips").doc(vipId).collection("shops").doc(shopId).collection("orders").doc(documentId).collection("parcels").doc(documentParcelId).set({
      id: documentParcelId,
      customerInformation: {
        customerName: customerNameInput,
        mobileNumber: mobileNumberInput,
      },

      customerAddress: {
        region: regionInput,
        province: provinceInput,
        municipality: municipalityInput,
        addressLine: addressLineInput,
        barangay: barangayInput,
      },

      orderInformation: {
        awb: awbInput,
        dateCreated: date,
        productDescription: productDescriptionInput,
        itemValue: itemValueInput,
        codFee: codFeeInput,
        weight: volumetricWeight,
        insuranceFee: insuranceFeeInput,
        shipmentFee: shipmentFee,
        remarks: remarksInput,
        shipmentType: sizeInput,
      },
       shopRegion: shopRegionInput,
    }).then(() => {
      alert("Parcel added to Orders")
    })
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

  getParcels(vipId: string, shopId: string, parcelId: string){
    return this.afs.collection("vips").doc(vipId).collection("shops").doc(shopId).collection("orders").doc(parcelId).collection("parcels").valueChanges()
  }

  getShops(vipId: string){
    return this.afs.collection("vips").doc(vipId).collection("shops").valueChanges()
  }
  
  getOrders(vipId: string, shopId: string){
    return this.afs.collection("vips").doc(vipId).collection("shops").doc(shopId).collection("orders").valueChanges()
  }

  addImportedFile(importedNames: string[]){
    let newId = this.afs.createId()

    for(let i = 0; i < importedNames.length; i++){
      this.afs.collection("orders").doc(newId).collection("parcels").add({
        customerName: importedNames[i]
      })
    }

    this.afs.collection("orders").doc(newId).set({
      id: newId,
      orderId: Math.floor(Math.random() * 1000000)
    })

    alert("done")
  }
}

export interface Vip{
  id: string,
  vipName: string
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
  orderId: number
}