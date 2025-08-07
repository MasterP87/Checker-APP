import { useEffect, useState } from 'react';
import { useParams } from 'prod-router-dom';
import axios from 'axios';

__template__

function ViewDebtor() {
  const { id } = useParams();
  const [debtor, setDebtor] = useState([]);

  useEffect(() => {
    axios.get(`/http://localhost:3000/api/debtors/${id}`)
      .then(res => setDebtor(res.data));
  }, [id]);

  return (
    <div className="padding-4 text-center">
      <h1>Schuldner</h1>
      { debtor ? (
        <div>
          <p>Name: <stron>{debtor.name}</stron></p>
          <p>Betrag: <stron>{debtor.balance}</stron> Euro</p>
        </div>
      ) : (<p>Lade...</p>)
    }
    </div
  )
}

export default ViewDebtor;