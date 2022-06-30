import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/core/APIS/Admin';
import { Patient } from 'src/app/core/APIS/Patient';
import { User } from 'src/app/core/APIS/User';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, OnDestroy {

  file: any;
  publicId:string = '';
  fileName: string  = '';
  fileNameEdit: string = '';
  publicIdEdit: string = '';

  sub: Subscription | undefined;
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;
  sub3: Subscription | undefined;
  sub4: Subscription | undefined;
  sub5: Subscription | undefined;
  sub6: Subscription | undefined;
  sub7: Subscription | undefined;
  sub8: Subscription | undefined;
  sub9: Subscription | undefined;

  AddSectionForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    photoName: new FormControl('', [Validators.required]),
    publicId:new FormControl('',[Validators.required])
  });

  DeleteAndEditSectionForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    photoName: new FormControl('', [Validators.required]),
    publicId:new FormControl('',[Validators.required])
  });
  sections: any;

  constructor(
    private http: HttpService,
    private notify: NotifyService,
    private toast: HotToastService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.sub = this.http.Get(Patient.GetSections).subscribe((res) => {
      // console.log(res.data) ;
      this.sections = res.data;
    });

    this.notify.hubConnection.on('AddSection', () => {
      this.sub1 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });
    });


    // this.http.Get(`${Admin.GetSection}/2`).subscribe(res=>{
    //   console.log(res.data);
    // })
  }

  uploadPhoto(event: any) {
    this.stopAddunusablePhoto();
    this.file = event.target.files[0];
    // console.log(this.file);
    const formData: FormData = new FormData();
    formData.append('File', this.file, this.file.name);
     this.sub2 = this.http.Post(User.UplaodPhoto, formData).subscribe((res) => {
      // console.log(res);

      this.fileName = res.message;
      this.publicId = res.publicId;
       this.AddSectionForm.controls['photoName'].setValue(this.fileName);
       this.AddSectionForm.controls['publicId'].setValue(this.publicId);
       this.DeleteAndEditSectionForm.controls['photoName'].setValue(
         this.fileName
       );
       this.DeleteAndEditSectionForm.controls['publicId'].setValue(
        this.publicId
      );
      //  console.log(this.AddSectionForm.value);
    });
  }

  AddSection() {
    this.sub3 = this.http
      .Post(Admin.AddSection, this.AddSectionForm.value)
      .pipe(
        this.toast.observe({
          success: 'Section Added !',
          loading: 'Adding in...',
          error: (message: any) => `There was an error: ${message} `,
        })
      )
      .subscribe((res) => {
        // console.log(res);
        // this.AddSectionForm.reset();
        this.fileName = '';
        this.publicId = '';
      });
  }

  AccessData(section: any) {
    // console.log(section);
    this.DeleteAndEditSectionForm.controls['id'].setValue(section.id);
    this.DeleteAndEditSectionForm.controls['photoName'].setValue(
      section.photoName
    );
    this.DeleteAndEditSectionForm.controls['name'].setValue(section.name);
    this.DeleteAndEditSectionForm.controls['publicId'].setValue(section.publicId);
    // console.log(this.DeleteAndEditSectionForm.value);
  }

  AccessDataEdit(section: any) {
    // console.log(section);
    this.DeleteAndEditSectionForm.controls['id'].setValue(section.id);
    this.DeleteAndEditSectionForm.controls['photoName'].setValue(
      section.photoName
    );
    this.DeleteAndEditSectionForm.controls['name'].setValue(section.name);
    this.DeleteAndEditSectionForm.controls['publicId'].setValue(section.publicId);
    this.fileNameEdit = section.photoName;
    this.publicIdEdit = section.publicId;
    // console.log(this.DeleteAndEditSectionForm.value);
  }

  EDitSection() {
    this.sub4 = this.http
      .Put(Admin.EditSection, this.DeleteAndEditSectionForm.value)
      .pipe(
        this.toast.observe({
          success: 'Section Edited !',
          loading: 'Editing in...',
          error: (message: any) => `There was an error: ${message} `,
        })
      )
      .subscribe((res) => {

        if (this.publicIdEdit?.length > 0) {

          this.http.Post(`${User.UnSavePhoto}/${this.publicIdEdit}`).subscribe((res) => {
            // console.log(res);
          });
          this.fileName = '';
          this.publicId = '';
          this.publicIdEdit = '';
          this.fileNameEdit = '';
        }
      });
  }

  DeleteSection() {
    this.sub5 = this.http
      .Post(
        `${Admin.RemoveAllDoctorsFromSection}${this.DeleteAndEditSectionForm.controls['id'].value}`
      )
      .subscribe((res) => {
        this.sub6 = this.http
          .Post(Admin.DeleteSection, this.DeleteAndEditSectionForm.value)
          .pipe(
            this.toast.observe({
              success: 'Section Deleted !',
              loading: 'Deleting in...',
              error: (message: any) => `There was an error: ${message} `,
            })
          )
          .subscribe((res) => {
            // debugger;
            let pp:string = this.DeleteAndEditSectionForm.controls['publicId'].value ;
            if (pp.length >0 ) {

              this.sub7 = this.http
                .Post(`${User.UnSavePhoto}/${pp}`)
                .subscribe((res) => {
                  // console.log(res);
                });
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.stopAddunusablePhoto();
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.sub7?.unsubscribe();
    this.sub8?.unsubscribe();
    this.sub9?.unsubscribe();
  }

  private stopAddunusablePhoto() {
    if (this.publicId?.length > 0) {

      this.sub7 = this.http.Post(`${User.UnSavePhoto}/${this.publicId}`).subscribe((res) => {
        // console.log(res);
      });
    }

    if (this.publicIdEdit?.length > 0) {

      this.sub9 = this.http.Post(`${User.UnSavePhoto}/${this.publicIdEdit}`).subscribe((res) => {
        // console.log(res);
      });
    }
  }
}
