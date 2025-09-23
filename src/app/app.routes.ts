import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat';
import { YoutubeComponent } from './pages/youtube/youtube';

export const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'youtube', component: YoutubeComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat' }
];
