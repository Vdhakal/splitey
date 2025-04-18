namespace backend.Models
{
    public class Split
    {
        public int Id { get; set; }

        public int TransactionId { get; set; }
        public Transaction Transaction { get; set; }

        public int UserId { get; set; }  // The user who owes
        public User User { get; set; }

        public decimal AmountOwed { get; set; }
    }

}
