import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {ValidationService} from "../../core/validator/validator.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: "app-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.scss"]
})
export class KycComponent implements OnInit {

  kycForm: FormGroup;
  loading = false;
  private errorMessages: string;
  private conditionsWarning: string;
  private uploadMaxSize = 2603875;
  maxDate = new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate());
  private uploadTypes = {
    "photo": ["image/png", "image/jpg", "image/jpeg"],
    "idScan": ["application/pdf", "image/jpg", "image/jpeg"],
  };

  constructor(private http: HttpClient, private datepipe: DatePipe, private userService: UserService) {
  }

  ngOnInit() {
    this.buildForm();
    this.kycForm.valueChanges.subscribe(() => {


        this.errorMessages = "";
        this.conditionsWarning = "";
      },
      err => console.log(err)
    );

  }

  onFileChange($event, controlName: string) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];


      this.kycForm.get(controlName).setValue(file); // set Value in form
      this.kycForm.controls[controlName].markAsDirty();
    }
  }

  submitKyc() {
    this.loading = true;
    const formData: FormData = new FormData();
    formData.append("kyc[fullName]", this.kycForm.get("fullName").value);
    formData.append("kyc[birthday]", this.datepipe.transform(this.kycForm.get("birthday").value, "yyyy-MM-dd"));
    formData.append("kyc[address]", this.kycForm.get("address").value);
    formData.append("kyc[country]", this.kycForm.get("country").value);
    formData.append("kyc[idScan]", this.kycForm.get("idScan").value);
    formData.append("kyc[gender]", this.kycForm.get("gender").value);
    formData.append("kyc[photo]", this.kycForm.get("photo").value);
    formData.append("kyc[zip]", this.kycForm.get("zip").value);

    this.userService.submitKyc(formData).subscribe(
      () => {
        this.loading = false;
        this.userService.goToWallet();
      },
      error => console.log(error.message));
  }

  buildForm() {
    this.kycForm = new FormGroup({
      "fullName": new FormControl("", [Validators.required]),
      "birthday": new FormControl("", [Validators.required]),
      "address": new FormControl("", [Validators.required]),
      "country": new FormControl("", [Validators.required]),
      "gender": new FormControl("", [Validators.required]),
      "zip": new FormControl("", [Validators.required]),
      "idScan": new FormControl("", [
        Validators.required,
        ValidationService.fileSizeValidator(this.uploadMaxSize),
        ValidationService.fileTypeValidator(this.uploadTypes.idScan),
      ]),
      "photo": new FormControl("", [
        Validators.required,
        ValidationService.fileSizeValidator(this.uploadMaxSize),
        ValidationService.fileTypeValidator(this.uploadTypes.photo),
      ]),
    });
  }

}
