import {AbstractControl, FormControl} from "@angular/forms";

export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      "email": `Email type is not correct`,
      "required": "Required field",
      "invalidEmailAddress": "validation.invalidEmailAddress",
      "currentPassword": "validation.currentPassword",
      "primary": "validation.primary",
      // 'addEmail':'validation.addEmail',
      "invalidConfirmPassword": "Confirm password does not match",
      "invalidPassword": `Password must be at least 8 characters long, contain UPPERCASE letter, a lowercase
                            letter and number or symbol`,
      "maxlength": "You have exceeded the maximum allowed number of characters",
      "invalidFileSize": "File is too big",
      "invalidFileType": "File type is invalid"
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {"email": true};
    }
  }

  static passwordValidator(control) {
    if (control.value && control.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
      return null;
    } else {
      return {"invalidPassword": true};
    }
  }

  static passwordsEqualValidator(c: FormControl) {
    if (c.value && c.value.password.length > 0 &&
      (c.value.confirmPassword.length > 0 &&
        c.value.password !== c.value.confirmPassword)) {
      return {"invalidConfirmPassword": true};
    } else {
      return null;
    }
  }

  static fileSizeValidator(limit: number) {
    return (c: FormControl) => {
      if (c.value.size > limit) { // check for size
        return {"invalidFileSize": true};
      } else {
        return null;
      }
    };
  }

  static fileTypeValidator(types: Array<string>) {
    return (c: FormControl) => {
      if (!types.includes(c.value.type)) { // check for type
        return {"invalidFileType": true};
      } else {
        return null;
      }
    };
  }
}
