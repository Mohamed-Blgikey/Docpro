import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/core/APIS/Doctor';
import { User } from 'src/app/core/APIS/User';
import { post } from 'src/app/core/model/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctorposts',
  templateUrl: './doctorposts.component.html',
  styleUrls: ['./doctorposts.component.scss'],
})
export class DoctorpostsComponent implements OnInit, OnDestroy {
  file: any;
  fileName: string = '';
  fileNameEdit: string = '';
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;
  sub3: Subscription | undefined;
  sub4: Subscription | undefined;
  sub5: Subscription | undefined;
  sub6: Subscription | undefined;
  imgPrefix = environment.PhotoUrl;
  posts: post[] = [];

  DeletePostFrom: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    catpion: new FormControl(null, [Validators.required]),
    photoName: new FormControl(null, [Validators.required]),
    doctorId: new FormControl(null, [Validators.required]),
  });

  AddPostForm: FormGroup = new FormGroup({
    topic: new FormControl(null, [Validators.required]),
    catpion: new FormControl(null, [Validators.required]),
    photoName: new FormControl(null, [Validators.required]),
    doctorId: new FormControl(this.auth.user['_value'].nameid, [
      Validators.required,
    ]),
  });

  constructor(
    private http: HttpService,
    private notify: NotifyService,
    private auth: AuthService,
    private toast:HotToastService
  ) {}

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.stopAddunusablePhoto();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(Doctor.GetDoctorPosts).subscribe((res) => {
      this.posts = res.data;
      // console.log(this.posts);
      // console.log(res.data);
    });

    this.notify.hubConnection.on('Deletepost', () => {
      this.sub2 = this.http.Get(Doctor.GetDoctorPosts).subscribe((res) => {
        this.posts = res.data;
        // console.log(this.posts);
        // console.log(res.data);
      });
    });

    this.notify.hubConnection.on('Addpost', () => {
      this.sub2 = this.http.Get(Doctor.GetDoctorPosts).subscribe((res) => {
        this.posts = res.data;
        // console.log(this.posts);
        // console.log(res.data);
      });
    });
  }

  AddPost() {
    // console.log(this.AddPostForm.value);
    this.sub6 = this.http
      .Post(Doctor.AddPost, this.AddPostForm.value)
      .pipe(
        this.toast.observe({
          success: 'Add post done !',
          loading: 'Adding in...',
          error: ( message:any ) => `There was an error: ${message} `,
        })
        )
      .subscribe((res) => {
        // console.log(res);
        this.fileName = '';
      });
  }

  uploadPhoto(event: any) {
    this.stopAddunusablePhoto();
    this.file = event.target.files[0];
    // console.log(this.file);
    const formData: FormData = new FormData();
    formData.append('uploadedFile', this.file, this.file.name);
    this.sub2 = this.http.Post(User.UplaodPhoto, formData).subscribe((res) => {
      this.fileName = res.message;
      this.AddPostForm.controls['photoName'].setValue(this.fileName);
    });
  }
  DeletedData(post: post) {
    this.DeletePostFrom.controls['id'].setValue(post.id);
    this.DeletePostFrom.controls['topic'].setValue(post.topic);
    this.DeletePostFrom.controls['catpion'].setValue(post.catpion);
    this.DeletePostFrom.controls['photoName'].setValue(post.photoName);
    this.DeletePostFrom.controls['doctorId'].setValue(post.doctorId);
  }
  Delete() {
    this.sub3 = this.http
      .Post(Doctor.DeletePost, this.DeletePostFrom.value)
      .pipe(
        this.toast.observe({
          success: 'Delete post done !',
          loading: 'Deleting in...',
          error: ( message:any ) => `There was an error: ${message} `,
        })
        )
      .subscribe((res) => {
        // console.log(res);
        let photo = {
          userId: this.auth.user['_value'].nameid,
          name: this.DeletePostFrom.controls['photoName'].value,
        };

        this.sub4 = this.http.Post(User.UnSavePhoto, photo).subscribe((res) => {
          // console.log(res);
        });
      });
  }

  private stopAddunusablePhoto() {
    if (this.fileName.length > 0) {
      let photo = {
        userId: this.auth.user['_value'].nameid,
        name: this.fileName,
      };
      this.sub5 = this.http.Post(User.UnSavePhoto, photo).subscribe((res) => {
        // console.log(res);
      });
    }

    // if (this.fileNameEdit.length > 0) {
    //   let photo = {
    //     userId: this.auth.user['_value'].nameid,
    //     name: this.fileNameEdit,
    //   };
    //   this.sub6 = this.http.Post(User.UnSavePhoto, photo).subscribe((res) => {
    //     // console.log(res);
    //   });
    // }
  }
}
