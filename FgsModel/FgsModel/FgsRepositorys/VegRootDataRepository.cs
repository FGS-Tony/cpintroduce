using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class VegRootDataRepository : EntityBaseRepositor<VegRoot>, IVegRootDataRepository
    {
        public VegRootDataRepository(FgsContext context) : base(context)
        {
        }
    }
}
