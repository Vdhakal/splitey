using Microsoft.EntityFrameworkCore;

namespace splitey_backend.Context
{
    public class SpliteyContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<SplitRelationship> SplitRelationships { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        public SpliteyContext(DbContextOptions<SpliteyContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Group>().ToTable("Groups");
            modelBuilder.Entity<Expense>().ToTable("Expenses");
            modelBuilder.Entity<Friendship>().ToTable("Friendships");
            modelBuilder.Entity<SplitRelationship>().ToTable("SplitRelationships");

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User1)
                .WithMany(u => u.FriendshipsInitiated)
                .HasForeignKey(f => f.User1Id)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User2)
                .WithMany(u => u.FriendshipsReceived)
                .HasForeignKey(f => f.User2Id)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Group>()
                .HasOne(g => g.CreatedBy)
                .WithMany(u => u.GroupsCreated)
                .HasForeignKey(g => g.CreatedById)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Group>()
                .HasMany(g => g.Members)
                .WithMany(u => u.GroupsJoined);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.AddedBy)
                .WithMany(u => u.ExpensesAdded)
                .HasForeignKey(e => e.AddedById)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Expense>()
                .HasOne(e => e.Group)
                .WithMany(g => g.Expenses)
                .HasForeignKey(e => e.GroupId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Expense>()
                .HasMany(e => e.SplitAmong)
                .WithMany();

            modelBuilder.Entity<SplitRelationship>()
                .HasOne(s => s.Expense)
                .WithMany(e => e.Splits)
                .HasForeignKey(s => s.ExpenseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SplitRelationship>()
                .HasOne(s => s.Owes)
                .WithMany(u => u.SplitOwes)
                .HasForeignKey(s => s.OwesId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SplitRelationship>()
                .HasOne(s => s.Owed)
                .WithMany(u => u.SplitOwed)
                .HasForeignKey(s => s.OwedId)
                .OnDelete(DeleteBehavior.NoAction);
        }



    }
}
