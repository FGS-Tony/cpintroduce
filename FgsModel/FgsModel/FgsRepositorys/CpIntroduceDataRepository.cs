using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class CpIntroduceDataRepository : EntityBaseRepositor<CpIntroduce>, ICpIntroduceDataRepository
    {
        public CpIntroduceDataRepository(FgsContext context) : base(context)
        {
        }
     
    }
}
