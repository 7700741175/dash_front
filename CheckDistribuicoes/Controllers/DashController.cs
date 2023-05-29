using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CheckDistribuicoes.Bll;

namespace CheckDistribuicoes.Controllers
{
    public class DashController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAmbiente(string Dominio)
        {
            return new JsonResult { Data = AmbientesBll.RetornaAmbiente(Dominio), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        [HttpPost]
        public JsonResult GetDeploys(string Dominio,string NomeAmbiente)
        {
            return new JsonResult { Data = AmbientesBll.RetornaDeploy(NomeAmbiente,Dominio), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult GetAtualizacoesBanco(string Dominio)
        {
            return new JsonResult { Data = AtualizacaoBancoBll.GetAtualizacaoBancos(Dominio), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]

        public JsonResult GetServidores()
        {
            return new JsonResult { Data = AmbientesBll.GetServidores(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult GetEndGrafana()
        {
            return new JsonResult { Data = AmbientesBll.Grafana(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}