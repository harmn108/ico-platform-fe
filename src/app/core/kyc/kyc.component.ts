import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BACKEND_URL} from "../../../environments/parameters";
import {RequestOptions} from "@angular/http";

@Component({
  selector: "app-kyc",
  templateUrl: "./kyc.component.html",
  styleUrls: ["./kyc.component.scss"]
})
export class KycComponent implements OnInit {

  kycForm = new FormGroup({
    "fullName": new FormControl("", [Validators.required]),
    "birthDay": new FormControl("", [Validators.required]),
    "address": new FormControl("", [Validators.required]),
    "country": new FormControl("", [Validators.required]),
    "idScan": new FormControl("", [Validators.required]),
    "gender": new FormControl("", [Validators.required]),
    "photo": new FormControl("", [Validators.required]),
    "zip": new FormControl("", [Validators.required]),
  });

  private errorMessages: string;
  private conditionsWarning: string;
  private uploadMaxSize = 2603875;
  private uploadTypes = {
    "photo": ["image/png", "image/jpg", "image/jpeg"],
    "idScan": ["application/pdf"],
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.kycForm.valueChanges.subscribe(() => {

        console.log("valid--- ", this.kycForm.valid, this.kycForm);

        this.errorMessages = "";
        this.conditionsWarning = "";
      },
      err => console.log(err)
    );

  }

  onFileChange($event, controlName: string) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0]; // <--- File Object for future use.
      console.log(file);
      if (file.size > this.uploadMaxSize) {
        console.log("asdasd");
        this.kycForm.controls[controlName].setErrors(["invalid file size"]);
        return;
      }
      if (!this.uploadTypes[controlName].includes(file.type)) {
        console.log("swwww");
        this.kycForm.controls[controlName].setErrors(["invalid file type"]);
        return;
      }
      this.kycForm.controls[controlName].setValue(file); // <-- Set Value for Validation
    }
  }

  submitKyc() {
    const formData: FormData = new FormData();
    // formData.append('uploadFile', file, file.name);
    console.log(this.kycForm.getRawValue());
    // this.http.post(`${BACKEND_URL}/api/v1/user/kyc`, formData,
    //   {headers: new HttpHeaders({"Content-Type": "multipart/form-data"})});
  }

}
