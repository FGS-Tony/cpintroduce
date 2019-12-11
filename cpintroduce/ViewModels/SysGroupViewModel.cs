using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class SysGroupViewModel
    {

        public string group_no { set; get; }
        public string group_name { set; get; }
        public string group_valid { set; get; }
        public ICollection<UserViewModel> userview { set; get; }
    }
}
