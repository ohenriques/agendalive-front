import { LiveService } from './../../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/lives.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevrious!: Live[];
  livesNext!: Live[];

  constructor(
    public liveServer: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getLives();
  }

  getLives() {
    this.liveServer.getLivesWithFlag('previous').subscribe(
      data => {
        this.livesPrevrious = data.content;
        console.log(this.livesPrevrious);
        this.livesPrevrious.forEach(live => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })

      });
    this.liveServer.getLivesWithFlag('next').subscribe(
      data => {
        this.livesPrevrious = data.content;
        console.log(this.livesNext);
        this.livesNext.forEach(live => {
          live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
        })
      })
  }
}
