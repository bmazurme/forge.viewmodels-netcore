using System.Collections.Generic;
using System.Linq;
using forgeSample.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace forgeSample.Views
{
    public class ListModel : PageModel
    {
        List<Person> people = new() { new Person { Name = "Tom", Age = 23 } }; 
        public List<Person> DisplayedPeople { get; set; }
        //public string RequestId { get; set; }
        public ListModel()
        {
            people = new List<Person>()
            {
                new Person{ Name="Tom", Age=23},
                new Person {Name = "Sam", Age=25},
                new Person {Name="Bob", Age=23},
                new Person{Name="Tom", Age=25}
            };
        }

        public void OnGet()
        {
            DisplayedPeople = new List<Person>()
            {
                new Person{ Name="Tom", Age=23},
                new Person {Name = "Sam", Age=25},
                new Person {Name="Bob", Age=23},
                new Person{Name="Tom", Age=25}
            };
        }

        //public void OnGetByName(string name)
        //{
        //    DisplayedPeople = people.Where(p => p.Name.Contains(name)).ToList();
        //}
        //public void OnGetByAge(int age)
        //{
        //    DisplayedPeople = people.Where(p => p.Age == age).ToList();
        //}
    }
}
