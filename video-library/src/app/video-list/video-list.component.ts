import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent implements OnInit {
  videos: Video[];

  @Input()
  set videosList(videos: Video[]) {
    this.videos = videos;
    this.cd.markForCheck();
  }

  @Output()
  readonly selectVideo: EventEmitter<Video> = new EventEmitter<Video>();

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit() {}

  onSelect(video: Video) {
    this.selectVideo.emit(video);
    this.cd.markForCheck();
  }
}
