using System;
using System.Collections.Generic;
using System.Text;
using FgsModel.SecurityEntitys;
using Microsoft.EntityFrameworkCore;

namespace FgsModel
{
    public class EipContext : DbContext
    {
         public    DbSet<Users> users { set; get; }
        public DbSet<Unit> unit { set; get; }
        public DbSet<SysPg> syspg  {set;get;}

        public DbSet<Sys_Security> sys_security { set; get; }
        public DbSet<Sys_Group>  sys_group { set; get; }
        public DbSet<Group_Mem> group_mem{ set; get; }

        public EipContext(DbContextOptions<EipContext> options):base(options)   { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable("users");
            modelBuilder.Entity<Group_Mem>().ToTable("group_mem").HasKey(c => new { c.group_no, c.user_no });
            modelBuilder.Entity<Sys_Security>().ToTable("sys_security").HasKey(c => new { c.pg_no, c.user_no });
        }
    }
}
