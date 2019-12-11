using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.SecurityEntitys
{
   public class Users:IEntityBase
    {
        [Key]
        public Nullable<int> id { get; set; }
        public string user_no { get; set; }
        public string user_name { get; set; }
        public string user_id { get; set; }
        public string pwd { get; set; }
        public string unit_no { get; set; }
        public Nullable<int> unit_id { get; set; }
        public Nullable<int> identity_id { get; set; }
        public Nullable<int> group_id { get; set; }
        public string contact_phone { get; set; }
        public string contact_phone_ext { get; set; }
        public string mobile { get; set; }
        public string email { get; set; }
        public string contact_addr { get; set; }
        public Nullable<bool> left_job { get; set; }
        public string user_verify_status_id { get; set; }
        public Nullable<System.DateTime> last_login_date { get; set; }
        public Nullable<bool> @readonly { get; set; }
        public Nullable<bool> enabled { get; set; }
        public Nullable<System.DateTime> create_date { get; set; }
        public string leave_date { get; set; }

    }
}
