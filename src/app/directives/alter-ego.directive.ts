import { Directive, Injectable, forwardRef } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { HeroService } from '../services/hero.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueAlterEgoValidator implements AsyncValidator {
  constructor(private heroService: HeroService) {}
  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.heroService.isAlterEgoTaken(ctrl.value).pipe(
      map((isTaken) => (isTaken ? { uniqueAlterEgo: true } : null)),
      catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appAlterEgo]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueAlterEgoValidator),
      multi: true,
    },
  ],
})
export class AlterEgoDirective {
  constructor(private validator: UniqueAlterEgoValidator) {}
  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
