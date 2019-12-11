using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class CpBookViewModel
    {
           
        public int cpbclass_no { get; set; }
     
        public int cpbook_no { get; set; }

        public decimal? cpbook_sort { set; get; }
        public string cpbook_name { get; set; }

        public Boolean cpbook_isvalid { set; get; }
        public Nullable<Boolean> cpbook_isdisplay { get; set; }
        public Nullable<DateTime> etime { set; get; }

    
        public string euser { set; get; }

 
        public Nullable<DateTime> ctime { set; get; }

     
        public string cuser { set; get; }
    }
}
