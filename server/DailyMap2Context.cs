using System;
using capstone_testing.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace capstone_testing
{
    public partial class DailyMap2Context : DbContext
    {
        public DailyMap2Context()
        {
        }

        public DailyMap2Context(DbContextOptions<DailyMap2Context> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("server=localhost;username=postgres;password=k2#tgl38r9;database=DailyMap2");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { }

        public DbSet<Events> Events { get; set; }
    }
}
