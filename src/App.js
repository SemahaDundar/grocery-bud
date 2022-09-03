import React, { useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStrorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')));
  }else {
    return[];
  
  };

}

function App() {

const [isim, isimGuncelle] = React.useState('');
const [liste, listeGuncelle] = React.useState(getLocalStrorage());
const [duzenlendi, duzenGuncelle] = React.useState(false);
const [editId, setEditId] = React.useState (null);
const [uyari, uyariAyarla ] = React.useState({show: false, msg: '' , type: ''});
const handleSubmit =(e) =>{
  e.preventDefault();
  if(!isim){
    showAlert(true, 'danger', 'please enter value');
  }else if (isim && duzenlendi){
    listeGuncelle(
      liste.map((item) =>{
        if(item.id === editId){
          return { ...item, title: isim};
        }
        return item;
        
      })
    );
    isimGuncelle('');
    setEditId(null);
    duzenGuncelle(false);
    showAlert(true, 'success', 'value changed');
    const newItem = {id: new Date().getTime().toString().title.name};


    listeGuncelle([...liste, newItem]);
    isimGuncelle('');
  }
};
const showAlert = (show = false, type = '', msg = '')=>{
  uyariAyarla({ show, type, msg});
};
const clearList = () =>{
  showAlert(true, 'danger', 'empty list');
  listeGuncelle([]);
};
const removeItem = ( id) =>{
  showAlert(true, 'danger', 'item removed');
  listeGuncelle(liste.filter((item) => item.id !== id));
};

const editItem = (id) =>{
  const specificItem = liste.find((item) => item.id === id);
  duzenGuncelle(true);
  setEditId(id);
  isimGuncelle(specificItem.title);
};
useEffect(() =>{
  localStorage.setItem('liste', JSON.stringify(liste) );

}, [liste]);





  return (
  <section className='section-center'>
    <form className='grocerform' onSubmit={handleSubmit}>
      {uyari.show && <Alert {...uyari} removeAlert ={showAlert} liste={liste}/>}
<h3>grocery bud</h3>
<div className='form-kontrol'>

  <input type='text' className='grocery' placeholder=' e.g. eggs' 
  value={isim} onChange={(e) => isimGuncelle(e.target.value)}
  />

  <button type='submit' className='submit-btn' >

    {duzenlendi ? 'edit' : 'submit'}
  </button>
</div>
    </form>
    {liste.length > 0 &&(
      <div className='grocery-container'>
<List items={liste} removeItem={ removeItem} editItem={editItem}/>
<button className='clear-btn' onClick={clearList}>
  clear items
</button>
      </div>
    )}


  </section>

  );
}

export default App;
