export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  uid:string;

  constructor(image:string,name:string,provider:string,uid:string){
    this.image = image;
    this.name = name;
    this.provider = provider; // google.com
    this.uid = uid; // id de firebase
  }
}
