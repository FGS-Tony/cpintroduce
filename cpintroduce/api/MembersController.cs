using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpintroduce.ViewModels;
using FgsModel;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/Members")]
    public class MembersController : Controller
    {
        FgsContext _fgscontext;
        IMemberDataRepository _memberDataRepository;
        public MembersController(FgsContext fgsdb, IMemberDataRepository memberDataRepository)
        {
            _fgscontext = fgsdb;
            _memberDataRepository  = memberDataRepository;
        }

        [HttpPost("Login")]

        public IActionResult Login([FromBody] MemberLoginViewModel loginmodel)
        {
            try
            {
                int checkCount = _memberDataRepository.FindBy(p => p.member_email == loginmodel.member_email && p.member_password == loginmodel.member_password).Count();

                if (checkCount > 0)
                {
                    var memberdata = _memberDataRepository.GetSingle(p => p.member_email == loginmodel.member_email && p.member_password == loginmodel.member_password);
                    loginmodel.isLogin = true;
                    loginmodel.member_cname = memberdata.member_cname;
                }
                else
                {
                    loginmodel.isLogin = false;
                }

                return new OkObjectResult(loginmodel);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new OkObjectResult(loginmodel);
            }

        }


        [HttpPost("create")]
        public IActionResult Create([FromBody] Member membermodel)
        {
             
            _memberDataRepository.Add(membermodel);
            _memberDataRepository.Commit();             
            return new OkObjectResult(membermodel);

        }


        [HttpPost("update")]
        public IActionResult Update([FromBody] Member membermodel)
        {
            

            
            _memberDataRepository.Update(membermodel);
            _memberDataRepository.Commit();

            return new OkObjectResult(membermodel);
        }

        [HttpPost("delete")]
        public IActionResult Delete([FromBody]  Member membermodel)
        {


            Member updatemember = _memberDataRepository.GetSingle(p => p.member_no == membermodel.member_no);

            updatemember.member_isvalid = false;          
            _memberDataRepository.Update(updatemember);
            _memberDataRepository.Commit();
            return new OkObjectResult(updatemember);
        }


    }
}