using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class CpBclassViewModel
    {
        public int cpbclass_no { set; get; }
        public string cpbclass_name { set; get; }
        public Nullable<bool> cpbclass_isdisplay { get; set; }
        public decimal? cpbclass_sort { set; get; }
        public Nullable<bool> cpbclass_isvalid { get; set; }
    }
}
