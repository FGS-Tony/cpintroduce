using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.SecurityEntitys
{
   public  class SysPg:IEntityBase
    {
        [Key]
        public string pg_no { get; set; }
        public string pg_name { get; set; }
        public string pg_file { get; set; }
        public string sys_typeno { get; set; }
        public string sys_stypeno { get; set; }
        public string pg_safe { get; set; }
        public string pg_use { get; set; }
        public string user_no { get; set; }
        public Nullable<System.DateTime> edit_time { get; set; }
    }
}
