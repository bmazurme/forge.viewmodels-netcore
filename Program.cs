using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Autodesk.Forge.DesignAutomation;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace forgeSample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
                //.UseKestrel(options =>
                //{
                //    options.Limits.MaxRequestBodySize = 52428800; //50MB
                //});



    }




    //public class Program
    //{
    //    public static void Main(string[] args)
    //    {
    //        CreateHostBuilder(args).ConfigureAppConfiguration(builder =>
    //        {
    //            builder.AddForgeAlternativeEnvironmentVariables();
    //        }).ConfigureServices((hostContext, services) =>
    //        {
    //            services.AddDesignAutomation(hostContext.Configuration);
    //        }).Build().Run();
    //    }

    //    public static IWebHostBuilder CreateHostBuilder(string[] args) =>
    //        WebHost.CreateDefaultBuilder(args)
    //            .UseStartup<Startup>();
    //}
}
