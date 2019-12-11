using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
    public class CpContentsDataRepository : EntityBaseRepositor<CpContents>, ICpContentsDataRepository
    {
        public CpContentsDataRepository(FgsContext context) : base(context)
        {
        }
 
    }
}
