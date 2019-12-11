using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
    public class ListCpChapterDataRepository : EntityBaseRepositor<ListCpChapter>, IListCpChapterDataRepository
    {
        public ListCpChapterDataRepository(FgsContext context) : base(context)
        {
        }
    }
}
