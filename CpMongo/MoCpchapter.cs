using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Cpmongo
{
  public  class MoCpchapter
    {
        [BsonId]
        [BsonIgnoreIfDefault]
        public ObjectId _Id { get; set; }

        [Display(Name = "書冊編號")]
        [BsonElement("cpchapter_no")]
        public int? Cpchapter_No { get; set; }
       
        [Display(Name = "書冊編號")]
        [BsonElement("cpbook_no")]
        public int? Cpbook_No { get; set; }

        [BsonElement("cpchapter_name")]
        public string Cpchapter_Name { get; set; }

        [BsonElement("cpchapter_upper")]
        public Nullable<int> Cpchapter_Upper { get; set; }

        [Display(Name = "是否為內容")]

        [BsonElement("cpchapter_iscontents")]
        public Nullable<bool> Cpchapter_Iscontents { get; set; }


        [Display(Name = "章節內容")]

        [BsonElement("cpchapter_contents")]
        public string Cpchapter_Contents { get; set; }

        [Display(Name = "章節內容無html")]
        [BsonElement("cpchapter_contentsnohtml")]
        public string Cpchapter_Contentsnohtml { get; set; }

        [Display(Name = "章節層次")]

        [BsonElement("cpchapter_level")]
        public Nullable<int> Cpchapter_Level { get; set; }

        [Display(Name = "排序")]

        [BsonElement("cpchapter_sort")]
        public decimal? Cpchapter_Sort { get; set; }

        [Display(Name = "是否有效")]

        [BsonElement("cpchapter_isvalid")]
        public Nullable<bool> Cpchapter_Isvalid { get; set; }

        [BsonElement("cpchapter_isdisplay")]
        public Nullable<bool> Cpchapter_Isdisplay { get; set; }

        [Display(Name = "修改時間")]

        [BsonElement("etime")]
        public Nullable<DateTime> Etime { set; get; }

        [Display(Name = "修改使用者")]

        [BsonElement("euser")]
        public string Euser { set; get; }

        [Display(Name = "建立時間")]

        [BsonElement("ctime")]
        public Nullable<DateTime> Ctime { set; get; }

        [Display(Name = "建立使用者")]

        [BsonElement("cuser")]
        public string Cuser { set; get; }

    }
}
