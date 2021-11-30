using Autodesk.Forge;
using Autodesk.Forge.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using RestSharp;
using System;
using Microsoft.AspNetCore.Hosting;

namespace forgeSample.Controllers
{
    [ApiController]
    public class ModelDerivativeController : ControllerBase
    {
        private readonly IWebHostEnvironment _appEnvironment;

        public ModelDerivativeController(IWebHostEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }


        /// <summary>
        /// Start the translation job for a give bucketKey/objectName
        /// </summary>
        /// <param name="objModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/forge/modelderivative/jobs")]
        public async Task<dynamic> TranslateObject([FromBody] TranslateObjectModel objModel)
        {
            dynamic oauth = await OAuthController.GetInternalAsync();

            // prepare the payload
            List<JobPayloadItem> outputs = new List<JobPayloadItem>()
            {
            new JobPayloadItem(
                JobPayloadItem.TypeEnum.Svf,
                new List<JobPayloadItem.ViewsEnum>()
                {
                JobPayloadItem.ViewsEnum._2d,
                JobPayloadItem.ViewsEnum._3d
                })
            };
            JobPayload job;
            job = new JobPayload(new JobPayloadInput(objModel.objectName), new JobPayloadOutput(outputs));

            // start the translation
            DerivativesApi derivative = new DerivativesApi();
            derivative.Configuration.AccessToken = oauth.access_token;
            dynamic jobPosted = await derivative.TranslateAsync(job);
            return jobPosted;
        }


        [HttpPost]
        [Route("api/forge/modelderivative/jobs/download")]
        public async void DownloadObject([FromBody] TranslateObjectModel objModel)
        {
            // get the access token
            //TwoLeggedApi oAuth = new TwoLeggedApi();
            dynamic oauth = await OAuthController.GetInternalAsync();
            string AccessToken = oauth.access_token;

            //Bearer token = (await oAuth.AuthenticateAsync(
            //  GetAppSetting("FORGE_CLIENT_ID"),
            //  GetAppSetting("FORGE_CLIENT_SECRET"),
            //      oAuthConstants.CLIENT_CREDENTIALS,
            //      new Scope[] { Scope.BucketRead, Scope.BucketCreate, Scope.DataRead, Scope.DataWrite })).ToObject<Bearer>();
            //        string AccessToken = token.AccessToken;

            string urn = objModel.objectName;
            var folderPath = _appEnvironment.WebRootPath;

            //if (!string.IsNullOrEmpty(urn) && !string.IsNullOrEmpty(AccessToken))
            //{
            List<Derivatives.Resource> resourcesToDownload = await Derivatives.ExtractSVFAsync(urn, AccessToken);
            IRestClient client = new RestClient("https://developer.api.autodesk.com/");

            foreach (Derivatives.Resource resource in resourcesToDownload)
            {
                // prepare the GET to download the file
                RestRequest request = new RestRequest(resource.RemotePath, Method.GET);
                request.AddHeader("Authorization", "Bearer " + AccessToken);
                request.AddHeader("Accept-Encoding", "gzip, deflate");
                IRestResponse response = await client.ExecuteTaskAsync(request);

                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    // something went wrong with this file...
                    // MessageBox.Show(string.Format("Error downloading {0}: {1}",
                    //  resource.FileName, response.StatusCode.ToString()));

                    // any other action?
                }
                else
                {
                    string pathToSave = Path.Combine(folderPath, resource.LocalPath);
                    Directory.CreateDirectory(Path.GetDirectoryName(pathToSave));
                    System.IO.File.WriteAllBytes(pathToSave, response.RawBytes);
                }
            }
            //}
        }


        [HttpDelete]
        [Route("api/forge/modelderivative/jobs/delete")]
        public async void DeleteObject([FromBody] TranslateObjectModel objModel)
        {
            ObjectsApi objects = new();
            //dynamic token = await OAuthController.GetInternalAsync();
            dynamic oauth = await OAuthController.GetInternalAsync();
            string accessToken = oauth.access_token;
            objects.Configuration.AccessToken = accessToken;
            await objects.DeleteObjectAsync(objModel.bucketKey, objModel.objectName);
        }

        //[HttpDelete]
        //[Route("api/forge/modelderivative/jobs/deletebucket")]
        //public async void DeleteBucket([FromBody] TranslateObjectModel objModel)
        //{
        //    dynamic oauth = await OAuthController.GetInternalAsync();
        //    BucketsApi buckets = new();
        //    string accessToken = oauth.access_token;
        //    buckets.Configuration.AccessToken = accessToken;
        //    buckets.DeleteBucket(objModel.bucketKey);
        //}









        /// <summary>
        /// Reads appsettings from web.config
        /// </summary>
        public static string GetAppSetting(string settingKey)
        {
            return Environment.GetEnvironmentVariable(settingKey).Trim();
        }

        /// <summary>
        /// Model for TranslateObject method
        /// </summary>
        public class TranslateObjectModel
        {
            public string bucketKey { get; set; }
            public string objectName { get; set; }
            //public string objectText { get; set; }
        }
    }
}