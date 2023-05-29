using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CheckDistribuicoes.Models;
using System.Data;
using Newtonsoft.Json;
using RestSharp;
using CheckDistribuicoes.Utils;

namespace CheckDistribuicoes.Bll
{
    public class AtualizacaoBancoBll
    {
        public static List<AtualizacaoBancoDto> GetAtualizacaoBancos(string Dominio)
        {
            //pega token
            string NroToken = Token.Get(Dominio);

            List<AtualizacaoBancoDto> Lista = new List<AtualizacaoBancoDto>();

            var Client = new RestClient(Dominio);
            var request = new RestRequest("api/AtualizacaoBanco", Method.Get);
            request.AddHeader("Authorization", "Bearer " + NroToken);
            RestResponse response = Client.Get(request);
            Lista= JsonConvert.DeserializeObject<List<AtualizacaoBancoDto>>(response.Content);

            //DataView dv = AtualizacaoBancoDao.GetAtualizacaoBanco();
            //foreach(DataRowView row in dv)
            //{
            //    Lista.Add(new AtualizacaoBancoDto { Banco = row["Banco"].ToString(), Data = row["Data"].ToString() });
            //}
            return Lista;
        }
    }
}