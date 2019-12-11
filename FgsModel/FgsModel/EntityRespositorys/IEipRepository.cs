using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.SecurityEntitys;
namespace FgsModel.EntityRespositorys
{
    public interface IUserRepository : IEntityBaseRespository<Users> { };
    public interface IUnitRepository : IEntityBaseRespository<Unit> { };
}
