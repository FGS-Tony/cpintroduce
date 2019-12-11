using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cpintroduce.api;
using FgsModel;
using cpintroduce.Models;
namespace cpintroduce.Controllers
{
    public class PreviewContentsController : Controller
    {
        FgsContext _fgsdb;
        public PreviewContentsController(FgsContext fgsdb)
        {

            this._fgsdb = fgsdb;
        }
        public IActionResult PreviewContents(int id)
        {
            htmlconvert htmlrepl = new htmlconvert();
            ContentsModel contentsmodel = new ContentsModel();
            var contents = from p in _fgsdb.CPChapter
                       where p.cpchapter_no == id
                       select new { contents = p.cpchapter_contents, cpname = p.cpchapter_name };
            foreach (var item in contents )
            {
                contentsmodel.Contents = item.contents;
                contentsmodel.Contentsnotag = htmlrepl.replaceHtml(item.contents);
                contentsmodel.Name = item.cpname;
            }


            return View(contentsmodel);
        }
    }
}