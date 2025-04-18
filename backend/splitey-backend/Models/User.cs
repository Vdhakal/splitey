public class User
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string? ProfilePictureUrl { get; set; }

    public ICollection<Friendship> FriendshipsInitiated { get; set; }
    public ICollection<Friendship> FriendshipsReceived { get; set; }

    public ICollection<Expense> ExpensesAdded { get; set; }
    public ICollection<Group> GroupsCreated { get; set; }
    public ICollection<Group> GroupsJoined { get; set; }

    public ICollection<SplitRelationship> SplitOwes { get; set; }
    public ICollection<SplitRelationship> SplitOwed { get; set; }
}
