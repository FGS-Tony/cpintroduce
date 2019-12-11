using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.EntityRespositorys;
using FgsModel.SecurityEntitys;
namespace FgsModel.SecurityRepositorys
{
   public class UserDataRepository:EntityBaseRepositor<Users>,IUserRepository
    {
        public UserDataRepository(EipContext context) : base(context)
        {
        }
    }
}
