{/*defining functional component containing an array of user data.
The purpose of this block of code is to receive array of user
data as a prop,iterate over it,extract relevant keys and render it through a table format.
Work to display data in a structured and readable manner.*/}

// eslint-disable-next-line react/prop-types
const UserData = ({users}) => {
    return (
        <>
            {   
                // eslint-disable-next-line react/prop-types
                users.map((curUser) => {
                    const {id, firstName,lastName,maidenName,gender,age, email} = curUser;
                    const {address,city}=curUser.address;
                    return (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{maidenName}</td>
                            <td>{gender}</td>
                            <td>{age}</td>
                            <td>{email}</td>
                            <td>{address},{city}</td>                            
                        </tr>
                    )
                })
            }
        </>
    )
}
export default UserData;
