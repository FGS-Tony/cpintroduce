using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
   public class CpIntroduce:IEntityBase
    {
        [Key]
        [Display(Name = "序號")]
        public int cpintro_no { set; get; }
        [Display(Name = "全集自序")]
        public string cpintro_preface { set; get; }
        [Display(Name = "全集介紹")]
        public string cpintro_intro { set; get; }
        [Display(Name = "全集大師略傳")]
        public string cpintro_master { set; get; }

        [Display(Name = "星雲之道")]
        public string cpintro_masterroad { set; get; }

        [Display(Name = "全集新舊目錄對照")]
        public string cpintro_newoldcheck { set; get; }

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
