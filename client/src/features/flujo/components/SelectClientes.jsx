import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/Spinner';

const useUsers = (defaultUsers = []) => {
    const [users, setUsers] = React.useState(defaultUsers);
    const [loading, setLoading] = React.useState(false);
    const featUsers = word => {
      setLoading(true);
  
      fetch(`https://api.github.com/search/users?q=${word}`)
        .then(response => response.json())
        .then(data => {
          setUsers(data.items);
          setLoading(false);
        })
        .catch(e => console.log('Oops, error', e));
    };
    
    return [users, loading, featUsers];
  };

const SelectClientes = ({ value, onChange }) => {
    const [users, loading, featUsers] = useUsers();
    console.log(users)
  return (
    <InputPicker
      data={users}
      style={{ width: 224 }}
      labelKey="login"//llave
      valueKey="id"//valor
      onSearch={featUsers}
      renderMenu={menu => {
        if (loading) {
          return (
            <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
              <SpinnerIcon spin /> Cargando...
            </p>
          );
        }
        return menu;
      }}
    />
  );
};

export default SelectClientes;
