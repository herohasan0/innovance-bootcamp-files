import './App.css';
import { useState, useEffect } from 'react';
import { Stack, Button } from '@chakra-ui/react';
import Card from './Card';
import StatisticItem from './StatisticItem';
import loadingImg from './loading.png';

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(true);
  const [loading, setLoading] = useState(true);

  //Fetch data from api and set result to countries variable
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Some chakraui components */}
      <Stack
        mt="30px"
        justify="center"
        direction="row"
        spacing={4}
        align="center"
      >
        {/* Click this button and set showCountries to true */}
        <Button
          onClick={() => {
            setShowCountries(true);
          }}
          colorScheme="teal"
          variant={showCountries ? 'solid' : 'outline'}
        >
          List Of Countries
        </Button>

        {/* Click this button and set showCountries to false */}
        <Button
          onClick={() => {
            setShowCountries(false);
          }}
          colorScheme="teal"
          //If showCountries is false then button variant will be solid
          //In that way button looks like selected
          variant={!showCountries ? 'solid' : 'outline'}
        >
          Language Statistic
        </Button>
      </Stack>

      <div className="App">
        {/* If the data doesn't load yet show empty card */}
        {loading && (
          <Card
            name={'name loading'}
            flag={loadingImg}
            population={'population loading'}
            region={'region loading'}
            subregion={'subregion loading'}
            languages={['languages loading']}
            capital={'capital loading'}
          />
        )}
        {/* If showCountries is true then show the country list */}
        {/* otherwise statistic page will be there */}
        {showCountries &&
          countries &&
          countries.map((country, index) => (
            <Card
              key={index}
              name={country.name}
              flag={country.flag}
              population={country.population}
              region={country.region}
              subregion={country.subregion}
              languages={country.languages}
              capital={country.capital}
            />
          ))}
        {!showCountries && <StatisticItem countries={countries} />}
      </div>
    </>
  );
}

export default App;
