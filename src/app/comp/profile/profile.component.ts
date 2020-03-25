import {Component, OnInit} from '@angular/core';
import {STEP} from '../../step';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';

interface SkillData {
  name: FormControl;
  level: FormControl;
}

interface Country {
  id: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  step: STEP = STEP.STEP_1;
  submitted1 = false;
  submitted2 = false;

  countryList: Country[] = [];
  countryName = '';

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
    country: ['id', Validators.required],
    age: [0, [Validators.required, Validators.pattern(/^[0-9]+/), Validators.min(0), Validators.max(100)]],
    gender: ['m', Validators.required]
  })

  skills: SkillData[] = [];

  get STEP() {
    return STEP;
  }

  get f() { return this.profileForm.controls; }
  get country() { return this.f.country as FormControl;}

  constructor(private fb: FormBuilder) {
    this.countryList.push({
      id: 'ja',
      name: 'Japan'
    });
    this.countryList.push({
      id: 'id',
      name: 'Indonesia'
    });
    this.countryList.push({
      id: 'us',
      name: 'USA'
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted1 = true;
    if (this.profileForm.valid) {
      const idx = this.countryList.findIndex(c => c.id === this.country.value);
      this.countryName = this.countryList[idx].name;
      this.step = STEP.STEP_2;
    }
  }

  addSkill(): void {
    this.skills.push({
      name: new FormControl('', Validators.required),
      level: new FormControl('', [
        Validators.required, Validators.pattern(/^[0-9]+/), Validators.min(0), Validators.max(100)
      ])
    });
  }

  backToProfile(): void {
    this.step = STEP.STEP_1;
  }

  onSubmitSkill(): void {
    this.submitted2 = true;
    let valid = true;
    for (const sk of this.skills) {
      valid = valid && sk.name.valid && sk.level.valid;
      if (!valid) {
        break;
      }
    }
    if (valid) {
      this.step = STEP.STEP_3;
    }
  }

  backToSkill(): void {
    this.step = STEP.STEP_2;
  }
}
