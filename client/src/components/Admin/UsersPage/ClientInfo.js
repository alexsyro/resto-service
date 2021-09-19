import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {UPD_CLIENTS} from '../../../redux/actionTypes/actionType'


  function ClientInfo() {

    const dispatch = useDispatch();

    const history = useHistory();
    const { clientId } = useParams();

    const allClients = useSelector((state) => state.clientsReducer.clients);
    const currentClient = allClients.find((client) => client.id === +clientId);
    console.log(currentClient, 'currentClient')

    
    const inputName = useRef(null)
    const inputEmail = useRef(null)
    const inputPhone = useRef(null)
    const inputDiscount = useRef(null)
  

    const handlerSave = () => {

      const updateClient = {
        id: currentClient.id,
        inputName: inputName.current.value,
        inputEmail: inputEmail.current.value,
        inputPhone: inputPhone.current.value,
        inputDiscount: inputDiscount.current.value,
      }
      console.log(updateClient);
      dispatch({type: UPD_CLIENTS, payload: updateClient})

      fetch(`http://localhost:1234/api/clients/edit/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateClient)
    })
    .then(console.log('update')) //cделать редирект 
    }
  

    return (
      <div>
        <div className="uk-card uk-card-primary uk-card-body">
        
          <div className="uk-margin">
            <input ref={inputName} className="uk-input" type="text" defaultValue={currentClient?.name} placeholder="Name" />
          </div>

          <div className="uk-margin">
            <input ref={inputEmail} className="uk-input" type="text" defaultValue={currentClient?.position} placeholder="Email" />
          </div>

          <div className="uk-margin">
            <input ref={inputPhone} className="uk-input" type="phone" defaultValue={currentClient?.phone} placeholder="Phone" />
          </div>
          <div className="uk-margin">
            <input ref={inputDiscount} className="uk-input" type="text" defaultValue={currentClient?.discount} placeholder="Discount" />
          </div>

          <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

          <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить</button>
        </div>
      </div>
    );
  }



export default ClientInfo;
