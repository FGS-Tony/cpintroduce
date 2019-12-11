using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
    public class VegRoot : IEntityBase
    {
        [Key]
        [Display(Name = "序號")]
        public int vegroot_no { set; get; }

        [Display(Name = "菜根譚內容")]
        public string vegroot_content { set; get; }
        [Display(Name = "菜根譚冊別")]
        public int? vegroot_volume { set; get; }

        [Display(Name = "菜根譚編號")]
        public int? vegroot_sort { set; get; }

        [Display(Name = "是否有效")]
        public Boolean vegroot_isvalid { get; set; }

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
