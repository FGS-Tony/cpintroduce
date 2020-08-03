using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using cpintroduce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using FgsModel;

namespace cpintroduce.api
{
    //[Authorize]
    [Produces("application/json")]
    [Route("api/CpBclass")]
    public class CpBclassController :  Controller
    {
        ICpBclassDataRepository _cpbclassdatarepository;
        FgsContext _fgsdb;
        public CpBclassController(ICpBclassDataRepository cpbclassdatarepository,FgsContext fgsdb)
        {
            _cpbclassdatarepository = cpbclassdatarepository;
            this._fgsdb = fgsdb;
        }
        [HttpGet("getcpbclass/{querystring}", Name = "getcpbclass")]
        public IActionResult GetCpBclass(string querystring)
        {

            IEnumerable<CpBclass> cpbclassdata = _cpbclassdatarepository.FindBy(p => p.cpbclass_name.Contains(querystring) || querystring == "ALL" && p.cpbclass_isvalid == true)
                                                                         .OrderBy(p=>p.cpbclass_sort).ThenBy(p=>p.cpbclass_no);
            return new OkObjectResult(cpbclassdata);

        }

        [HttpGet("getcpbclassname/{id}", Name = "getcpbclassname")]
        public IActionResult getcpbclassname(int id)
        {

            var bclassname = _fgsdb.CPBclass.Where(c=>c.cpbclass_no == id).Select(p => p.cpbclass_name);
            return new OkObjectResult(bclassname);

        }

        [HttpGet("getcpbclassalldata", Name = "getcpbclassalldata")]
        public IActionResult GetCpBclassAlldata()
        {
            var cpbclassdata = (from p in _fgsdb.CPBclass
                               where p.cpbclass_isvalid == true
                                 && p.cpbclass_isdisplay == true
                               select new
                               {
                                   cpbclass_no = p.cpbclass_no,
                                   cpbclass_name = p.cpbclass_name,
                                   cpbclass_sort = p.cpbclass_sort,
                                   type = "A"
                               }).OrderBy(p => p.cpbclass_sort).ThenBy(p => p.cpbclass_no); ;
                              
           
            return new OkObjectResult(cpbclassdata);

        }
       
        [HttpGet("getcpbclasstreedata", Name = "getcpbclasstreedata")]
        public IActionResult GetCpBclassTreedata()
        {
            var cpbclassdata = (from p in _fgsdb.CPBclass
                                where p.cpbclass_isvalid == true
                                 
                                select new
                                {
                                    cpbclass_no = p.cpbclass_no,
                                    cpbclass_name = p.cpbclass_name,
                                    cpbclass_sort = p.cpbclass_sort,
                                    type = "A"
                                }).OrderBy(p => p.cpbclass_sort).ThenBy(p => p.cpbclass_no); ;


            return new OkObjectResult(cpbclassdata);

        }
        [HttpPost("create")]
        public IActionResult Create([FromBody] CpBclassViewModel cpbclassviewmodel)
        {
            CpBclass cpbclass = new CpBclass();
            cpbclass.cuser = User.Identity.Name;          
            cpbclass.ctime = DateTime.Now;
            cpbclass.cpbclass_name = cpbclassviewmodel.cpbclass_name;
            cpbclass.cpbclass_sort = (cpbclassviewmodel.cpbclass_sort.HasValue)?cpbclassviewmodel.cpbclass_sort:0;
            cpbclass.cpbclass_isdisplay = cpbclassviewmodel.cpbclass_isdisplay;
            cpbclass.cpbclass_isvalid = true;
            _cpbclassdatarepository.Add(cpbclass);
            _cpbclassdatarepository.Commit();
            cpbclassviewmodel.cpbclass_no = cpbclass.cpbclass_no;
            return new OkObjectResult(cpbclassviewmodel);
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody] CpBclassViewModel cpbclassviewmodel)
        {
            CpBclass cpbclass = _cpbclassdatarepository.GetSingle(p => p.cpbclass_no == cpbclassviewmodel.cpbclass_no);
            cpbclass.cpbclass_isdisplay = cpbclassviewmodel.cpbclass_isdisplay;
            cpbclass.cpbclass_sort = (cpbclassviewmodel.cpbclass_sort.HasValue) ? cpbclassviewmodel.cpbclass_sort : 0;
            cpbclass.euser = User.Identity.Name;
            cpbclass.etime = DateTime.Now;
            cpbclass.cpbclass_name = cpbclassviewmodel.cpbclass_name;
            _cpbclassdatarepository.Update(cpbclass);
            _cpbclassdatarepository.Commit();
            return new OkObjectResult(cpbclassviewmodel);
        }
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] CpBclassViewModel cpbclassviewmodel)
        {
            CpBclass cpbclass = _cpbclassdatarepository.GetSingle(p => p.cpbclass_no == cpbclassviewmodel.cpbclass_no);
            cpbclass.cpbclass_isdisplay = cpbclassviewmodel.cpbclass_isdisplay;
            cpbclass.cpbclass_isvalid = false;
            cpbclass.euser = User.Identity.Name;
            cpbclass.etime = DateTime.Now;
            cpbclass.cpbclass_name = cpbclassviewmodel.cpbclass_name;
            _cpbclassdatarepository.Update(cpbclass);
            _cpbclassdatarepository.Commit();
            return new OkObjectResult(cpbclassviewmodel);
           
        }

        [HttpGet("getmaxbclasssort", Name = "getmaxbclasssort")]
        public IActionResult getmaxbclasssort()
        {

            decimal maxSort = _fgsdb.CPBclass.Max(p => p.cpbclass_sort.HasValue ? p.cpbclass_sort.Value:0);
            maxSort = (int)maxSort + 1;
             return new OkObjectResult(new { maxsort = maxSort });
        }
    }
}