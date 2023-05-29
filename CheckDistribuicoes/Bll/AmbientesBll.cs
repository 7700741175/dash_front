using CheckDistribuicoes.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Web;
using CheckDistribuicoes.Utils;
using RestSharp;
using System.Configuration;


namespace CheckDistribuicoes.Bll
{
    public class AmbientesBll
    {
        public static List<ServidoresDto> GetServidores()
        {
            try
            {
                List<ServidoresDto> Lista = new List<ServidoresDto>();
                string virtualPath = "~/Ambientes.json";
                string physicalPath = HttpContext.Current.Server.MapPath(virtualPath);
               
                using (StreamReader reader = new StreamReader(physicalPath))
                {
                    string json = reader.ReadToEnd();
                    Lista = JsonConvert.DeserializeObject<List<ServidoresDto>>(json);
                }
                
                return Lista;
            }
            catch { return null; }
        }
        public static List<ListaAmbientesDto> RetornaAmbiente(string Dominio)
        {
            var url = Dominio + "/api/auth";
            List<ListaAmbientesDto> Lista = new List<ListaAmbientesDto>();
            string NroToken = Token.Get(Dominio);
            
            var Client = new RestClient(Dominio);
            var request = new RestRequest("api/Ambiente",Method.Get);
            request.AddHeader("Authorization", "Bearer " + NroToken);
            RestResponse response = Client.Get(request);
            Lista = JsonConvert.DeserializeObject<List<ListaAmbientesDto>>(response.Content);
            return Lista;


        }

        public static List<DeployDto> RetornaDeploy(string NomeAmbiente,string Dominio) {
            //pega token
            string NroToken = Token.Get(Dominio);

            //pega lista de deploys
            List<DeployDto> ListaDep = new List<DeployDto>();

            var Client = new RestClient(Dominio);
            var request = new RestRequest("api/Deploy", Method.Get);
            request.AddHeader("Authorization", "Bearer " + NroToken);
            request.AddParameter("NomeAmbiente", NomeAmbiente);
            RestResponse response = Client.Get(request);
            ListaDep = JsonConvert.DeserializeObject<List<DeployDto>>(response.Content);

            return ListaDep;

        }
        public static string Grafana()
        {
            try
            {
                return ConfigurationManager.AppSettings["EnderecoGrafana"].ToString(); 
               
            }
            catch
            {
                return "";
            }
        }

    }

}



