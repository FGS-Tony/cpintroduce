using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cpintroduce.Models;

namespace cpintroduce.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
           
            return View();
        }
        public IActionResult HomeComponent() => PartialView();
        public IActionResult AppComponent() => PartialView();
        public IActionResult ErrorComponent() => PartialView();
    }
}
