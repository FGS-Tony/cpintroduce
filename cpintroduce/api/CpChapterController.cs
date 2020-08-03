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
using Cpmongo;

namespace cpintroduce.api
{
    [Produces("application/json")]
    [Route("api/CpChapter")]
    public class CpChapterController : Controller
    {
        ICpChapterDataRepository _cpchapterdatarepository;
        //mongo db 專用
        //IMoCpchapterDataRepository _imocpchapterdatarepository;
        FgsContext _fgsdb;
        public CpChapterController(ICpChapterDataRepository cpchapterdatarepository,FgsContext fgsdb
            //mongo db 專用
            /*,IMoCpchapterDataRepository imocpchapterdatarepository*/)
        {
            _cpchapterdatarepository = cpchapterdatarepository;
            _fgsdb = fgsdb;
            //mongo db 專用
            //_imocpchapterdatarepository = imocpchapterdatarepository;
        }
        [HttpGet("getcpchapter/{querystring}", Name = "getcpchapter")]
        public IActionResult GetCpChapter(string querystring)
        {

            IEnumerable<CpChapter> cpchapterdata = _cpchapterdatarepository.FindBy(p => p.cpchapter_name.Contains(querystring) || querystring == "ALL" && p.cpchapter_isvalid == true);
            return new OkObjectResult(cpchapterdata);

        }

        [HttpGet("getcpchapterbyno/{chapterno}", Name = "getcpchapterbyno")]
        public IActionResult GetCpChapterByNo(int chapterno)
        {

            IEnumerable<CpChapter> cpchapterdata = _cpchapterdatarepository.FindBy(p => p.cpchapter_no == chapterno);
            return new OkObjectResult(cpchapterdata);

        }

        [HttpGet("getcpchapterbybook/{cpbookno}", Name = "getcpchapterbybook")]
        public IActionResult GetCpChapterByBook(int cpbookno)
        {

            var cpchapterdata = (from p in _fgsdb.CPChapter
                                where p.cpbook_no == cpbookno
                                &&    p.cpchapter_upper == 0
                                &&    p.cpchapter_isvalid == true
                                select new CpChapterViewModel
                                {
                                    cpchapter_no = p.cpchapter_no,
                                    cpchapter_name = p.cpchapter_name,
                                    cpchapter_upper = p.cpchapter_upper,
                                    cpchapter_level = p.cpchapter_level,
                                    cpchapter_sort = p.cpchapter_sort.HasValue?p.cpchapter_sort.Value:0,
                                    cpchapter_iscontents = p.cpchapter_iscontents,
                                    cpchapter_contents = p.cpchapter_contents,                               
                                    cpbook_no = p.cpbook_no,
                                    cpbook_name = (from c in _fgsdb.CPBook
                                                    where c.cpbook_no == cpbookno
                                                    select new {c.cpbook_name }).ToString(),
                                    type = "C"                              
                                   }).OrderBy(p=>p.cpchapter_sort).ThenBy(p => p.cpchapter_no);
       

            return new OkObjectResult(cpchapterdata);
       
            //(from c in _fgsdb.CPChapter
            // where c.cpchapter_no == p.cpchapter_upper
            // select new { c.cpbook_no }),
        }

