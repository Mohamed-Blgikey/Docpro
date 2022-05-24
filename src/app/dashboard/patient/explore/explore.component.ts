import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/core/APIS/Patient';
import { post } from 'src/app/core/model/post';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;
  sub3: Subscription | undefined;
  sub4: Subscription | undefined;
  imgPrefix = environment.PhotoUrl;
  posts: post[] = [];

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private notify: NotifyService,
    private toast :HotToastService
  ) {}
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
  }

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


}
