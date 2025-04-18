using System.Collections.Generic;

namespace backend.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? PictureUrl { get; set; }

        public int CreatedById { get; set; }
        public User CreatedBy { get; set; }

        public ICollection<GroupMember> Members { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }

}
