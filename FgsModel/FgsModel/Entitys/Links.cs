using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
   public class Links:IEntityBase
    {
        [Key]
        [Display(Name = "連結編號")]
        public int  links_no { set; get; }

        [Display(Name = "連結名稱")]
        public string links_name { set; get; }

        [Display(Name = "連結URl")]
        public string links_url { set; get; }

        [Display(Name = "全集大類排序")]
        public decimal? links_sort { set; get; }

        [Display(Name = "是否顯示")]
        public Nullable<bool> links_isdisplay { get; set; }

        [Display(Name = "是否有效")]
        public Nullable<bool> links_isvalid { get; set; }


        [Display(Name = "連結別")]
        public int links_type { get; set; }

        [Display(Name = "修改時間")]
        public Nullable<DateTime> etime { set; get; }

        [Display(Name = "修改使用者")]
        public string euser { set; get; }

        [Display(Name = "建立時間")]
        public Nullable<DateTime> ctime { set; get; }

        [Display(Name = "建立使用者")]
        public string cuser { set; get; }
    }
}
