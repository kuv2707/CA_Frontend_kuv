import React, { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
type User = {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  college: string;
  year: string;
  phone_no: string;
  whatsapp_no: string;
  postal_address: string;
  pin_code: string;
  why_choose: string;
  were_you_ca: boolean;
  points: number;
  date_joined: string;
  user: string;
  email_token: string;
};
const BACKEND_URL = 'http://localhost:8000/'; //TODO: move to .env

const UserTable = ({ token }: { token: string | null }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function fetchUnverifiedUsers() {
    fetch(BACKEND_URL + 'auth/verifyaccount/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((k) => k.json())
      .then((data) => {
        console.log(data);
        if (data.splice === undefined)
          //there has been an error as data is not an array
          throw new Error(data.detail);
        setUsers(data);
      })
      .catch((err) => setErrorMessage('' + err));
  }
  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  function handleVerify(email_token: string) {
    setErrorMessage("loading...")
    fetch(BACKEND_URL + 'auth/verifyaccount/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': '0',
        Accept: '*/*',
      },
      body: JSON.stringify({
        token: email_token,
      }),
    })
      .then((k) => {
        if (k.status === 200) {
          fetchUnverifiedUsers();
        } else
          throw new Error(
            'Error verifying user ' + k.status + ' ' + k.statusText
          );
      })
      .catch((err) => setErrorMessage('' + err)).finally(()=>setErrorMessage(''));
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>User Name</th>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>College</th>
            <th className={styles.th}>Year</th>
            <th className={styles.th}>Phone Number</th>
            <th className={styles.th}>WhatsApp Number</th>
            <th className={styles.th}>Postal Address</th>
            <th className={styles.th}>Pin Code</th>
            <th className={styles.th}>Why Choose</th>
            <th className={styles.th}>Were You CA</th>
            <th className={styles.th}>Points</th>
            <th className={styles.th}>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={styles.td}>{user.user_name}</td>
              <td className={styles.td}>{user.first_name}</td>
              <td className={styles.td}>{user.last_name}</td>
              <td className={styles.td}>{user.college}</td>
              <td className={styles.td}>{user.year}</td>
              <td className={styles.td}>{user.phone_no}</td>
              <td className={styles.td}>{user.whatsapp_no}</td>
              <td className={styles.td}>{user.postal_address}</td>
              <td className={styles.td}>{user.pin_code}</td>
              <td className={styles.td}>{user.why_choose}</td>
              <td className={styles.td}>{user.were_you_ca ? 'Yes' : 'No'}</td>
              <td className={styles.td}>{user.points}</td>
              <td className={styles.td}>
                {new Date(user.date_joined).toLocaleDateString()}
              </td>
              <td>
                <button
                  className={styles.button}
                  onClick={() => handleVerify(user.email_token)}
                >
                  Mark verified
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </>
  );
};

// const styles = {
//   th: {
//     // Add your styles for th elements here
//     // For example:
//     backgroundColor: '#f2f2f2',
//     padding: '10px',
//     border: '1px solid #ddd',
//     justifyContent: 'center',
//   },
// };

export default UserTable;
