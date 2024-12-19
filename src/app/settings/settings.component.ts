import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'mc-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(){

  }
}
