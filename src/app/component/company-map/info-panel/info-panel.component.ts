import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {
  isShow = false;

  @Input() set toggleInfoPanel(value: boolean) {
    this.isShow = value;
  }
  constructor() { }

  ngOnInit(): void {
  }

  handleClosePanel() {
    this.isShow = false;
  }

}
