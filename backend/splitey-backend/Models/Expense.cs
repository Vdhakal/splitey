public class Expense
{
    public int Id { get; set; }
    public DateTime? CreatedAt { get; set; }
    public decimal Amount { get; set; }
    public string? Comments { get; set; }

    public int AddedById { get; set; }
    public User AddedBy { get; set; }

    public int? GroupId { get; set; }
    public Group? Group { get; set; }

    public ICollection<User> SplitAmong { get; set; }
    public ICollection<SplitRelationship> Splits { get; set; }
}
