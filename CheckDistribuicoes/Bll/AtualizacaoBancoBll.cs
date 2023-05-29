using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CheckDistribuicoes.Models;
using System.Data;

namespace CheckDistribuicoes.Bll
{
    public class AtualizacaoBancoBll
    {
        public static List<AtualizacaoBancoDto> GetAtualizacaoBancos()
        {
            List<AtualizacaoBancoDto> Lista = new List<AtualizacaoBancoDto>();
            //DataView dv = AtualizacaoBancoDao.GetAtualizacaoBanco();
            //foreach(DataRowView row in dv)
            //{
            //    Lista.Add(new AtualizacaoBancoDto { Banco = row["Banco"].ToString(), Data = row["Data"].ToString() });
            //}
            return Lista;
        }
    }
}