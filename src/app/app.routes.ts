import { Routes } from '@angular/router';
import { ChatPage } from './pages/chat/chat';
import { YoutubePage } from './pages/youtube/youtube';
import { InstallPage } from '@pages/install/install';
import { AboutPage } from '@pages/about/about';
import { WebPage } from '@pages/web/web';
import { localhostGuard } from '@core/guards/localhost-guard';

export const routes: Routes = [
  { path: 'chat', component: ChatPage, canActivate: [localhostGuard] },
  { path: 'youtube', component: YoutubePage, canActivate: [localhostGuard] },
  { path: 'web', component: WebPage, canActivate: [localhostGuard] },
  { path: 'install', component: InstallPage },
  { path: 'about', component: AboutPage },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat' }
];
