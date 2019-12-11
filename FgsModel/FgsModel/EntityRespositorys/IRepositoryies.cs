using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.Entitys;

namespace FgsModel.EntityRespositorys
{

    

    public interface ICpBclassDataRepository : IEntityBaseRespository<CpBclass> { };

    public interface ICpBookDataRepository : IEntityBaseRespository<CpBook> { };
    public interface ICpChapterDataRepository : IEntityBaseRespository<CpChapter> { };
    public interface ICpContentsDataRepository : IEntityBaseRespository<CpContents> { };
    public interface ICpIntroduceDataRepository : IEntityBaseRespository<CpIntroduce> { };
    public interface ILinksDataRepository : IEntityBaseRespository<Links> { };

    public interface IMemberDataRepository : IEntityBaseRespository<Member> { };

    public interface IListCpChapterDataRepository : IEntityBaseRespository<ListCpChapter> { };


    public interface IVegRootDataRepository : IEntityBaseRespository<VegRoot> { };

    public interface IBookSubMenuDataRepository : IEntityBaseRespository<BookSubMenu> { };

}
