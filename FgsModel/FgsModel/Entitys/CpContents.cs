using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
  public  class CpContents:IEntityBase
    {
        [Key]
        [Display(Name = "章節編號")]
        public int cpchapter_no { get; set; }

        [Display(Name = "內容編號")]
        public int cpcontents_no { get; set; }

        [Display(Name = "內容")]
        public string cpcontents_contents { get; set; }
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
