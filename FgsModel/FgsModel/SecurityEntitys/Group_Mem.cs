using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FgsModel.SecurityEntitys
{
    public class Group_Mem
    { 
        [Key]
        public string group_no { get; set; }
        [Key]
        public string user_no { get; set; }
    }
}
