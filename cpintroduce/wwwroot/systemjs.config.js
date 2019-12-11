/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            'ts': 'https://unpkg.com/plugin-typescript@5.3.3/lib/plugin.js',
            'typescript': 'https://unpkg.com/typescript@2.3.4/lib/typescript.js',
            'systemjs-plugin-json': 'npm:systemjs-plugin-json',            
            // angular bundles
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'tslib': 'npm:tslib/tslib.js',
             // Kendo UI for Angular scopes
            '@progress': 'npm:@progress',
            '@telerik': 'npm:@telerik'  ,
             'primeng': 'npm:primeng' ,
             'angular2-uuid': 'npm:angular2-uuid',
             'cldr-data': "npm:cldr-data",
            'angular2-busy': 'npm:angular2-busy' ,
        //    'summernote': 'npm:summernote',
            "ng2-summernote": "npm:ng2-summernote"
        }, 
        meta: {
            '*.json': {
                loader: 'systemjs-plugin-json'
            }
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            'app': {           
                main: 'main.js',
                defaultExtension: 'js'
            },
            'angular2-busy': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },           
            'systemjs-plugin-json': {
                defaultExtension: 'js',
                main: 'json.js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'primeng': {               
                'defaultExtension': 'js'
            },
            'angular2-uuid': {
                main: './index.js',
                defaultExtension: 'js'
            },
            '@progress/kendo-angular-buttons': {
              'main': './dist/cdn/js/kendo-angular-buttons.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-l10n': {
              'main': './dist/cdn/js/kendo-angular-l10n.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-charts': {
              'main': './dist/cdn/js/kendo-angular-charts.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-inputs': {
              'main': './dist/cdn/js/kendo-angular-inputs.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-intl': {
              'main': './dist/cdn/js/kendo-angular-intl.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-data-query': {
               main : './dist/cdn/js/kendo-data-query.js',
               defaultExtension : 'js'
            },
          '@progress/kendo-drawing': {
              'main': './dist/cdn/js/kendo-drawing.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-file-saver': {
              'main': './dist/npm/main.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-dateinputs': {
              'main': './dist/cdn/js/kendo-angular-dateinputs.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-dialog': {
              'main': './dist/cdn/js/kendo-angular-dialog.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-dropdowns': {
              'main': './dist/cdn/js/kendo-angular-dropdowns.js',
              'defaultExtension': 'js'
            },
            '@progress/kendo-angular-grid': {
               main: './dist/cdn/js/kendo-angular-grid.js',             
               defaultExtension: 'js'
            },
          '@progress/kendo-angular-popup': {
              'main': './dist/cdn/js/kendo-angular-popup.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-label': {
              'main': './dist/cdn/js/kendo-angular-label.js',
              'defaultExtension': 'js'
            },
            '@progress/kendo-angular-layout': {
              'main': './dist/cdn/js/kendo-angular-layout.js',
              'defaultExtension': 'js'
            },
            '@progress/kendo-angular-treeview': {
                'main': './dist/cdn/js/kendo-angular-treeview.js',
                'defaultExtension': 'js'
            },
          '@progress/kendo-angular-ripple': {
              'main': './dist/cdn/js/kendo-angular-ripple.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-scrollview': {
              'main': './dist/cdn/js/kendo-angular-scrollview.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-sortable': {
              'main': './dist/cdn/js/kendo-angular-sortable.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-upload': {
              'main': './dist/cdn/js/kendo-angular-upload.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-date-math': {
              'main': './dist/cdn/js/kendo-date-math.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-excel-export': {
              'main': './dist/cdn/js/kendo-angular-excel-export.js',
              'defaultExtension': 'js'
            },
          '@progress/kendo-angular-pdf-export': {
              'main': './dist/cdn/js/kendo-angular-pdf-export.js',
              'defaultExtension': 'js'
            },       
           'ng2-summernote': {
                'main': './ng2-summernote.js',
                'defaultExtension': 'js'
            }
        }
      });
})(this);