{/*importing hook and components from react library */}
import { useEffect, useState } from "react";
import UserData from "./components/UserData";
const API="https://dummyjson.com/users"

{/*creating react functional component App consisting of fetchUsers function(ansynchronous) which fetches data from an APIendpoint.
It consists of two state variables users and searchQuery.
Searchquery state used for storing search input from the users*/}
const App= () =>{
  const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const fetchUsers=async () =>{
        try{
            const res= await fetch(API);
            const data= await res.json();
            if(data.users && data.users.length > 0)
                {
                    setUsers(data.users);
                }
            console.log(data);
        }catch (e)
        {
            console.error(e)
        }
    }
    useEffect(()=>{
        fetchUsers(API);
    },[])

    {/*This block handles the submission of a search query.
    It fetches user data based of the query and updates the components state accordingly.*/}
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API}/search?q=${searchQuery}`);
          const data = await response.json();
          setUsers(data.users);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      };

      {/*navbar of the webpage */}
      const Navbar = () => {
        return (
          <nav>
            <h1 className="heading"><u>Data Keeper</u></h1>
          </nav>
        );
      };

      {/*scroll to top function */}
      const handleScrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth" 
        });
      };
    
      {/*Reset the search query state to an empty string.
      Refetches user data from the API */}
      const handleReset = () => {
        setSearchQuery('');
        fetchUsers();
      };
      
      {/*updates the searchQuery state with the new value entered by the user*/}
      const handleChange = (e) => {
        setSearchQuery(e.target.value);
      };    
    return <>

    {/*Rendering the navbar component */}
    <Navbar />
    
    {/*form allowing user to input a search query,
     submit it and Reset the form using the buttons */}
    <form onSubmit={handleSearch}>
        <input 
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search by name..."
        />
        <button className="submit" type="submit">Search</button>
        <button className="reset" type="button" onClick={handleReset}>Reset</button>        
      </form>

      {/*creates a table to display user data */}
       <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>MaidenName</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Email</th>
                <th>Address</th>
            </tr>                        
        </thead>

        {/*Rendering the user data in the table body*/}
        <tbody>
            <UserData users={users}/>
        </tbody>
       </table>

       {/*footer button for scrolling back to the top of the page */}
       <footer>
        <button className="top" onClick={handleScrollToTop}>Back to Top</button>
      </footer>
    </>
}

{/*exporting app component as default */}
export default App;