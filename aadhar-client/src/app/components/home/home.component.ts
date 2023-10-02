import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

declare var Tesseract : any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent{

    fileName = '';
    loading = false;
    isError = false;
    imgUrl = "";
    gotData = false;
    uploadSuccess = false;
    entryPresent = false;
    editData = false;

    name = "";
    dob = "";
    dob_Date = new Date();
    gender = "";

    file : any;

    genders = [
        'MALE',
        'FEMALE',
        'TRANSGENDER'
    ]

    constructor(private service: BackendService) {}

    ResetData(){
        this.name = "";
        this.dob = "";
        this.dob_Date = new Date();
        this.gender = "";
        this.fileName = '';
        this.gotData = false;
        this.uploadSuccess = false;
        this.entryPresent = false;
        this.editData = false;
    }

    Cancel(){
        this.ResetData();
    }

    EditData(){
        this.editData = true;
    }

    UploadData(){
        this.loading = true;
        this.dob = this.dob_Date.toISOString().replace('-', '/').split('T')[0].replace('-', '/')
        this.service.InsertData(this.name, this.gender, this.dob, this.file).subscribe((res) => {
            if(res.status == 200){
                this.uploadSuccess = true;
                this.loading = false;
            }
            else if(res.status == 204){
                this.entryPresent = true;
                this.loading = false;
            }
            else{
                alert("Data Fields Missing! Please try again");
                this.Cancel()
            }
        })
    }

    genderSelection(event : any){
        this.gender = event.name;
    }

    onFileSelected(event: any) {
        this.loading = true;
        var img;
        this.file = event.target.files[0];
        this.imgUrl = URL.createObjectURL(this.file)
        console.log(this.imgUrl)
        if (this.file) {
            this.fileName = this.file.name;
            //Tesseract.recognize(file).then(
                //(result : any) => {
                    //this.processText(result.text)
                    //this.loading = false;
                //}
            //)
            this.service.getProcessedData(this.file).subscribe((res : any) => {
                console.log(res)
                if(res.status == 200){
                    this.name = res.body.response.name;
                    this.dob = res.body.response.dob;
                    this.dob_Date = new Date(this.dob);
                    this.gender = res.body.response.gender;

                    this.gotData = true;
                }
                else{
                    this.isError = true;
                }

                this.loading = false;
            }, (err) => {
                console.log('Error : ', err);
                this.loading = false;
            })
        }
    }
}
