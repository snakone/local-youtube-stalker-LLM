import { Component } from '@angular/core';

import { MarkdownPipe } from '@shared/pipes/markdown.pipe';
import { ABOUT_MARKDOWN } from '@shared/utils/markdown';

@Component({
  selector: 'app-about',
  imports: [MarkdownPipe],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})

export class AboutPage {
  md = ABOUT_MARKDOWN;
}
