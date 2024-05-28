import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making API requests
import Link from 'next/link';
import { userService } from 'services';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <p><Link href="/users">Manage Users</Link></p>
                
            </div>
        </div>
    );
  }
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {user ? (
        <Fragment>
          <h1>User Details</h1>
          <thead>
                <tr class="kj-theme">
                <th>Name: {user.name}</th>
                <th>Username: {user.username}</th>
                <th>Email: {user.email}</th>
                <th>Phone No: {user.mobile_no}</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody id="user_all">          
            </tbody>
            <td style="text-align:right">
                <button  class="btn kj-button kj-black">Approve</button>
                <button  class="btn kj-button kj-black">Dissmiss</button>
            </td>
        </Fragment>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDetails;
