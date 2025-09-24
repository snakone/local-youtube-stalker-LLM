import { Component } from '@angular/core';

import { MarkdownPipe } from '@shared/pipes/markdown.pipe';
import { INSTALL_MARKDOWN } from '@shared/utils/markdown';

@Component({
  selector: 'app-install',
  imports: [MarkdownPipe],
  templateUrl: './install.html',
  styleUrl: './install.scss'
})

export class InstallPage {

  md = INSTALL_MARKDOWN;

}
