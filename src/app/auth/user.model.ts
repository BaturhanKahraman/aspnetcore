export class User {
  constructor(
    public email:string,
    public id:number,
    public fullName:string,
    private _token:string,
    private _tokenExpirationDate:any
  ) {}

    public get token() : any {
      if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null;
      }
      return this._token;
    }


}
