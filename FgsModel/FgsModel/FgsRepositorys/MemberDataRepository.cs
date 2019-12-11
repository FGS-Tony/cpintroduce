using FgsModel.EntityRespositorys;
using FgsModel.Entitys;
using System;
using System.Collections.Generic;
using System.Text;

namespace FgsModel.FgsRepositorys
{
   public class MemberDataRepository : EntityBaseRepositor<Member>, IMemberDataRepository
    {
        public MemberDataRepository(FgsContext context) : base(context)
        {
        }
 
    }
}
