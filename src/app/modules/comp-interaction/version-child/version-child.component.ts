import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-version-child',
  templateUrl: './version-child.component.html',
  styleUrls: ['./version-child.component.scss'],
})
export class VersionChildComponent implements OnChanges {
  @Input() major: number;
  @Input() minor: number;
  changeLog: string[] = [];

  constructor() {}
  // 通过ngOnChanges()来截听输入属性值的变化
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }

  private _name = '';
  // 通过 setter 截听输入属性值的变化
  @Input()
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }

  get name(): string {
    return this._name;
  }

  // 父组件监听子组件事件
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;
  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }

  // 父子组件通过本地变量互动
  intervalId;
  message = '';
  seconds = 11;

  ngOnInit() {}
  ngOnDestroy() {}

  clearTimer() {
    clearInterval(this.intervalId);
  }

  start() {
    this.countDown();
  }

  stop() {
    this.clearTimer();
    this.message = `Hold at ${this.seconds}s`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off~';
      } else {
        if (this.seconds < 0) {
          this.seconds = 10;
        }
        this.message = `${this.seconds}s left`;
      }
    }, 1000);
  }

  // 父组件调用@ViewChild()
}
