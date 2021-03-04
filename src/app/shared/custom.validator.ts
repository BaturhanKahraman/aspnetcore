import { AbstractControl } from "@angular/forms";

export class CustomValidator{
  static validateEmailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      if (email == '' || email.toLocaleLowerCase().endsWith(domainName)) {
        return null;
      } else {
        return { emailDomain: true };
      }
    };
  }
}
