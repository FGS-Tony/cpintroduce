"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var aboutComponent_1 = require("./aboutComponent");
var CpBclass_Component_1 = require("./cpview/CpBclass.Component");
var CpBook_Component_1 = require("./cpview/CpBook.Component");
var CpChapter_Component_1 = require("./cpview/CpChapter.Component");
var cpbooktree_component_1 = require("./cpview/cpbooktree.component");
var cpchaptertree_component_1 = require("./cpview/cpchaptertree.component");
var cpcontents_component_1 = require("./cpview/cpcontents.component");
var CpIntroduce_Component_1 = require("./cpview/CpIntroduce.Component");
var AuthGuard_1 = require("./share/AuthGuard");
var PassCpintroComponent_1 = require("./share/PassCpintroComponent");
var ErrorComponent_1 = require("./share/ErrorComponent");
var home_component_1 = require("./home.component");
var Links_Component_1 = require("./cpview/Links.Component");
var MediaLinks_Component_1 = require("./cpview/MediaLinks.Component");
var VegRoot_Component_1 = require("./cpview/VegRoot.Component");
var VegRootEdit_Component_1 = require("./cpview/VegRootEdit.Component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cpintroduce', component: CpIntroduce_Component_1.CpIntroduceComponent, data: { title: '全集簡介維護', pg: "CPI001" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'links', component: Links_Component_1.LinksComponent, data: { title: 'APP相關連結維護', pg: "CPI005" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'cpbclass', component: CpBclass_Component_1.CpBclassComponent, data: { title: '大類維護', pg: "CPI002" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'cpbook', component: CpBook_Component_1.CpBookComponent, data: { title: '書籍維護', pg: "CPI003" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'cpchapter', component: CpChapter_Component_1.CpChapterComponent, data: { title: '書籍章籍內容維護', pg: "CPI004" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'medialinks', component: MediaLinks_Component_1.MediaLinksComponent, data: { title: '影音弘法連結維護', pg: "CPI006" }, canActivate: [AuthGuard_1.AuthGuard] },
    { path: 'passcpintro/:userid', component: PassCpintroComponent_1.PassCpIntroComponent, data: { title: 'pass', pg: "CPPASS" } },
    { path: 'errorpage', component: ErrorComponent_1.ErrorComponent, data: { title: '錯誤', pgid: "error" } },
    { path: 'home', component: home_component_1.HomeComponent, data: { title: '首頁', pg: "CPIMG001" } },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [PassCpintroComponent_1.PassCpIntroComponent, aboutComponent_1.AboutComponent, CpBclass_Component_1.CpBclassComponent, CpBook_Component_1.CpBookComponent, CpChapter_Component_1.CpChapterComponent,
    cpbooktree_component_1.CpBookTreeComponent, cpchaptertree_component_1.CpChapterTreeComponent, cpcontents_component_1.CpContentsComponent, CpIntroduce_Component_1.CpIntroduceComponent, ErrorComponent_1.ErrorComponent, home_component_1.HomeComponent, Links_Component_1.LinksComponent,
    VegRoot_Component_1.VegRootComponent, VegRootEdit_Component_1.VegRootEditComponent, MediaLinks_Component_1.MediaLinksComponent];
//# sourceMappingURL=app.routing.js.map