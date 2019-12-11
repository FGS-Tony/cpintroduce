using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class CpBookDataRepository : EntityBaseRepositor<CpBook>, ICpBookDataRepository
    {
        public CpBookDataRepository(FgsContext context) : base(context)
        {
        }
    }
}
