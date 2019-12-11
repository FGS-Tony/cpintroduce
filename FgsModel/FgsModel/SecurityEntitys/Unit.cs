using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.SecurityEntitys
{
  public  class Unit:IEntityBase
    {
        [Key]
        public string unit_no { get; set; }
        public string area_no { get; set; }
        public string unit_cname { get; set; }
        public string unit_ename { get; set; }
        public string unit_addr { get; set; }
        public string unit_eaddr { get; set; }
        public string unit_tel { get; set; }
        public string unit_tel_2 { get; set; }
        public string unit_fax { get; set; }
        public string unit_email_1 { get; set; }
        public string unit_email_2 { get; set; }
        public string unit_email_3 { get; set; }
        public string unit_url { get; set; }
        public string unit_voip_phone { get; set; }
        public string unit_show { get; set; }
        public string unit_use { get; set; }
        public string user_no { get; set; }
        public Nullable<System.DateTime> edit_time { get; set; }
        public string man_user { get; set; }
        public Nullable<double> lat { get; set; }
        public Nullable<double> lng { get; set; }
    }
}
