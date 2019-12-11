using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FgsModel.Entitys
{
   public class ListCpChapter: IEntityBase
    {
        [Key]
        public int Cpchapter_No { set; get; }
        public int Cpbook_No { set; get; }
        public string Cpbook_Name { set; get; }

        public string Cpchapter_Name { set; get; }
        public string Cpchapter_Contentsnohtml { set; get; }
 
        public decimal Cpchapter_Sort { set; get; }
        

        public int TotalCount { set; get; }
    }
}
