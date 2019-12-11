import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './aboutComponent';
import { CpBclassComponent } from './cpview/CpBclass.Component';
import { CpBookComponent } from './cpview/CpBook.Component';
import { CpChapterComponent } from './cpview/CpChapter.Component';
import { CpBookTreeComponent } from './cpview/cpbooktree.component';
import { CpChapterTreeComponent } from './cpview/cpchaptertree.component';
import { CpContentsComponent } from './cpview/cpcontents.component';
import { CpIntroduceComponent } from './cpview/CpIntroduce.Component';
import { AuthGuard } from './share/AuthGuard';
import { PassCpIntroComponent } from './share/PassCpintroComponent';
import { ErrorComponent } from './share/ErrorComponent';
import { HomeComponent } from './home.component';
import { LinksComponent } from './cpview/Links.Component';
import { MediaLinksComponent } from './cpview/MediaLinks.Component';
import { VegRootComponent } from './cpview/VegRoot.Component';
import { VegRootEditComponent } from './cpview/VegRootEdit.Component';
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cpintroduce', component: CpIntroduceComponent ,data: { title: '全集簡介維護', pg: "CPI001" }, canActivate: [AuthGuard] },
    { path: 'links', component: LinksComponent , data: { title: 'APP相關連結維護', pg: "CPI005" }, canActivate: [AuthGuard] },
    { path: 'cpbclass', component: CpBclassComponent, data: { title: '大類維護', pg: "CPI002" }, canActivate: [AuthGuard] },
    { path: 'cpbook', component: CpBookComponent, data: { title: '書籍維護', pg: "CPI003" }, canActivate: [AuthGuard] },
    { path: 'cpchapter', component: CpChapterComponent, data: { title: '書籍章籍內容維護', pg: "CPI004" }, canActivate: [AuthGuard] },
    { path: 'medialinks', component: MediaLinksComponent, data: { title: '影音弘法連結維護', pg: "CPI006" }, canActivate: [AuthGuard] },
    { path: 'passcpintro/:userid', component: PassCpIntroComponent, data: { title: 'pass', pg: "CPPASS" } },
    { path: 'errorpage', component: ErrorComponent, data: { title: '錯誤', pgid: "error" } },
    { path: 'home', component: HomeComponent, data: { title: '首頁', pg: "CPIMG001" } }   ,
    { path: '**', redirectTo: '' }
    
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [PassCpIntroComponent, AboutComponent, CpBclassComponent, CpBookComponent, CpChapterComponent,
    CpBookTreeComponent, CpChapterTreeComponent, CpContentsComponent, CpIntroduceComponent, ErrorComponent, HomeComponent, LinksComponent,
    VegRootComponent, VegRootEditComponent, MediaLinksComponent]
