import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { VersionChildComponent } from '../version-child/version-child.component';

@Component({
  selector: 'app-version-parent',
  templateUrl: './version-parent.component.html',
  styleUrls: ['./version-parent.component.scss'],
})
export class VersionParentComponent implements OnInit, AfterViewInit {
  @ViewChild(VersionChildComponent)
  private timerComponent: VersionChildComponent;

  seconds() {
    return 0;
  }

  ngAfterViewInit() {
    setTimeout(() => (this.seconds = () => this.timerComponent.seconds), 0);
  }
  start() {
    this.timerComponent.start();
  }
  stop() {
    this.timerComponent.stop();
  }

  major = 1;
  minor = 23;
  constructor() {}

  ngOnInit(): void {}
  newMinor() {
    this.minor++;
  }
  newMajor() {
    this.major++;
    this.minor = 0;
  }
  onVoted(agreed: boolean) {
    alert('voted:' + agreed);
  }
}
