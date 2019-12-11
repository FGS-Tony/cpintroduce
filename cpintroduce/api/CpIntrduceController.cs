using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cpintroduce.ViewModels;
using FgsModel;
using FgsModel.Entitys;
using FgsModel.EntityRespositorys;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/CpIntroduce")]
    public class CpIntrduceController : Controller
    {
        ICpIntroduceDataRepository _cpIntrductDataRepository;
        ILinksDataRepository _linksDataRepository;
        FgsContext _fgsdb;
        public CpIntrduceController(ICpIntroduceDataRepository cpIntrductDataRepository, ILinksDataRepository linksDataRepository, FgsContext fgsdb)
        {
            _cpIntrductDataRepository = cpIntrductDataRepository;
            this._fgsdb = fgsdb;
            _linksDataRepository = linksDataRepository;
        }
        [HttpGet("getcpintroduce", Name = "getcpintroduce")]
        public IActionResult GetCpIntroduce()
        {
            int icount = 0;
            var cpintroducedata = _cpIntrductDataRepository.GetAll().FirstOrDefault();
            if (cpintroducedata != null )
            {
                icount = 1;
            }
            return new OkObjectResult(new {cpintroducedata = cpintroducedata ,isdata = icount});

        }

        [HttpGet("getcpintroducecontent", Name = "getcpintroducecontent")]
        public IActionResult GetCpIntroducecontent()
        {
            htmlconvert htmlConvert = new htmlconvert();
            var cpintroducedata = _fgsdb.CPIntroduce.Select(p => new
            {
                cpintro_preface = htmlConvert.replaceHtml(p.cpintro_preface),
                cpintro_intro = htmlConvert.replaceHtml(p.cpintro_intro),
                cpintro_master = htmlConvert.replaceHtml(p.cpintro_master),
                cpintro_masterroad = htmlConvert.replaceHtml(p.cpintro_masterroad)
            });
            htmlConvert.Dispose();
            return new OkObjectResult(cpintroducedata);

        }
    

        [HttpPost("create")]
        public IActionResult Create([FromBody] CpintrdouceViewModel cpintroduceviewmodel)
        {
            CpIntroduce cpintroduce = new CpIntroduce();
            cpintroduce.cpintro_intro = cpintroduceviewmodel.cpintro_intro;
            cpintroduce.cpintro_master = cpintroduceviewmodel.cpintro_master;
            cpintroduce.cpintro_preface = cpintroduceviewmodel.cpintro_preface;
            cpintroduce.cpintro_masterroad = cpintroduceviewmodel.cpintro_masterroad;
            cpintroduce.ctime = DateTime.Now;
            cpintroduce.cuser = User.Identity.Name;
            _cpIntrductDataRepository.Add(cpintroduce);
            _cpIntrductDataRepository.Commit();
            cpintroduceviewmodel.cpintro_no =  cpintroduce.cpintro_no;
            return new OkObjectResult(cpintroduceviewmodel);
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody]  CpintrdouceViewModel cpintroduceviewmodel)
        {
            CpIntroduce cpintroduce = _cpIntrductDataRepository.GetSingle(p => p.cpintro_no == cpintroduceviewmodel.cpintro_no);
            cpintroduce.cpintro_intro = cpintroduceviewmodel.cpintro_intro;
            cpintroduce.cpintro_master = cpintroduceviewmodel.cpintro_master;
            cpintroduce.cpintro_preface = cpintroduceviewmodel.cpintro_preface;
            cpintroduce.cpintro_masterroad = cpintroduceviewmodel.cpintro_masterroad;
            cpintroduce.etime = DateTime.Now;
            cpintroduce.euser = User.Identity.Name;
            _cpIntrductDataRepository.Update(cpintroduce);
            _cpIntrductDataRepository.Commit();
            return new OkObjectResult(cpintroduceviewmodel);
        }

       

       
        
    }
}