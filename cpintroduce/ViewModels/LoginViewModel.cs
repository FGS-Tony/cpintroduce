using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{ 
    public class LoginViewModel
    {
        public string userId { set; get; }
        public string userName { get; set; }
        public string userNo { set; get; }
        public string password { get; set; }
        public Boolean isLogin { set; get; }
        public string pgId { set; get; }
        public Boolean pgExecurity { set; get; }
        public string pgName { set; get; }

        public string unit_Name { set; get; }
        public string unit_No { set; get; }

        public  Boolean  isAuthenticated { set; get; }  
    }
}
