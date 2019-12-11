using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
   public class CpBclass:IEntityBase
    {
        [Key]
        [Display(Name ="全集大類編號")]
        public int cpbclass_no { set; get; }

        [Display(Name = "全集大類名稱")]
        public string cpbclass_name { set; get; }

        [Display(Name = "全集大類排序")]
        public decimal? cpbclass_sort { set; get; }

        [Display(Name = "是否顯示")]
        public Nullable<bool> cpbclass_isdisplay { get; set; }

        [Display(Name = "是否有效")]
        public Nullable<bool> cpbclass_isvalid { get; set; }
        [Display(Name = "修改時間")]
        public Nullable<DateTime> etime { set; get; }

        [Display(Name = "修改使用者")]
        public string euser { set; get; }

        [Display(Name = "建立時間")]
        public Nullable<DateTime> ctime { set; get; }

        [Display(Name = "建立使用者")]
        public string cuser { set; get; }

        public Boolean cpbclass_webdisplay { set; get; }
    }
}
