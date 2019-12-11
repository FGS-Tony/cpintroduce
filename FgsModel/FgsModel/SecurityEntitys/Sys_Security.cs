using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace FgsModel.SecurityEntitys
{
  public  class Sys_Security:IEntityBase
    {
        [Key, Column(Order = 0)]
        public string pg_no { get; set; }
        [Key, Column(Order = 1)]
        public string user_no { get; set; }
        public string is_run { get; set; }
        public string is_add { get; set; }
        public string is_edit { get; set; }
        public string is_prt { get; set; }
        public string is_check { get; set; }
        public string is_delete { get; set; }
        public string edit_user_no { get; set; }
        public Nullable<System.DateTime> edit_time { get; set; }
    }
}
