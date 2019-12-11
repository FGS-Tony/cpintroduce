using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class MemberLoginViewModel
    {
      public string  member_email { set; get; }
      public string  member_password { set; get; }
      public string member_cname { set; get; }

      public Nullable<Boolean> isLogin { set; get; }
    }
}
