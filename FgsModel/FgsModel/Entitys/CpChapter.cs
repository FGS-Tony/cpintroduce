using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
    public  class CpChapter:IEntityBase
    {
      
        [Display(Name = "章節編號")]
        [Key]
        public int cpchapter_no { get; set; }

        [Display(Name = "書冊編號")]
        public int cpbook_no { get; set; }
        [Display(Name = "章節名稱")]
        public string cpchapter_name { get; set; }
        [Display(Name = "章節上層媥號")]
        public Nullable<int> cpchapter_upper { get; set; }
        [Display(Name = "是否為內容")]
        public Nullable<bool> cpchapter_iscontents { get; set; }


        [Display(Name = "章節內容")]
        public string cpchapter_contents {get; set; }

        [Display(Name = "章節內容無html")]
        public string cpchapter_contentsnohtml { get; set; }

        [Display(Name = "章節層次")]
        public Nullable<int> cpchapter_level { get; set; }

        [Display(Name = "排序")]
        public decimal? cpchapter_sort { get; set; }

        [Display(Name = "是否有效")]
        public Nullable<bool> cpchapter_isvalid { get; set; }

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