        [HttpGet("getcpchapterbychapter/{cpchapterno}", Name = "getcpchapterbychapter")]
        public IActionResult GetCpChapterByChapter(int cpchapterno)
        {
         
            var cpchapterdata = (from p in _fgsdb.CPChapter
                                where p.cpchapter_upper == cpchapterno
                                  && p.cpchapter_isvalid == true
                                 select new CpChapterViewModel
                                {
                                    cpchapter_no = p.cpchapter_no,
                                    cpchapter_name = p.cpchapter_name,
                                    cpchapter_upper = p.cpchapter_upper,
                                    cpchapter_level = p.cpchapter_level,
                                    cpchapter_sort = p.cpchapter_sort.HasValue ? p.cpchapter_sort.Value : 0,
                                    cpchapter_iscontents = p.cpchapter_iscontents,
                                    cpchapter_contents = p.cpchapter_contents,                                   
                                    cpbook_no = p.cpbook_no,
                                    cpbook_name = (from c in _fgsdb.CPBook
                                                   where c.cpbook_no == p.cpbook_no
                                                   select new { c.cpbook_name }).ToString(),
                                    type = "C"
                                }).OrderBy(p => p.cpchapter_sort).ThenBy(p => p.cpchapter_no);
         
            
        
            return new OkObjectResult(cpchapterdata);

        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] CpChapterViewModel cpchapterviewmodel)
        {
            CpChapter cpchapterupper = new CpChapter();
            //mongo db 專用
            //MoCpchapter moCpchapter = new MoCpchapter();
            int ilevel = 0, ibookno = cpchapterviewmodel.cpbook_no;
            if ( cpchapterviewmodel.cpchapter_upper > 0 )
            {
                cpchapterupper = _cpchapterdatarepository.GetSingle(p => p.cpchapter_no ==  cpchapterviewmodel.cpchapter_upper);
                ilevel = (int) cpchapterupper.cpchapter_level + 1;
                ibookno =   cpchapterviewmodel.cpbook_no;
            }
            CpChapter cpchapter = new CpChapter();
            cpchapter.cuser = User.Identity.Name;
            cpchapter.ctime = DateTime.Now;
            cpchapter.cpchapter_level = ilevel;
            cpchapter.cpchapter_upper = cpchapterviewmodel.cpchapter_upper;
            cpchapter.cpchapter_iscontents = cpchapterviewmodel.cpchapter_iscontents;
            cpchapter.cpchapter_sort = cpchapterviewmodel.cpchapter_sort.HasValue?cpchapterviewmodel.cpchapter_sort:0;
            cpchapter.cpbook_no = ibookno;
            cpchapter.cpchapter_name = cpchapterviewmodel.cpchapter_name;
            cpchapter.cpchapter_contents = cpchapterviewmodel.cpchapter_contents;
            if ((bool) cpchapter.cpchapter_iscontents)
            {
                htmlconvert htmlconvert = new htmlconvert();
                cpchapter.cpchapter_contentsnohtml = htmlconvert.ReplaceHtmlTag(cpchapter.cpchapter_contents);
                //mongo db 專用
                //moCpchapter.Cpchapter_Contentsnohtml = cpchapter.cpchapter_contentsnohtml;
            }
            //mongo db 專用
            //moCpchapter.Cuser = User.Identity.Name;
            //moCpchapter.Ctime = DateTime.Now.AddHours(8);
            //moCpchapter.Cpchapter_Level = ilevel;
            //moCpchapter.Cpchapter_Upper = cpchapterviewmodel.cpchapter_upper;
            //moCpchapter.Cpchapter_Iscontents = cpchapterviewmodel.cpchapter_iscontents;
            //moCpchapter.Cpchapter_Sort = cpchapterviewmodel.cpchapter_sort.HasValue ? cpchapterviewmodel.cpchapter_sort : 0;
            //moCpchapter.Cpbook_No = ibookno;
            //moCpchapter.Cpchapter_Name = cpchapterviewmodel.cpchapter_name;
            //moCpchapter.Cpchapter_Contents = cpchapterviewmodel.cpchapter_contents;         



            //moCpchapter.Cpchapter_Isvalid = true;
            cpchapter.cpchapter_isvalid = true;
            _cpchapterdatarepository.Add(cpchapter);
          
            _cpchapterdatarepository.Commit();
            //mongo db 專用
            //moCpchapter.Cpchapter_No = cpchapter.cpchapter_no;
            //_imocpchapterdatarepository.Add("cpchapter", moCpchapter);
            cpchapterviewmodel.cpchapter_no = cpchapter.cpchapter_no;
            return new OkObjectResult(cpchapterviewmodel);

        }
        [HttpPost("update")]
        public IActionResult Update([FromBody] CpChapterViewModel cpchapterviewmodel)
        {
            CpChapter cpchapter = _cpchapterdatarepository.GetSingle(p => p.cpchapter_no == cpchapterviewmodel.cpchapter_no);
            cpchapter.euser = User.Identity.Name;
            cpchapter.etime = DateTime.Now;
         //   cpchapter.cpchapter_level = cpchapterviewmodel.cpchapter_level;
            cpchapter.cpchapter_upper = cpchapterviewmodel.cpchapter_upper;
            cpchapter.cpchapter_iscontents = cpchapterviewmodel.cpchapter_iscontents;        
            cpchapter.cpbook_no = cpchapterviewmodel.cpbook_no;
            cpchapter.cpchapter_name = cpchapterviewmodel.cpchapter_name;
            //cpchapter.cpchapter_isvalid = cpchapterviewmodel.cpchapter_isvalid;
            cpchapter.cpchapter_sort = cpchapterviewmodel.cpchapter_sort.HasValue ? cpchapterviewmodel.cpchapter_sort : 0;
            cpchapter.cpchapter_contents = cpchapterviewmodel.cpchapter_contents;
            if ((bool)cpchapter.cpchapter_iscontents)
            {
                htmlconvert htmlconvert = new htmlconvert();
                cpchapter.cpchapter_contentsnohtml = htmlconvert.ReplaceHtmlTag(cpchapter.cpchapter_contents);

            }

            //mongo db 專用
            //MoCpchapter moCpchapter = new MoCpchapter();
            //moCpchapter = _imocpchapterdatarepository.GetSingle("cpchapter", p => p.Cpchapter_No == cpchapterviewmodel.cpchapter_no);
            //moCpchapter.Cpchapter_No = cpchapterviewmodel.cpchapter_no;
            //moCpchapter.Cuser = User.Identity.Name;
            //moCpchapter.Etime = DateTime.Now.AddHours(8);
            //moCpchapter.Cpchapter_Level = cpchapterviewmodel.cpchapter_level;
            //moCpchapter.Cpchapter_Upper = cpchapterviewmodel.cpchapter_upper;
            //moCpchapter.Cpchapter_Iscontents = cpchapterviewmodel.cpchapter_iscontents;
            //moCpchapter.Cpchapter_Sort = cpchapter.cpchapter_sort;
            //moCpchapter.Cpbook_No = cpchapterviewmodel.cpbook_no;
            //moCpchapter.Cpchapter_Name = cpchapterviewmodel.cpchapter_name;
            //moCpchapter.Cpchapter_Contents = cpchapterviewmodel.cpchapter_contents;
            //moCpchapter.Cpchapter_Contentsnohtml = cpchapter.cpchapter_contentsnohtml;
            //moCpchapter.Cpchapter_Isvalid = true;

            //_imocpchapterdatarepository.Update("cpchapter", moCpchapter, p => p.Cpchapter_No == cpchapterviewmodel.cpchapter_no);
            _cpchapterdatarepository.Update(cpchapter);
            _cpchapterdatarepository.Commit();
            return new OkObjectResult(cpchapterviewmodel);
        }
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] CpChapterViewModel cpchapterviewmodel)
        {
            CpChapter cpchapter = _cpchapterdatarepository.GetSingle(p => p.cpchapter_no == cpchapterviewmodel.cpchapter_no);
            cpchapter.euser = User.Identity.Name;
            cpchapter.etime = DateTime.Now;
            cpchapter.cpchapter_isvalid = false;
            //mongo db 專用
            //MoCpchapter moCpchapter = new MoCpchapter();
            //var moCpchapterData = _imocpchapterdatarepository.GetSingle("cpchapter", p => p.Cpchapter_No == cpchapterviewmodel.cpchapter_no);
            //if (moCpchapterData != null )
            //{
            //    moCpchapter = moCpchapterData;
            //}
            //mongo db 專用
            //moCpchapter.Cpchapter_No = cpchapter.cpchapter_no;
            //moCpchapter.Cuser = User.Identity.Name;
            //moCpchapter.Etime = DateTime.Now.AddHours(8);
            //moCpchapter.Cpchapter_Level = cpchapterviewmodel.cpchapter_level;
            //moCpchapter.Cpchapter_Upper = cpchapterviewmodel.cpchapter_upper;
            //moCpchapter.Cpchapter_Iscontents = cpchapterviewmodel.cpchapter_iscontents;
            //moCpchapter.Cpchapter_Sort = cpchapter.cpchapter_sort;
            //moCpchapter.Cpbook_No = cpchapterviewmodel.cpbook_no;
            //moCpchapter.Cpchapter_Name = cpchapterviewmodel.cpchapter_name;
            //moCpchapter.Cpchapter_Contents = cpchapterviewmodel.cpchapter_contents;
            //moCpchapter.Cpchapter_Contentsnohtml = cpchapter.cpchapter_contentsnohtml;
            //moCpchapter.Cpchapter_Isvalid = false;
            //_imocpchapterdatarepository.Update("cpchapter", moCpchapter, p => p.Cpchapter_No == cpchapter.cpchapter_no);
            _cpchapterdatarepository.Update(cpchapter);
            _cpchapterdatarepository.Commit();
            return new OkObjectResult(cpchapterviewmodel);
        }
        [HttpPost("updatecontents")]
        public IActionResult UpdateContents([FromBody] CpChapterViewModel cpchapterviewmodel)
        {
            CpChapter cpchapter = _cpchapterdatarepository.GetSingle(p => p.cpchapter_no == cpchapterviewmodel.cpchapter_no);
            htmlconvert htmlconvert = new htmlconvert();
            cpchapter.euser = User.Identity.Name;
            cpchapter.etime = DateTime.Now;           
            cpchapter.cpchapter_name = cpchapterviewmodel.cpchapter_name; 
            cpchapter.cpchapter_contents = cpchapterviewmodel.cpchapter_contents;
            cpchapter.cpchapter_sort = cpchapterviewmodel.cpchapter_sort.HasValue? cpchapterviewmodel.cpchapter_sort: 0;          
            cpchapter.cpchapter_contentsnohtml = htmlconvert.ReplaceHtmlTag(cpchapter.cpchapter_contents);
            _cpchapterdatarepository.Update(cpchapter);
            _cpchapterdatarepository.Commit();

            //mongo db 專用
            // MoCpchapter moCpchapter = new MoCpchapter();
            // moCpchapter = _imocpchapterdatarepository.GetSingle("cpchapter", p => p.Cpchapter_No == cpchapterviewmodel.cpchapter_no);
            // moCpchapter.Cuser = User.Identity.Name;
            // moCpchapter.Etime = DateTime.Now.AddHours(8);
            // moCpchapter.Cpchapter_No = cpchapterviewmodel.cpchapter_no;
            // moCpchapter.Cpchapter_Level = cpchapterviewmodel.cpchapter_level;
            // moCpchapter.Cpchapter_Upper = cpchapterviewmodel.cpchapter_upper;
            // moCpchapter.Cpchapter_Iscontents = cpchapterviewmodel.cpchapter_iscontents;
            // moCpchapter.Cpchapter_Sort = cpchapter.cpchapter_sort;
            // moCpchapter.Cpbook_No = cpchapterviewmodel.cpbook_no;
            // moCpchapter.Cpchapter_Name = cpchapterviewmodel.cpchapter_name;
            // moCpchapter.Cpchapter_Contents = cpchapterviewmodel.cpchapter_contents;
            // moCpchapter.Cpchapter_Contentsnohtml = cpchapter.cpchapter_contentsnohtml;
            // moCpchapter.Cpchapter_Isvalid = true;        
            //_imocpchapterdatarepository.Update("cpchapter", moCpchapter, p => p.Cpchapter_No == cpchapterviewmodel.cpchapter_no);
            return new OkObjectResult(cpchapterviewmodel);
        }

        [HttpGet("getmaxcpchaptersort", Name = "getmaxcpchaptersort")]
        public IActionResult getmaxcpchaptersort()
        {

            decimal maxSort = _fgsdb.CPChapter.Max(p => p.cpchapter_sort.HasValue? p.cpchapter_sort.Value:0);
            maxSort = (int)maxSort + 1;
            return new OkObjectResult( new { maxsort = maxSort } );
        }

        //app 專用,利用上層編號取得資料
        [HttpGet("getcpchapterbyupper/{cpupperno}", Name = "getcpchapterbyupper")]
        public IActionResult getcpchapterbyupper(int cpupperno)
        {

            var cpchapterdata = (from p in _fgsdb.CPChapter
                                 where  p.cpchapter_upper == cpupperno                                 
                                   && p.cpchapter_isvalid == true
                                 select new CpChapterViewModel
                                 {
                                     cpchapter_no = p.cpchapter_no,
                                     cpchapter_name = p.cpchapter_name,
                                     cpchapter_upper = p.cpchapter_upper,
                                     cpchapter_level = p.cpchapter_level,
                                     cpchapter_sort = p.cpchapter_sort.HasValue ? p.cpchapter_sort.Value : 0,
                                     cpchapter_iscontents = p.cpchapter_iscontents,                                
                                     cpbook_no = p.cpbook_no,
                                     cpbook_name = (from c in _fgsdb.CPChapter
                                                    where c.cpchapter_no == p.cpchapter_upper
                                                    select new { book_name = c.cpchapter_name }).ToString(),
                                     type = "C"
                                 }).OrderBy(p => p.cpchapter_sort).ThenBy(p => p.cpchapter_no);



            return new OkObjectResult(cpchapterdata);

        }

        [HttpGet("getcpchapterbybookno/{cpbookno}", Name = "getcpchapterbybookno")]
        public IActionResult getcpchapterbybookno(int cpbookno)
        {

            var cpchapterdata = (from p in _fgsdb.CPChapter
                                 where p.cpbook_no == cpbookno
                                   && p.cpchapter_upper == 0
                                   && p.cpchapter_isvalid == true
                                 select new CpChapterViewModel
                                 {
                                     cpchapter_no = p.cpchapter_no,
                                     cpchapter_name = p.cpchapter_name,
                                     cpchapter_upper = p.cpchapter_upper,
                                     cpchapter_level = p.cpchapter_level,
                                     cpchapter_sort = p.cpchapter_sort.HasValue ? p.cpchapter_sort.Value : 0,
                                     cpchapter_iscontents = p.cpchapter_iscontents,
                                     cpbook_no = p.cpbook_no,
                                     cpbook_name = (from c in _fgsdb.CPBook
                                                    where c.cpbook_no == p.cpbook_no
                                                    select new { book_name = c.cpbook_name }).ToString(),
                                     type = "C"
                                 }).OrderBy(p => p.cpchapter_sort).ThenBy(p => p.cpchapter_no);



            return new OkObjectResult(cpchapterdata);

        }

        //app 專用,利用上層編號取得資料
        [HttpGet("getcpcontentsbyno/{cpchapterno}", Name = "getcpcontentsbyno")]
        public IActionResult getcpcontentsbrno(int cpchapterno)
        {
            htmlconvert htmlConvert = new htmlconvert();
            var cpchapterdata = (from p in _fgsdb.CPChapter
                                 where p.cpchapter_no == cpchapterno
                                   && p.cpchapter_isvalid == true
                                 select new CpChapterViewModel
                                 {
                                     cpchapter_no = p.cpchapter_no,
                                     cpchapter_name = p.cpchapter_name,
                                     cpchapter_upper = p.cpchapter_upper,
                                     cpchapter_level = p.cpchapter_level,
                                     cpchapter_sort = p.cpchapter_sort.HasValue ? p.cpchapter_sort.Value : 0,
                                     cpchapter_contents = htmlConvert.replaceHtml(p.cpchapter_contents),
                                     cpchapter_iscontents = p.cpchapter_iscontents,
                                     cpbook_no = p.cpbook_no,
                                     cpbook_name = p.cpchapter_upper == 0 ?
                                                      (from c in _fgsdb.CPBook
                                                       where c.cpbook_no == p.cpbook_no
                                                       select  c.cpbook_name ).FirstOrDefault().ToString():                                                   
                                                      (from c in _fgsdb.CPChapter
                                                        where c.cpchapter_no == p.cpchapter_upper
                                                       select c.cpchapter_name).FirstOrDefault().ToString()

                                 });

            htmlConvert.Dispose();
            return new OkObjectResult(cpchapterdata);

        }

        [HttpGet("getcpchaptername/{id}", Name = "getcpchaptername")]
        public IActionResult getcpchaptername(int id)
        {

            var chaptername = _fgsdb.CPChapter.Where(c => c.cpchapter_no == id).Select(p =>  p.cpchapter_name );

            return new OkObjectResult(chaptername);

        }

    }
}