
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;

namespace FgsModel.Entitys
{
   public class CpBook:IEntityBase
    {

        [Display(Name = "全集大類編號")]
        public int cpbclass_no { get; set; }
        [Key]
        [Display(Name = "書冊編號")]
        public int cpbook_no { get; set; }

        [Display(Name = "書冊名稱")]
        public string cpbook_name { get; set; }

        [Display(Name = "顯示")]
        public Nullable<Boolean> cpbook_isdisplay { get; set; }

        [Display(Name = "排序")]
        public   decimal? cpbook_sort { get; set; }

        [Display(Name = "是否有效")]
        public Boolean cpbook_isvalid { get; set; }

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