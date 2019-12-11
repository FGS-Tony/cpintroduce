import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './share/AuthGuard';
import { HttpClientModule } from '@angular/common/http';
import { routing, routedComponents } from './app.routing';
import { AppComponent } from './app.component';
import { appService } from "./app.service"; 
import { AppSet } from "./provider/appset";
//import '@progress/kendo-ui'; 
import { load, IntlModule } from '@progress/kendo-angular-intl';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import { Ng2Summernote1 } from './directive/ng2-summernote1';
import { PrimengModule, KendouiModule } from './kendoui.module';
import { ConfirmationService } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { EscapeHtmlPipe } from './directive/keep-html.pipe';
import { PassCpIntroComponent } from './share/PassCpintroComponent';
import { ErrorComponent } from './share/ErrorComponent';

load(
    require("cldr-data/supplemental/likelySubtags.json"),
    require("cldr-data/supplemental/currencyData.json"),
    require("cldr-data/supplemental/weekData.json"),
    require("cldr-data/main/zh/numbers.json"),
    require("cldr-data/main/zh/currencies.json"),
    require("cldr-data/main/zh/dateFields.json"),
    require("cldr-data/main/zh/ca-gregorian.json"),
    require("cldr-data/main/zh/timeZoneNames.json")
);
@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, [...PrimengModule], [...KendouiModule],
        IntlModule, FormsModule, HttpModule, ReactiveFormsModule, routing  ],
    declarations: [AppComponent, EscapeHtmlPipe, Ng2Summernote1, [...routedComponents], PassCpIntroComponent, ErrorComponent],
    providers: [AppSet, AuthGuard, DatePipe, [...appService], { provide: LOCALE_ID, useValue: "zh" }, ConfirmationService, MessageService],
    bootstrap: [AppComponent],  
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
