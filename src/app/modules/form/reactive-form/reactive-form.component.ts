import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../../directives/forbidden-name.directive';
import { identityRevealedValidator } from '../../../directives/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../directives/alter-ego.directive';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  providers: [QuestionService],
})
export class ReactiveFormComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

  heroForm: FormGroup;
  favoriteColorControl = new FormControl('');

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ngOnInit(): void {
    this.heroForm = new FormGroup(
      {
        name: new FormControl(this.hero.name, [
          Validators.required,
          Validators.minLength(4),
          forbiddenNameValidator(/bob/i),
        ]),
        alterEgo: new FormControl(this.hero.alterEgo, {
          asyncValidators: [
            this.alterEgoValidator.validate.bind(this.alterEgoValidator),
          ],
          updateOn: 'blur',
        }),
        power: new FormControl(this.hero.power, Validators.required),
      },
      { validators: identityRevealedValidator }
    ); // <-- add custom validator at the FormGroup level
  }

  get name() {
    return this.heroForm.get('name');
  }

  get power() {
    return this.heroForm.get('power');
  }

  get alterEgo() {
    return this.heroForm.get('alterEgo');
  }

  constructor(
    private alterEgoValidator: UniqueAlterEgoValidator,
    private qs: QuestionService
  ) {
    this.questions$ = qs.getQuestions();
  }
}
