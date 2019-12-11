using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
    public class LinksDataRepository : EntityBaseRepositor<Links>, ILinksDataRepository
    {
        public LinksDataRepository(FgsContext context) : base(context)
        {
        }
    }
}
