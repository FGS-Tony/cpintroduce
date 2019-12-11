using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using cpintroduce.ViewModels;
namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/CpContents")]
    public class CpContentsController : Controller
    {
        ICpContentsDataRepository _cpcpcontentsdatarepository;

        public CpContentsController(ICpContentsDataRepository cpcpcontentsdatarepository)
        {
            _cpcpcontentsdatarepository = cpcpcontentsdatarepository;
        }
        [HttpGet("getcpcontents/{querystring}", Name = "getcpcontents")]
        public IActionResult GetCpContents(string querystring)
        {

            IEnumerable<CpContents> cpcontentsdata = _cpcpcontentsdatarepository.FindBy(p => p.cpcontents_contents.Contains(querystring) || querystring == "ALL");
            return new OkObjectResult(cpcontentsdata);

        }

        [HttpGet("getcpcontentsbychapter/{cpchapterno}", Name = "getcpcontentsbychapter")]
        public IActionResult GetCpContentsByChapter(int cpchapterno)
        {

             CpContents  cpcontentsdata = _cpcpcontentsdatarepository.GetSingle(p => p.cpchapter_no == cpchapterno);
            return new OkObjectResult(cpcontentsdata);

        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CpContentsViewModel cpcontentsviewmodel)
        {
            CpContents cpcontents = new CpContents();
            cpcontents.cuser= User.Identity.Name;
            cpcontents.ctime = DateTime.Now;
            cpcontents.cpcontents_contents = cpcontentsviewmodel.cpcontents_contents;
            cpcontents.cpchapter_no = cpcontentsviewmodel.cpchapter_no;             
            _cpcpcontentsdatarepository.Add(cpcontents);
            _cpcpcontentsdatarepository.Commit();
            cpcontentsviewmodel.cpcontents_no = cpcontents.cpcontents_no;
            return new OkObjectResult(cpcontentsviewmodel);
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody] CpContentsViewModel cpcontentsviewmodel)
        {
            CpContents cpcontents  = _cpcpcontentsdatarepository.GetSingle(p => p.cpcontents_no == cpcontentsviewmodel.cpcontents_no);
            cpcontents.euser = User.Identity.Name;
            cpcontents.etime = DateTime.Now;
            cpcontents.cpcontents_contents = cpcontentsviewmodel.cpcontents_contents;       
            _cpcpcontentsdatarepository.Update(cpcontents);
            _cpcpcontentsdatarepository.Commit();
            return new OkObjectResult(cpcontentsviewmodel);
        }
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] CpContentsViewModel cpcontentsviewmodel)
        {
            CpContents cpcontents = _cpcpcontentsdatarepository.GetSingle(p => p.cpcontents_no == cpcontentsviewmodel.cpcontents_no);
            _cpcpcontentsdatarepository.Delete(cpcontents);
            _cpcpcontentsdatarepository.Commit();
            return new OkResult();
        }
    }
}