using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace cpintroduce.Controllers
{
    public class CppagesController : Controller
    {
        public IActionResult cpbclasscomponent() => PartialView();
        public IActionResult cpbookcomponent() => PartialView();

        public IActionResult cpbooktreecomponent() => PartialView();

        public IActionResult cpchaptercomponent() => PartialView();

        public IActionResult cpchaptertreecomponent() => PartialView();

        public IActionResult cpcontentscomponent() => PartialView();

        public IActionResult cpintroducecomponent() => PartialView();

        public IActionResult linkscomponent() => PartialView();

        public IActionResult medialinkscomponent() => PartialView();

        public IActionResult vegrootcomponent() => PartialView();

        public IActionResult vegrooteditcomponent() => PartialView();
        public IActionResult vergrootedit()=> PartialView();
    }
}