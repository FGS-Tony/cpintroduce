using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class CpChapterViewModel
    {
      
        public int cpbook_no { get; set; }
 
        public int cpchapter_no { get; set; }
   
        public string cpchapter_name { get; set; }
 
        public Nullable<int> cpchapter_upper { get; set; }

        public decimal? cpchapter_sort { set; get; }
        public Nullable<bool> cpchapter_iscontents { get; set; }
 
        public Nullable<int> cpchapter_level { get; set; }
 
        public string cpchapter_contents { set; get; }

        public string cpchapter_contentsnohtml { get; set; }

        public string cpchapter_contentshtml { set; get; }
       
       public string type { set; get; }
        public string cpbook_name { set; get; }
        public Nullable<bool> cpchapter_isvalid { set; get; }
        public Nullable<DateTime> etime { set; get; }

 
        public string euser { set; get; }

      
        public Nullable<DateTime> ctime { set; get; }

 
        public string cuser { set; get; }
    }
}
