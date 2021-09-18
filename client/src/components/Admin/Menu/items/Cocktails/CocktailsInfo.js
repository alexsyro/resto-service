// import React, { useRef } from 'react'
// import { useParams, useHistory } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
// import { UPD_COCKTAIL } from '../../../../../redux/actionTypes/actionType'


// function CocktailsInfo() {

//   const dispatch = useDispatch();

//   const history = useHistory();
//   const { id } = useParams();

//   const cocktailItems = useSelector((state) => state.cocktailsReducer.menu);
//   const currentCocktailItem = cocktailItems.find((item) => item.id === +id);
//   console.log(currentCocktailItem, 'currentSaladsItem')


//   const inputTitle = useRef(null)
//   const inputBody = useRef(null)


//   const handlerSave = () => {

//     const updateCocktailCard = {
//       id: currentCocktailItem.id,
//       inputTitle: inputTitle.current.value,
//       inputBody: inputBody.current.value,
//     }
//     console.log(updateCocktailCard);
//     dispatch({ type: UPD_COCKTAIL, payload: updateCocktailCard })
//   }
//   //updCardAC(updateCard)

//   return (
//     <div>
//       <div className="uk-card uk-card-primary uk-card-body">
       
//         <div className="uk-margin">
//           <input className="uk-input" type="text" defaultValue={currentCocktailItem?.name} placeholder="Name" />
//         </div>

//         <div className="uk-margin">
//           <input ref={inputTitle} className="uk-input" type="text" defaultValue={currentSaladsItem?.title} placeholder="Description" />
//         </div>

//         <div className="uk-margin">
//           <input ref={inputBody} className="uk-input" type="text" defaultValue={currentSaladsItem?.body} placeholder="Kcal" />
//         </div>

//         <div className="uk-margin">
//           <input ref={inputBody} className="uk-input" type="text" defaultValue={currentSaladsItem?.body} placeholder="PortionSize" />
//         </div>

//         <div className="uk-margin">
//           <input ref={inputBody} className="uk-input" type="text" defaultValue={currentSaladsItem?.body} placeholder="Kcal" />
//         </div>

//         <button onClick={() => history.goBack()} className="uk-button uk-button-default uk-margin">Назад</button>

//         <button onClick={handlerSave} className="uk-button uk-button-default uk-margin-left">Сохранить</button>
//       </div>
//     </div>
//   );
// }



// export default CocktailsInfo;
