import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

import { LLMService } from './header.service';
import { AVAILABLE_LLM, HEADER_ITEMS } from '@shared/utils/const.utils';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class HeaderComponent {

  selected = LLMService.selected;
  items = HEADER_ITEMS;
  options = AVAILABLE_LLM;
}
