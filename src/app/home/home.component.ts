import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../service/test.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private hc:TestService,private router:Router){}
  base64:any;
  name:any;
  Lastname:any;
  Email:any;
  number:any;
  State:any;
  Country:any;
  Address1:any;
  Address2:any;
  tags: string[] = [];
  newTag: string = '';
  vs:string="";
  minValue = 18;
  maxValue = 100;
  selectedValue = 50;
  mydata:any;

  onSliderChange(event: any) {
    console.log(this.selectedValue);
    this.selectedValue
  }

  addTag() {
    if (this.newTag.trim() !== '' && !this.tags.includes(this.newTag)) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
      console.log(this.tags)
    }
  }
  tagstring(){
    this.vs=this.tags.join(',');
    console.log(this.vs);
  }
  
  checkMaxLength() {
    const regex = /^[a-zA-Z]{0,20}$/;

    if (!regex.test(this.name)) {
      alert('Input should have less than 5 characters and enter only alphabets');
      this.name = "";
    }
  }
  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
  getdata1(){
    this.hc.xyz(this.name,this.Lastname,this.base64,this.Email,this.number,this.selectedValue,this.State,this.Country,this.Address1,this.Address2,this.tags,this.vs).subscribe((data)=>{this.mydata=data});
    sessionStorage.setItem("username",this.name);
    this.router.navigate(["/profile"]);
    console.log(this.base64)
  }
  save(){
    this.tagstring();
    this.getdata1();
  }
  checkImageSize(event: any) {
    let fileInput = event.target;
    let file = fileInput.files[0];

    if (file) {
      let img = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          let width = img.naturalWidth;
          let height = img.naturalHeight;
          if (width <= 310 && height <= 325) {
            this.onInputchange(event);
          } else {
            alert('Image size is greater than 310x325 pixels.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }
  onInputchange(event:any){
    let targetEvent = event.target;
    let file:File = targetEvent.files[0];
    let fileReader:FileReader = new FileReader();
    
    fileReader.onload = (e) => {
      this.base64 = fileReader.result
    }
    fileReader.readAsDataURL(file)
  }
}
