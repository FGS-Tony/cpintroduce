using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class BookSubMenuDataRepository : EntityBaseRepositor<BookSubMenu>, IBookSubMenuDataRepository
    {
        public BookSubMenuDataRepository(FgsContext context) : base(context)
        {
        }
    }
}