using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class UserViewModel
    {
        public string user_id { set; get; }
        public string user_no { set; get; }
        public string user_name { set; get; }
        public string pwd { set; get; }
        public ICollection<SysGroupViewModel> groupview { set; get; }
    }
}
