import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-user-profile-template',
  templateUrl: './user-profile-template.component.html',
  styleUrls: ['./user-profile-template.component.css']
})
export class UserProfileTemplateComponent implements OnInit {
  constructor(private hc:TestService){
    this.userdataget();
    this.name=sessionStorage.getItem("username");
    
  }
  id:any;
  profileurl:any;
  mydata:any;
  mydata2:any;
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
  
  onSliderChange(event: any) {
    this.selectedValue
  }
  addTag() {
    if (this.newTag.trim() !== '' && !this.tags.includes(this.newTag)) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
      this.tagstring();
    }
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
  tagstring(){
    this.vs=this.tags.join(',');
    console.log(this.vs);
  }
  updatedata(){
    this.hc.patch1(this.id,this.name,this.Lastname,this.profileurl,this.Email,this.number,this.selectedValue,this.State,this.Country,this.Address1,this.Address2,this.tags,this.vs)
    .subscribe((data)=>{this.userdataget()});
  }

  userdataget(){
    this.hc.get1(sessionStorage.getItem("username")).subscribe((data)=>{this.mydata=data;
      if (Array.isArray(this.mydata)) {
        let firstValue = this.mydata[0];
        this.mydata2=firstValue;
        this.Lastname=this.mydata2.lastname;
        this.Email=this.mydata2.email;
        this.number=this.mydata2.number;
        this.selectedValue=this.mydata2.age;
        this.tags=this.mydata2.tags;
        this.id=this.mydata2.id;
        this.profileurl=this.mydata2.profileurl;
        this.Address1=this.mydata2.address1;
        this.Address2=this.mydata2.address2;
        this.State=this.mydata2.state;
        this.Country=this.mydata2.country;
        this.vs=this.mydata2.stringtag
     }
    });
  }
  ngOnInit(){
    console.log('ngOnInit called');
    this.userdataget();
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
      this.profileurl = fileReader.result
    }
    fileReader.readAsDataURL(file)
  }
}
