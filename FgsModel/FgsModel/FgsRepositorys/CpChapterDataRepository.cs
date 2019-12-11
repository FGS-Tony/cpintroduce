using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class CpChapterDataRepository : EntityBaseRepositor<CpChapter>, ICpChapterDataRepository
    {
        public CpChapterDataRepository(FgsContext context) : base(context)
        {
        }
   
    }
}
