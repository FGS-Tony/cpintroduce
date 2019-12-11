using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
namespace FgsModel.FgsRepositorys
{
   public class CpBclassDataRepository:EntityBaseRepositor<CpBclass>,ICpBclassDataRepository
    {
        public CpBclassDataRepository(FgsContext context) : base(context)
        {
        }
    }
}
