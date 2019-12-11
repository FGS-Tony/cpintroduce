using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FgsModel;
using Microsoft.AspNetCore.Hosting;
using FgsModel.EntityRespositorys;
using FgsModel.SecurityRepositorys;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using FgsModel.SecurityEntitys;
using Microsoft.AspNetCore.Authentication;
using cpintroduce.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {

        private IHostingEnvironment _environment;
        private IConfiguration _configuration;
        private FgsContext _fgscontext;
        private EipContext _eipcontext;
        public AccountsController(IHostingEnvironment environment,
            IConfiguration configuration, FgsContext fgscontext, EipContext eipcontext)
        {
            _fgscontext = fgscontext;
            _environment = environment;
            _configuration = configuration;
            _eipcontext = eipcontext;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginuser)
        {

            string pwd = string.Empty;
            string user_no = string.Empty;
            var myuser1 = from p in _eipcontext.users
                          from c in _eipcontext.unit
                          where p.user_id == loginuser.userName
                           && p.pwd == pwd
                           && p.unit_no == c.unit_no
                          select new LoginViewModel
                          {
                              userId = p.user_id,
                              userNo = p.user_no,
                              userName = p.user_name,
                              password = p.pwd,
                              unit_Name = c.unit_cname,
                              unit_No = c.unit_no
                          };
            if (myuser1.Count() == 0)
            {
                loginuser.isLogin = false;
                return new OkObjectResult(loginuser);
            }
            else
            {
                foreach (var useritem in myuser1)
                {
                    //string aaa = Crypto.Crypto.Decrypt(useritem.pwd);
                    user_no = useritem.userNo;
                    loginuser.userNo = user_no;
                    loginuser.userName = useritem.userName;
                }

                loginuser.isLogin = true;
                var claims = new List<Claim>(); 
                claims.Add(new Claim(ClaimTypes.Name, loginuser.userNo));
                //claims.Add(new Claim(ClaimTypes.Role, "Users"));
                var identity = new ClaimsIdentity(claims, "cpintroduce");
                ClaimsPrincipal principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                HttpContext.User = principal;
                return new OkObjectResult(loginuser);
            }
        }

        [Route("Logout")]
        [HttpGet]
        public IActionResult Logout()
        {

            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return new OkObjectResult("logout");



        }

        [Route("CheckLogin")]
        [HttpGet]
        public  IActionResult  CheckLogin()
        {
            if (User.Identity.Name == "E0000000A1" || User.Identity.Name == "E0000000A2")
            {
                LoginViewModel loginstatus = new LoginViewModel();
                loginstatus.isAuthenticated = User.Identity.IsAuthenticated;
                loginstatus.userNo = User.Identity.Name;
                loginstatus.userName = "測試員";
                loginstatus.unit_No = "D60000";
                loginstatus.unit_Name = "單位待確認";
                loginstatus.userId = "TEST";
                return new OkObjectResult(loginstatus);
            }
            else
            {
                var UserInfo = (from p in _eipcontext.users
                                from o in _eipcontext.unit
                                where p.unit_no == o.unit_no
                                  && p.user_no == User.Identity.Name
                                select new
                                {
                                    unit_no = o.unit_no,
                                    unit_name = o.unit_cname,
                                    user_name = p.user_name,
                                    user_id   = p.user_id
                                }).FirstOrDefault();

                if (UserInfo != null)
                {
                    LoginViewModel loginstatus = new LoginViewModel();
                    loginstatus.isAuthenticated = User.Identity.IsAuthenticated;
                    loginstatus.userName = UserInfo.user_name;
                    loginstatus.userNo = User.Identity.Name;
                    loginstatus.unit_No = UserInfo.unit_no;
                    loginstatus.unit_Name = UserInfo.unit_name;
                    loginstatus.userId = UserInfo.user_id;
                    return new OkObjectResult(loginstatus);
                }
                else
                {
                    LoginViewModel loginstatus = new LoginViewModel();
                    loginstatus.isAuthenticated = false;
                    loginstatus.userName = "NULL";
                    loginstatus.userNo = "NULL";
                    loginstatus.unit_No = "NULL";
                    loginstatus.unit_Name = "NULL";
                    return new OkObjectResult(loginstatus);
                }
            }
        }

        [Route("passlogin")]
        [HttpPost]
        public async Task<IActionResult> PassLogin([FromBody] LoginViewModel loginuser )
        {
     //       LoginViewModel loginuser = new LoginViewModel();
      //      loginuser.userId = as_userno;
            var UserInfo = (from p in _eipcontext.users
                            from o in _eipcontext.unit
                            where p.unit_no == o.unit_no
                           && p.user_id == loginuser.userId                          
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
                loginuser.userName = UserInfo.user_name;
                loginuser.userNo = UserInfo.user_no;
                loginuser.unit_No = UserInfo.unit_no;
                loginuser.unit_Name = UserInfo.unit_name;
                loginuser.isAuthenticated = true;
                loginuser.isLogin = true;
                var claims = new List<Claim>(); ;
                claims.Add(new Claim(ClaimTypes.Name, loginuser.userNo));
                claims.Add(new Claim(ClaimTypes.NameIdentifier, loginuser.userNo));
               
                var identity = new ClaimsIdentity(claims, "cpintroduce");
               
                ClaimsPrincipal principal = new ClaimsPrincipal(identity);
                try
                {
               

                 await   HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,  principal);
                    
                    //await HttpContext.Authentication.SignInAsync("cpintroduceSecurityScheme",principal: principal);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return new BadRequestObjectResult(loginuser);
                }
                  HttpContext.User = principal;
             

                return new OkObjectResult(loginuser);
            }
            else
            {

                loginuser.userName = "error";
                loginuser.userNo = "error";
                loginuser.unit_No =  "error";
                loginuser.unit_Name = "error";
                loginuser.isAuthenticated = false;
                loginuser.isLogin = false;
                return new OkObjectResult(loginuser);
            }
        }

        [Route("GetUser")]
        [HttpGet]
        public IActionResult GetUser()
        {


            var Users = from p in _eipcontext.users
                        where p.enabled == true
                        select new
                        {
                            unit_no = p.unit_no,
                            user_no = p.user_no,
                            user_name = p.user_name + "   " + p.user_no

                        };
            return new OkObjectResult(Users);

        }


        [Route("GetUnit")]
        [HttpGet]
        public IActionResult GetUnit()
        {
          //  List<Unit> ListUnit = new List<Unit>();       

                var unit = from p in _eipcontext.unit
                           select new
                           {
                               unit_no = p.unit_no,
                               unit_cname = p.unit_cname == null ? "null":p.unit_cname
                           };
              


            return new OkObjectResult(unit);
        }

        [Route("GetUserGroup")]
        [HttpPost]
        public IActionResult GetUserGroup([FromBody] QueryUser queryuser)
        {
            var ListUserGroup = (from p in _eipcontext.sys_group
                                 where !(from o in _eipcontext.group_mem
                                         where o.user_no == queryuser.user_no
                                         select o.group_no).Any(group_no => group_no == p.group_no)
                                  && p.group_valid == "Y"
                                 select new UserGroupViewModel()
                                 {
                                     id = Guid.NewGuid().ToString(),
                                     user_no = queryuser.user_no,
                                     group_no = p.group_no,
                                     group_name = p.group_name,
                                     group_desc = p.group_desc,
                                     ismember = false
                                 }).Concat
                                 (
                                   from p in _eipcontext.sys_group
                                   where (from o in _eipcontext.group_mem
                                          where o.user_no == queryuser.user_no
                                          select o.group_no).Any(group_no => group_no == p.group_no)
                                    && p.group_valid == "Y"
                                   select new UserGroupViewModel()
                                   {
                                       id = Guid.NewGuid().ToString(),
                                       user_no = queryuser.user_no,
                                       group_no = p.group_no,
                                       group_name = p.group_name,
                                       group_desc = p.group_desc,
                                       ismember = true
                                   }
                                 ).OrderBy(m => m.group_no);

            return new OkObjectResult(ListUserGroup);
        }


        [Route("GetGroupUser")]
        [HttpPost]
        public IActionResult GetGroupUser([FromBody] QueryUser queryuser)
        {
            if (queryuser.user_no == "ERROR")
            {
                return new OkObjectResult("error");
            }
            else
            {
                var ListUserGroup = (from p in _eipcontext.users
                                     where !(from o in _eipcontext.group_mem
                                             where o.group_no == queryuser.user_no
                                             select o.user_no).Any(user_no => user_no == p.user_no)
                                       && p.unit_no == queryuser.unit_no
                                     select new UserGroupViewModel()
                                     {
                                         id = Guid.NewGuid().ToString(),
                                         user_no = p.user_no,
                                         user_name = p.user_name,
                                         unit_no = p.unit_no,
                                         group_no = queryuser.user_no,
                                         ismember = false
                                     }).Concat
                                     (
                                       from p in _eipcontext.users
                                       where (from o in _eipcontext.group_mem
                                              where o.group_no == queryuser.user_no
                                              select o.user_no).Any(user_no => user_no == p.user_no)
                                         && p.unit_no == queryuser.unit_no
                                       select new UserGroupViewModel()
                                       {
                                           id = Guid.NewGuid().ToString(),
                                           user_no = p.user_no,
                                           user_name = p.user_name,
                                           unit_no = p.unit_no,
                                           group_no = queryuser.user_no,
                                           ismember = true
                                       }
                                     ).OrderBy(m => m.unit_no).ThenBy(m => m.user_no);

                return new OkObjectResult(ListUserGroup);
            }
        }

        [Route("UpdateUserGroup")]
        [HttpPut]
        public IActionResult UpadteUserGoup([FromBody] IEnumerable<UserGroupViewModel> usergroup)
        {
            try
            {
                foreach (UserGroupViewModel item in usergroup)
                {

                    Group_Mem GroupMem = _eipcontext.group_mem.SingleOrDefault<Group_Mem>(m => m.user_no == item.user_no && m.group_no == item.group_no);

                    if (GroupMem != null)
                    {
                        if (item.ismember == false)
                        {
                            _eipcontext.group_mem.Remove(GroupMem);
                        }

                    }
                    else
                    {


                        if (item.ismember == true)
                        {
                            try
                            {
                                Group_Mem InsertGroupMem = new Group_Mem();
                                InsertGroupMem.user_no = item.user_no;
                                InsertGroupMem.group_no = item.group_no;
                                _eipcontext.group_mem.Add(InsertGroupMem);
                            }
                            catch (Exception e)
                            {
                                throw e;
                            }
                        }

                    }
                }
                try
                {
                    _eipcontext.SaveChanges();
                }
                catch (Exception e)
                {
                    throw e;
                }
                return new OkResult();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new OkObjectResult(e);
            }
        }

        [Route("GetCheckPgSecurity")]
        [HttpPost]
        public IActionResult GetCheckPgSecurity([FromBody] LoginViewModel loginuser)
        {
            string userno = User.Identity.Name;
            var grp = from o in _eipcontext.group_mem
                      where o.user_no == userno
                      select o.group_no;        
            var usersecurity = from p in _eipcontext.sys_security
                               where ( grp.Contains(p.user_no)
                                       && p.pg_no == loginuser.pgId )
                                 || (p.user_no == userno
                                       && p.pg_no == loginuser.pgId)
                               //loginuser.pgId
                               group p by new { p.pg_no } into g
                               select new
                               {
                                   g.Key.pg_no,
                                   kk = g.Sum(m => m.is_run == "Y" ? 1 : 0)
                               };
            if (usersecurity.Count() > 0)
            {
                foreach (var item in usersecurity)
                {
                    if (item.kk > 0)
                    {
                        loginuser.pgExecurity = true;
                    }
                    else
                    {
                        loginuser.pgExecurity = false;
                    }
                }

            }
            else
            {
                loginuser.pgExecurity = false;
            }


     //       loginuser.userName = userno;
            if (userno == "E0000000A1" || userno == "E0000000A2" || userno == "E0000000A3")
            {
                loginuser.pgExecurity = true;
            }
            return  new OkObjectResult(loginuser);
        }
        [Route("GetPgData")]
        [HttpGet]
        public IActionResult GetPgData()
        {
            var Pgdata = from p in _eipcontext.syspg
                         where p.pg_use == "Y"
                           && p.sys_stypeno == "CPIMG"
                         select new
                         {
                             pg_no = p.pg_no,
                             pg_name = p.pg_name
                         };
            return new OkObjectResult(Pgdata.ToList());
        }

    }
}