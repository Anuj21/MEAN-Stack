import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss'],
  providers: [VideoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoCenterComponent implements OnInit, OnDestroy {
  videos: Video[];

  selectedVideo: Video;

  // tslint:disable-next-line: no-inferrable-types
  newVideo: boolean;

  videoCreationForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    description: new FormControl(null),
  });

  onDestroy$: Subject<void> = new Subject();

  constructor(
    private videoService: VideoService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getVideos();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSelectVideo(video: Video): void {
    this.selectedVideo = video;
    this.newVideo = false;
  }

  getVideos(): void {
    this.videoService
      .getVideos()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        this.videos = res;
        this.cd.markForCheck();
      });
  }

  addVideo(video: Video): void {
    this.videoService
      .addVideo(video)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        this.videos.push(res);
        this.newVideo = false;
        this.selectedVideo = res;
        this.getVideos();
        this.cd.markForCheck();
      });
  }

  createVideo(): void {
    this.newVideo = true;
  }

  onUpdateVideoEvent(video: Video): void {
    this.videoService
      .updateVideo(video)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        const index: number = this.videos.findIndex(
          (videoToDelete) => videoToDelete._id === res._id
        );
        this.videos[index] = res;
        this.getVideos();
        this.cd.markForCheck();
      });

    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: Video): void {
    this.videoService
      .removeVideo(video)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        const index: number = this.videos.findIndex(
          (videoToDelete) => videoToDelete._id === res._id
        );
        this.videos.splice(index, 1);
        this.getVideos();
        this.cd.markForCheck();
      });

    this.selectedVideo = null;
  }
}
