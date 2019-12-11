using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace cpintroduce.api
{
    [Route("api/[controller]")]
    public  class ImageController : Controller
    {
        private IConfiguration _configuration;
        public ImageController(IConfiguration configuration)
        {
           
            _configuration = configuration;
            
             
        }
        [Route("UploadImage")]
        [HttpPost]
        public async Task< IActionResult> uploadImageTest(IFormFile file)
        {
            string _imghost = _configuration.GetSection("appset").GetSection("imghost").Value;
            string saction = Request.Form["action"];
            string simage = Request.Form["image"];
            //string sfolder = Request.Form["folder"]; 
            string sfolder = "cpimages";
            string newFielName = file.FileName;
            string physicalPath = Path.Combine(sfolder, newFielName);
            if (System.IO.File.Exists(Path.Combine(sfolder, newFielName)))
            {
                System.IO.File.Delete(Path.Combine(sfolder, newFielName));
            }
            using (var fileStream = new FileStream(physicalPath, FileMode.Create))
            {

              await  file.CopyToAsync(fileStream);

            }
            string fileName =  _imghost + "/" + sfolder + "/" + newFielName;
            return new OkObjectResult(new { fileName = fileName });
        }
    }
}
