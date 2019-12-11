using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FgsModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace cpintroduce.Pages
{
    public class IndexModel : PageModel
    {
        EipContext _eipdb;
        public IndexModel(EipContext eipdb)
        {

            this._eipdb = eipdb;
        }
        public string  message { set; get; }
        public string userid { set; get; }
        public async Task<IActionResult>  OnGet()
        {
           
            message = "NO";
            userid = "TEST";
            var UserInfo = (from p in _eipdb.users
                            from o in _eipdb.unit
                            where p.unit_no == o.unit_no
                           && p.user_id == userid
                            select new
                            {
                                user_no = p.user_no,
                                unit_no = o.unit_no,
                                unit_name = o.unit_cname,
                                user_name = p.user_name
                            }).FirstOrDefault();

            if (UserInfo != null)
            {
                //this.HttpContext.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                //this.HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "POST, GET");
                //loginuser.userName = UserInfo.user_name;
                //loginuser.userNo = UserInfo.user_no;
                //loginuser.unit_No = UserInfo.unit_no;
                //loginuser.unit_Name = UserInfo.unit_name;
                //loginuser.isAuthenticated = true;
                //loginuser.isLogin = true;
                var claims = new List<Claim>(); ;
                claims.Add(new Claim(ClaimTypes.Name, UserInfo.user_no));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, UserInfo.user_no));

                var identity = new ClaimsIdentity(claims, "cpintroduce");

                ClaimsPrincipal principal = new ClaimsPrincipal(identity);
                try
                {

                    message = "OK";
                   await  HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                    //await HttpContext.Authentication.SignInAsync("cpintroduceSecurityScheme",principal: principal);
                }
                catch (Exception ex)
                {
                    message = "NO";
                    await HttpContext.SignOutAsync();
                    Console.WriteLine(ex);
                    return new BadRequestObjectResult(UserInfo);
                }
                HttpContext.User = principal;

                return  Page();
            }
            else
            {
                message = "NO";
                await HttpContext.SignOutAsync();
                
            }
            return Page();
        }
    }
}
