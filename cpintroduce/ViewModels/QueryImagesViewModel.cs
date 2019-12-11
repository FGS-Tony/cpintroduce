using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cpintroduce.ViewModels
{
    public class QueryImagesViewModel
    {
        [Key]
        public int images_no { set; get; }

        public int cpbclass_no { set; get; }


        public int bclass_no { set; get; }

        public string images_name { set; get; }


        public string images_originalfile { get; set; }


        public string images_sfilename { get; set; }

        public int images_imgtype { get; set; }


        public string images_filename { get; set; }


        public Nullable<bool> images_notdownload { get; set; }


        public string images_describe { get; set; }


        public string images_activity { get; set; }


        public Nullable<System.DateTime> images_actdate { get; set; }


        public string images_actlocation { get; set; }


        public string images_provider { get; set; }


        public Nullable<System.DateTime> images_providerdate { get; set; }


        public string images_author { get; set; }


        public string images_date { get; set; }


        public string images_person { get; set; }

        public string images_uploadmonth { get; set; }


        public bool images_isactive { get; set; }


        public string images_memo { get; set; }

        public string images_attachedfile { get; set; }
    }
}
