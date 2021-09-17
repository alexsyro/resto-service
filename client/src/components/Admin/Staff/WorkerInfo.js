import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {UPD_STAFF} from '../../../redux/actionTypes/actionType'


  function WorkerInfo() {

    const dispatch = useDispatch();

    const history = useHistory();
    const { id } = useParams();

    const allStaff = useSelector((state) => state.staffReducer.staff);
    const currentWorker = allStaff.find((worker) => worker.id === +id);
    console.log(currentWorker, 'currentSaladsItem')

    
    const inputName = useRef(null)
    const inputUsername = useRef(null)
  

    const handlerSave = () => {

      const updateWorker = {
        id: currentWorker.id,
        inputName: inputName.current.value,
        inputUsername: inputUsername.current.value,
      }
      console.log(updateWorker);
      dispatch({type: UPD_STAFF, payload: updateWorker})
    }
  

    return (
      <div>
        <div className="uk-card uk-card-primary uk-card-body">
          <h3 className="uk-card-title">Card ID: #{currentWorker?.id}</h3>

          <div className="uk-margin">
            <input ref={inputName} className="uk-input" type="text" defaultValue={currentWorker?.name} placeholder="Id" />
          </div>

          <div className="uk-margin">
            <input ref={inputUsername} className="uk-input" type="text" defaultValue={currentWorker?.username} placeholder="Title" />
          </div>

          <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

          <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить</button>
        </div>
      </div>
    );
  }



export default WorkerInfo;
