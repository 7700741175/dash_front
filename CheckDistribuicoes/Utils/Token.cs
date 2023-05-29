using CheckDistribuicoes.Models;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace CheckDistribuicoes.Utils
{
    public class Token
    {
        public static string Get(string Dominio)
        {

            var ClientR = new RestClient(Dominio);
            var request = new RestRequest("api/auth", Method.Get);
            RestResponse response = ClientR.Get(request);
            TokenDto Token = new TokenDto();
            Token = JsonConvert.DeserializeObject<TokenDto>(response.Content);
            return Token.Token;
        }
    }
}