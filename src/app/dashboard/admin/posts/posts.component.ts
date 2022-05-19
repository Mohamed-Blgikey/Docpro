import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/core/APIS/Doctor';
import { Patient } from 'src/app/core/APIS/Patient';
import { User } from 'src/app/core/APIS/User';
import { post } from 'src/app/core/model/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;
  sub3: Subscription | undefined;
  sub4: Subscription | undefined;
  imgPrefix = environment.PhotoUrl;
  posts: post[] = [];

  DeletePostFrom: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    topic: new FormControl(null, [Validators.required]),
    catpion: new FormControl(null, [Validators.required]),
    photoName: new FormControl(null, [Validators.required]),
    doctorId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private notify: NotifyService,
    private toast :HotToastService
  ) {}

  ngOnInit(): void {
    this.sub1 = this.http.Get(Patient.GetPosts)
    .subscribe((res) => {
      this.posts = res.data;
      // console.log(this.posts);
      // console.log(res.data);
    });

    this.notify.hubConnection.on('postAction', () => {
      this.sub2 = this.http.Get(Patient.GetPosts).subscribe((res) => {
        this.posts = res.data;
        // console.log(this.posts);
        // console.log(res.data);
      });
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
}
