import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
  ) { }

  positionList = [
    "officer",
    "manager"
  ]

  subList = [
    "subA",
    "subB",
    "subC"
  ]

  districtList = [
    "distA",
    "distB",
    "distC"
  ]

  provinceList = ["A","B","C"]

  postList = [1,2,3,4]

  
  educationList: any[] = []
  skillList: any[] = []
  experienceList: any[] = []
  interestList: any[] = []
  guildList: any[] = []

  education = {year: '', place: ''}

  experience = '';
  
  skill = {name: '', level: ''}

  file: string = '';
  cover: string = '';
  payload: any = {
    username:  '',
    nickname: '',
    firstname: '',
    lastname: '',
    position: '',
    nationality: '',
    tel: '',
    date: new Date(),
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    postcode: '',
    facebook: '',
    line: '',
    insta: ''
  }

  ngOnInit(): void {
    this.http.get("http://localhost:3000/profile").subscribe((res:any)=>{
      if(res){
        this.payload = res
        this.educationList = this.payload.educationList
        this.experienceList =  this.payload.experienceList
        this.interestList = this.payload.interestList
        this.guildList = this.payload.guildList
        this.skillList = this.payload.skillList
      }
    })
  }

  onFileChange(event: any) {
    let selectedFile = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('image', selectedFile, 'image.png');
    this.http.post('http://localhost:3000/image',uploadData).subscribe(
      res=>{
        this.resetInput();
        window.location.reload();
      },
      err=>{
        console.log(err);
      }
    );
  }

  onCoverChange(event: any) {
    let selectedFile = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('image', selectedFile, 'cover.png');
    this.http.post('http://localhost:3000/cover',uploadData).subscribe(
      res=>{
        this.resetInput();
        window.location.reload();
      },
      err=>{
        console.log(err);
      }
    );
  }

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
 }

 resetCover(){
  const input = document.getElementById('background-input-file') as HTMLInputElement;
  if(input){
    input.value = "";
  }
}

addEducation(){
  this.educationList.push(this.education)
  this.education = {year: '', place: ''}
}

deleteEdu(index: any){
  this.educationList.splice(index,1)
}

addExperience(){
  this.experienceList.push(this.experience)
  this.experience = ''
}

deleteExp(index: any){
  this.experienceList.splice(index,1)
}

addSkill(){
  this.skillList.push(this.skill)
  this.skill = {name: '', level:''}
}

deleteSkill(index: any){
  this.skillList.splice(index,1)
}

addInterest(){
  this.interestList.push(prompt("Input your interest"))
}


deleteInterest(index: any){
  this.interestList.splice(index,1)
}

addGuild(){
  this.guildList.push(prompt("Input your guild"))
}


deleteGuild(index: any){
  this.guildList.splice(index,1)
}

submit(){
  this.payload.educationList = this.educationList
  this.payload.experienceList =  this.experienceList
  this.payload.interestList = this.interestList
  this.payload.guildList = this.guildList
  this.payload.skillList = this.skillList
  this.http.post("http://localhost:3000/profile", this.payload).subscribe((res:any)=>{
    alert("save success")
  })
  console.log(this.payload);
}
}


