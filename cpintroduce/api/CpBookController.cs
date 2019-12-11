using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using cpintroduce.ViewModels;
using FgsModel;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/CpBook")]
    public class CpBookController : Controller
    {
        ICpBookDataRepository _cpbookdatarepository;
        FgsContext _fgsdb;
        public CpBookController(ICpBookDataRepository cpbookdatarepository,FgsContext fgsdb)
        {
            _cpbookdatarepository  = cpbookdatarepository;
            _fgsdb = fgsdb;
        }
        [HttpGet("getcpbook/{cpbclassno}/{querystring}", Name = "getcpbook")]
        public IActionResult GetCpBook( int cpbclassno , string querystring)
        {

            IEnumerable<CpBook> cpbclassdata = _cpbookdatarepository.FindBy(p => ( p.cpbook_name.Contains(querystring) || querystring == "ALL")
            && p.cpbook_isvalid == true  && ( p.cpbclass_no == cpbclassno || cpbclassno == 0)).OrderBy(p=>p.cpbook_sort).ThenBy(p=>p.cpbook_no);
            return new OkObjectResult(cpbclassdata);

        }

        [HttpGet("getcpbookbybclassa/{cpbclassno}", Name = "getcpbookbybclassa")]
        public IActionResult GetBookByBclassa(int cpbclassno)
        {

            IEnumerable<CpBook> cpbclassdata = _cpbookdatarepository.FindBy(p => p.cpbclass_no == cpbclassno && p.cpbook_isvalid == true).OrderBy(p => p.cpbook_sort).ThenBy(p => p.cpbook_no); ;
            return new OkObjectResult(cpbclassdata);

        }


        [HttpGet("getcpbookbybclass/{cpbclassno}", Name = "getcpbookbybclass")]
        public IActionResult GetBookByBclass(int cpbclassno)
        {

            var cpbclassdata = from p in _fgsdb.CPBook
                               where p.cpbclass_no == cpbclassno
                                  && p.cpbook_isvalid == true
                               select new
                               {
                                   cpbclass_no = p.cpbclass_no,
                                   cpbook_no = p.cpbook_no,
                                   cpbook_name = p.cpbook_name,
                                   cpbook_isvalid = p.cpbook_isvalid,
                                   type = "B"
                               };
                               
            return new OkObjectResult(cpbclassdata);
        }

        [HttpGet("getcpbookname/{id}", Name = "getcpbookname")]
        public IActionResult getcpbookname(int id)
        {

            var bookname = _fgsdb.CPBook.Where(c => c.cpbook_no == id).Select(p => p.cpbook_name);
            return new OkObjectResult(bookname);

        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CpBookViewModel cpbookviewmodel)
        {
            CpBook cpbook = new CpBook();
            cpbook.cuser = User.Identity.Name;
            cpbook.ctime = DateTime.Now;
            cpbook.cpbclass_no = cpbookviewmodel.cpbclass_no;
            cpbook.cpbook_name = cpbookviewmodel.cpbook_name;
            cpbook.cpbook_sort = cpbookviewmodel.cpbook_sort;
            cpbook.cpbook_isdisplay = cpbookviewmodel.cpbook_isdisplay;
            cpbook.cpbook_isvalid = true;
            _cpbookdatarepository.Add(cpbook);
            _cpbookdatarepository.Commit();
            cpbookviewmodel.cpbook_no = cpbook.cpbook_no;
            return new OkObjectResult(cpbookviewmodel);
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody] CpBookViewModel cpbookviewmodel)
        {
            CpBook cpbook = _cpbookdatarepository.GetSingle(p => p.cpbook_no == cpbookviewmodel.cpbook_no);
            cpbook.euser = User.Identity.Name;
            cpbook.etime = DateTime.Now;
            cpbook.cpbook_name = cpbookviewmodel.cpbook_name;
            cpbook.cpbclass_no = cpbookviewmodel.cpbclass_no;
            cpbook.cpbook_sort = cpbookviewmodel.cpbook_sort;
            cpbook.cpbook_isdisplay = cpbookviewmodel.cpbook_isdisplay;
            _cpbookdatarepository.Update(cpbook);
            _cpbookdatarepository.Commit();
            return new OkObjectResult(cpbookviewmodel);
        }
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] CpBookViewModel cpbookviewmodel)
        {
            //CpBook cpbook = _cpbookdatarepository.GetSingle(p => p.cpbook_no == cpbookviewmodel.cpbook_no);
            //_cpbookdatarepository.Delete(cpbook);
            //_cpbookdatarepository.Commit();
            CpBook cpbook = _cpbookdatarepository.GetSingle(p => p.cpbook_no == cpbookviewmodel.cpbook_no);
            cpbook.euser = User.Identity.Name;
            cpbook.etime = DateTime.Now;
            cpbook.cpbook_isvalid = false;
            _cpbookdatarepository.Update(cpbook);
            _cpbookdatarepository.Commit();
            return new OkObjectResult(cpbookviewmodel);
        }

        [HttpGet("getmaxbooksort", Name = "getmaxbooksort")]
        public IActionResult getmaxbooksort()
        {

            decimal maxSort = _fgsdb.CPBook.Max(p => p.cpbook_sort.HasValue ? p.cpbook_sort.Value :0 );
            maxSort = (int)maxSort + 1;
            return new OkObjectResult(new  {maxsort = maxSort });
        }
    }
}