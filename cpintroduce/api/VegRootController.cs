using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FgsModel;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using Microsoft.AspNetCore.Mvc;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/VegRoot")]
    public class VegRootController : Controller
    {
       
        
            FgsContext _fgscontext;
            IVegRootDataRepository _vegrootDataRepository;
            public VegRootController(FgsContext fgsdb, IVegRootDataRepository vegrootDataRepository)
            {
                _fgscontext = fgsdb;
                _vegrootDataRepository = vegrootDataRepository;
            }

            [HttpGet("getVegRoot/{queryname}", Name = "getVegRoot")]
            public ActionResult GetVegRoot(string queryname)
            {
               var vegrootData = _vegrootDataRepository.FindBy(p => p.vegroot_isvalid && ( p.vegroot_content.Contains(queryname) || queryname == "ALL"));
                return new OkObjectResult(vegrootData);
            }

            [HttpPost("create")]
            public IActionResult Create([FromBody] VegRoot vegrootmodel)
            {
               
                vegrootmodel.vegroot_isvalid = true;
                vegrootmodel.cuser = User.Identity.Name;
                vegrootmodel.ctime = DateTime.Now;
                _vegrootDataRepository.Add(vegrootmodel);
                _vegrootDataRepository.Commit();
                
                return new OkObjectResult(vegrootmodel);
            }
            [HttpPost("update")]
            public IActionResult Update([FromBody] VegRoot vegrootmodel)
            {


                vegrootmodel.etime = DateTime.Now;
                vegrootmodel.euser = User.Identity.Name;
                _vegrootDataRepository.Update(vegrootmodel);
                _vegrootDataRepository.Commit();

                return new OkObjectResult(vegrootmodel);
            }

            [HttpPost("delete")]
            public IActionResult Delete([FromBody] VegRoot vegrootmodel)
            {


                 vegrootmodel.vegroot_isvalid = false;
                 vegrootmodel.etime = DateTime.Now;
                 vegrootmodel.euser = User.Identity.Name;
               _vegrootDataRepository.Update(vegrootmodel);
            _vegrootDataRepository.Commit();
                return new OkObjectResult(vegrootmodel);
            }

        }
  
}