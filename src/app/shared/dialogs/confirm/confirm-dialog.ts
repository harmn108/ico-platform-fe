import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    termCondForm: FormGroup;
    warningMessage = false;
    showTaC = false;
    showForm = true;
    allowClose = false;
    buttonStyle = ['disabled'];

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        console.log(this.data);
        if (this.data) {
            this.showTaC = this.data.showTaC;
            this.showForm = this.data.showForm;
            this.allowClose = this.data.allowClose;
        }

        this.buildForm();
        this.termCondForm.valueChanges.subscribe(data => {
            this.warningMessage = false;
            if (this.termCondForm.valid) {
                this.buttonStyle = ['enabled'];
            } else {
                this.buttonStyle = ['disabled'];
            }
        });
    }

    buildForm(): void {
        this.termCondForm = this.formBuilder.group({
            'tac': new FormControl(false, [Validators.required])
        });
    }

    onNoClick(): any {
        if (this.termCondForm.invalid) {
            return this.warningMessage = true;
        }

        this.dialogRef.close(this.termCondForm.value);
    }

    toggleTac(event: any): void {
        this.showTaC = !this.showTaC;
    }

    closeDialog() {
        if (this.allowClose) {
            this.dialogRef.close();
        }
    }
}
