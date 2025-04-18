public class Group
{
    public int Id { get; set; }
    public string GroupName { get; set; }

    public int CreatedById { get; set; }
    public User CreatedBy { get; set; }

    public ICollection<User> Members { get; set; }
    public ICollection<Expense> Expenses { get; set; }
}
