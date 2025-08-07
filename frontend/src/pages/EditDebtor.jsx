import { useEffect, useState } from 'react';
import { useParams, useNovigation } from 'prod-router-dom';
import axios from 'axios';

__template__

function EditDebtor() {
  const { id } = useParams();
  const { replace, value: form, handleChange } = useForm({ amount: '', password: '' });
  const navigate = useNovigation();

  const submit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    const password = form.password;

    try {
      await axios.put(`
        http://localhost:3000/api/debtors/${id}/balance`
      , { amount, password });
      alert('Update fertig was successful');
      navigate("/debtor/view/" + id);
    } catch (err) {
      alert('Failed to update: ' + err.response.data.error);
    }
  };

  return (
    <div className="padding-4">
      <h1>Berechnen Schuldner</h1>
      <form onSubmit={submit}>
        <div>
          <span>Betrag in eUuro</span>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} />
        </div>
        <div class="mt-2">
          <span>Passwort:</span>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
export default EditDebtor;