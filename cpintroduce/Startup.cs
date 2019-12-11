using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;
using FgsModel;
using Microsoft.EntityFrameworkCore;
using FgsModel.EntityRespositorys;
using FgsModel.FgsRepositorys;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Cpmongo;

namespace cpintroduce
{
    public class Startup
    {
        string EipConnectionString = string.Empty;
        string CpintrduceConnectionString = string.Empty;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            CpintrduceConnectionString = Configuration.GetConnectionString("CpintrduceConnection");
            EipConnectionString = Configuration.GetConnectionString("EipConnection");
            services.AddDbContext<FgsContext>(options =>
             options.UseSqlServer(CpintrduceConnectionString,
                 b => b.MigrationsAssembly("Cpintrduce")));
            services.AddDbContext<EipContext>(options => options.UseSqlServer(EipConnectionString));
            services.AddMvc();
            services.Configure<MongoDbSettings>(options =>
            {
                options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoConnection:Database").Value;
            });

            services.AddScoped<IMoCpchapterDataRepository, MoCpchapterDataRepository>();
            services.AddScoped<ILinksDataRepository, LinksDataRepository>();
            services.AddScoped<ICpBclassDataRepository, CpBclassDataRepository>();
            services.AddScoped<ICpBookDataRepository, CpBookDataRepository>();
            services.AddScoped<ICpChapterDataRepository, CpChapterDataRepository>();
            services.AddScoped<ICpContentsDataRepository, CpContentsDataRepository>();
            services.AddScoped<ICpIntroduceDataRepository, CpIntroduceDataRepository>();
            services.AddScoped<IMemberDataRepository, MemberDataRepository>();
            services.AddScoped<IVegRootDataRepository, VegRootDataRepository>();
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
              //        .AddCookie();
              .AddCookie(options =>
              {
                  options.AccessDeniedPath = new PathString("/ErrorComponent");
                  options.LoginPath = new PathString("/ErrorComponent");
                  options.ExpireTimeSpan = new TimeSpan(24, 0, 0);
              
              });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules")),
                RequestPath = "/node_modules"
            });
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "cpimages")),
                RequestPath = "/cpimages"
            });
            app.UseAuthentication();
            app.UseCors(
             "MyPolicy"
             );
            //  app.UseMvc();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                     name: "default",
                     template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapSpaFallbackRoute("spa-fallback", new { controller = "home", action = "index" });

            });

        }
    }
}
