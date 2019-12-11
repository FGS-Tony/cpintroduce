using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.SecurityEntitys
{
    public class Sys_Group:IEntityBase
    {
        [Key]
        public string group_no { get; set; }
        public string group_name { get; set; }
        public string group_desc { get; set; }
        public string group_valid { get; set; }
        public string user_no { get; set; }
        public Nullable<System.DateTime> edit_time { get; set; }
    }
}
