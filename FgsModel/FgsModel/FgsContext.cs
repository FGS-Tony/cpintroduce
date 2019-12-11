using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.Entitys;
namespace FgsModel
{
    public class FgsContext : DbContext
    {
       
        public DbSet<CpBclass> CPBclass { set; get; }
        public DbSet<CpBook> CPBook { set; get; }
        public DbSet<CpChapter> CPChapter { set; get; }
        public DbSet<CpContents> CPContents { set; get; }
        public DbSet<CpIntroduce> CPIntroduce { set; get; }

        public DbSet<Member> Member { set; get; }
        public DbSet<Links> Links { set; get; }

        public DbSet<VegRoot> VegRoot { set; get; }
        public DbSet<BookSubMenu>  BookSubMenu { set; get; }

        public DbSet<ListCpChapter> ListCpChapter { set; get; }
        public FgsContext(DbContextOptions<FgsContext> options):base(options)   { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookSubMenu>().Property(x => x.cpchapter_sort).HasColumnType("decimal(6,2)");
            modelBuilder.Entity<CpChapter>().Property(x => x.cpchapter_sort).HasColumnType("decimal(6,2)");
            modelBuilder.Entity<CpBclass>().Property(x => x.cpbclass_sort).HasColumnType("decimal(5,2)");
            modelBuilder.Entity<CpBook>().Property(x => x.cpbook_sort).HasColumnType("decimal(5,2)");
            modelBuilder.Entity<ListCpChapter>().Property(x => x.Cpchapter_Sort).HasColumnType("decimal(6,2)");
            modelBuilder.Entity<Links>().Property(x => x.links_sort).HasColumnType("decimal(5,2)");
            //      b.Property(p => p.RowVersion).IsConcurrencyToken().ValueGeneratedOnAddOrUpdate();
            //modelBuilder.Entity<Images>().ToTable("images").HasKey(p=>p.images_no);
            //modelBuilder.Entity<Images_Location>().ToTable("images_location")
            //                                      .HasKey(p => new { p.images_no, p.images_version });

            //                                      ;
            //modelBuilder.Entity<Bclass>().ToTable("bclass").HasKey(p=>p.bclass_no);
            //modelBuilder.Entity<CpBclass>().ToTable("cpbclass").HasKey(p=>p.cpbclass_no);
        }
    }
}
