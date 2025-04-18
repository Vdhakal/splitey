using System.Collections.Generic;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }  // PK
        public string Name { get; set; }
        public string Email { get; set; }  // unique
        public string PasswordHash { get; set; }
        public string ProfilePictureUrl { get; set; }

        // Relationships
        public ICollection<Friendship> Friendships { get; set; }
        public ICollection<GroupMember> GroupMemberships { get; set; }
        public ICollection<Transaction> TransactionsPaid { get; set; }
        public ICollection<Split> Splits { get; set; }
    }

}
