public class SplitRelationship
{
    public int Id { get; set; }

    public int ExpenseId { get; set; }
    public Expense Expense { get; set; }

    public int OwesId { get; set; }
    public User Owes { get; set; }

    public int OwedId { get; set; }
    public User Owed { get; set; }

    public decimal Amount { get; set; }
}
