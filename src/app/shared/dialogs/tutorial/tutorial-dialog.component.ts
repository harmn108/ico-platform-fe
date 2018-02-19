import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-tutorial-dialog',
    templateUrl: 'tutorial-dialog.component.html',
    styleUrls: ['tutorial-dialog.component.scss']
})
export class TutorialDialogComponent implements OnInit {

    allowClose = true;

    constructor(public dialogRef: MatDialogRef<TutorialDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onNoClick(): any {
    }

    closeDialog() {
        if (this.allowClose) {
            this.dialogRef.close();
        }
    }
}
