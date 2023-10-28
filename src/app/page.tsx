"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css'

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');

  const fetchInfo = async () => {
    try {
      // age information
      const ageResponse = await axios.get(`https://api.agify.io?name=${name}`);
      setAge(ageResponse.data.age);

      // gender information
      const genderResponse = await axios.get(`https://api.genderize.io?name=${name}`);
      setGender(genderResponse.data.gender);

      // nationality information
      const nationalityResponse = await axios.get(`https://api.nationalize.io?name=${name}`);
      // let us assume only one nationality returned
      if (nationalityResponse.data.country.length > 0) {
        setNationality(nationalityResponse.data.country[0].country_id);
      } else {
        setNationality('Data not available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <h1>Name Information App</h1>
      </div>
    <div className={styles.main}>
      <div className={styles.formInput}>
      <input className={styles.inputBox}
        type="text"
        placeholder="Enter a name "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className={styles.button} onClick={fetchInfo}>Get Info</button>
    <div className='fetched-data'>
      {name &&(
      <p>Entered Name: {name}</p>
      )}

      {age && ( 
        <p>Age: {age}</p>
      )}

      {gender && (
        <p>Gender: {gender}</p>
      )}

      {nationality && (
        <p>Nationality: {nationality}</p>
      )}
      </div>
    </div>
    </div>
    </div>
  );
}
