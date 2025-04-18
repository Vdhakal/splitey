using System.Collections.Generic;
using System;

namespace backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }

        public int PaidById { get; set; }
        public User PaidBy { get; set; }

        public int? GroupId { get; set; }
        public Group? Group { get; set; }

        public ICollection<Split> Splits { get; set; }
    }

}
