import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// import { updCardAC } from '../../../../../redux/actionCreators/actionCreators'
import {UPD_CARD} from '../../../../../redux/actionTypes/actionType'


  function SaladsInfo() {

    const dispatch = useDispatch();

    const history = useHistory();
    const { id } = useParams();

    const saladsItems = useSelector((state) => state.getMenuReducer.menu);
    const currentSaladsItem = saladsItems.find((item) => item.id === +id);
    console.log(currentSaladsItem, 'currentSaladsItem')

    
    const inputTitle = useRef(null)
    const inputBody = useRef(null)
  

    const handlerSave = () => {

      const updateCard = {
        id: currentSaladsItem.id,
        inputTitle: inputTitle.current.value,
        inputBody: inputBody.current.value,
      }
      console.log(updateCard);
      dispatch({type: UPD_CARD, payload: updateCard})
    }
    //updCardAC(updateCard)

    return (
      <div>
        <div className="uk-card uk-card-primary uk-card-body">
          <h3 className="uk-card-title">Card ID: #{currentSaladsItem?.id}</h3>

          <div className="uk-margin">
            <input className="uk-input" type="text" defaultValue={currentSaladsItem?.userId} placeholder="Id" />
          </div>

          <div className="uk-margin">
            <input ref={inputTitle} className="uk-input" type="text" defaultValue={currentSaladsItem?.title} placeholder="Title" />
          </div>

          <div className="uk-margin">
            <input ref={inputBody} className="uk-input" type="text" defaultValue={currentSaladsItem?.body} placeholder="Body" />
          </div>

          <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

          <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить</button>
        </div>
      </div>
    );
  }



export default SaladsInfo;
