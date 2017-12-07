import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = (e) => ({
  // Will return an Object 
  type: 'DESCRIPTION_CHANGED',
  payload: e.target.value,
});

export const search = () => {
  const request = axios.get(`${URL}?sort=-createdAt`);
  return{
    type: 'TODO_SEARCHED',
    payload: request,
  }
}
// func without Thunk
// export const add = (description) => {
//   const request = axios.post(URL, { description });
//   return [
//     { type: 'TODO_ADDED', payload: request, },
//     search()  
//   ]
// }

export const add = (description) => {
  return dispatch => {
    axios.post(URL, {description})
          .then(resp => dispatch({ type: 'TODO_ADDED', payload: resp.data }))
          .then(resp => dispatch(search()))
  }
}

export const markAsDone = (todo) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done:true })
         .then(resp => dispatch(search()))
  }
}

export const markAsPending = (todo) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, {...todo, done: false })
         .then(resp => dispatch(search()));
  }
}
