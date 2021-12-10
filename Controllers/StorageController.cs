using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace forgeSample.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly IWebHostEnvironment _appEnvironment;

        public StorageController(IWebHostEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            string[] paths = { _appEnvironment.WebRootPath, "downloads" };
            string rootPath = Path.Combine(paths);

            string[] allfolders = Directory.GetDirectories(rootPath);


            return allfolders;// new string[] { "value1", "value2" };
        }

        // service => chrone delete
    }
}
