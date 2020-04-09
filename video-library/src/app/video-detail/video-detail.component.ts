import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Video } from '../video';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoDetailComponent implements OnInit {
  video: Video;

  // tslint:disable-next-line: no-inferrable-types
  editTitle: boolean = false;

  @Input()
  set selectedVideo(video: Video) {
    this.video = video;
    this.videoDetailForm.patchValue({
      title: this.video.title,
      url: this.video.url,
      description: this.video.description,
    });
    this.cd.markForCheck();
  }

  @Output()
  updateVideoEvent: EventEmitter<Video> = new EventEmitter();

  @Output()
  deleteVideoEvent: EventEmitter<Video> = new EventEmitter();

  videoDetailForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    description: new FormControl(null),
  });

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit() {}

  onTitleClick(): void {
    this.editTitle = !this.editTitle;
  }

  updateVideo(video: Video): void {
    const videoToUpdate: Video = {
      _id: this.video._id,
      title: video.title,
      url: video.url,
      description: video.description,
    };
    this.updateVideoEvent.emit(videoToUpdate);
  }

  deleteVideo(): void {
    this.deleteVideoEvent.emit(this.video);
  }
}
