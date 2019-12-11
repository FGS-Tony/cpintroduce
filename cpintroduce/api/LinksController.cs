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
    [Route("api/Links")]
    public class LinksController : Controller
    {
        FgsContext _fgscontext;
        ILinksDataRepository _linksDataRepository;
        public LinksController(FgsContext fgsdb, ILinksDataRepository linksDataRepository)
        {
            _fgscontext = fgsdb;
            _linksDataRepository = linksDataRepository;
        }

        [HttpGet("getlinksall/{querystring}", Name = "getlinksall")]
        public IActionResult GetLinksall(string querystring)
        {

            IEnumerable<Links> linksdata = _linksDataRepository.FindBy(p => p.links_isvalid == true & p.links_type == 1).OrderBy(p => p.links_sort).ThenBy(p => p.links_no);
           
            
            return new OkObjectResult(linksdata);

        }


        [HttpGet("getmedialinks/{querystring}", Name = "getmedialinks")]
        public IActionResult GetMediaLinks(string querystring)
        {

            IEnumerable<Links> linksdata = _linksDataRepository.FindBy(p => p.links_isvalid == true & p.links_type == 2).OrderBy(p => p.links_sort).ThenBy(p => p.links_no);


            return new OkObjectResult(linksdata);

        }


        [HttpGet("getLinks", Name = "getLinks")]
        public ActionResult GetLinks()
        {
            var links = _linksDataRepository.FindBy(p=>p.links_isvalid == true).OrderBy(p=>p.links_sort).ThenBy(p=>p.links_no);
            return new OkObjectResult(links);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] LinksViewModel linksviewmodel)
        {
            Links newlinks = new Links();
            newlinks.links_name = linksviewmodel.links_name;
            newlinks.links_url = linksviewmodel.links_url;
            newlinks.links_isvalid = true;
            newlinks.links_isdisplay = linksviewmodel.links_isdisplay;
            newlinks.links_sort = linksviewmodel.links_sort;
            newlinks.cuser = User.Identity.Name;
            newlinks.ctime = DateTime.Now;
            newlinks.links_type = linksviewmodel.links_type;
            _linksDataRepository.Add(newlinks);
            _linksDataRepository.Commit();
            linksviewmodel.links_no = newlinks.links_no;
            return new OkObjectResult(linksviewmodel);
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody] LinksViewModel linksviewmodel)
        {
            Links  updatelinks = _linksDataRepository.GetSingle(p =>  p.links_no == linksviewmodel.links_no);

            updatelinks.links_name = linksviewmodel.links_name;
            updatelinks.links_url = linksviewmodel.links_url;
            updatelinks.links_isvalid = true;
            updatelinks.links_isdisplay = linksviewmodel.links_isdisplay;
            updatelinks.links_sort = linksviewmodel.links_sort;
          
            updatelinks.etime = DateTime.Now;           
            updatelinks.euser = User.Identity.Name;
            _linksDataRepository.Update(updatelinks);
            _linksDataRepository.Commit();

            return new OkObjectResult(linksviewmodel);
        }

        [HttpPost("delete")]
        public IActionResult Delete([FromBody] LinksViewModel linksviewmodel)
        {
         
      
            Links updatelinks = _linksDataRepository.GetSingle(p => p.links_no == linksviewmodel.links_no);
          
            updatelinks.links_isvalid = false;           
            updatelinks.etime = DateTime.Now;
            updatelinks.euser = User.Identity.Name;
            _linksDataRepository.Update(updatelinks);
            _linksDataRepository.Commit();
            return new OkObjectResult(linksviewmodel);
        }

    }
}