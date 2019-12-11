using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
    public class Member:IEntityBase
    {
        [Key]

        [Display(Name = "會員序號")]
        public int member_no {set;get;}

        [Display(Name = "中文姓名")]
        public string member_cname { set; get; }

        [Display(Name = "email")]
        public string member_email { set; get; }

        [Display(Name = "密碼")]
        public string member_password { set; get; }

        [Display(Name = "是否有效")]
        public Nullable<Boolean> member_isvalid { set; get; }



        [Display(Name = "註冊日")]
        public  DateTime  ctime { set; get; }
    }
}
