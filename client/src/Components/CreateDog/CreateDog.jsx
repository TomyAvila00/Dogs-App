import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from "../../redux/actions/index";
import validate from "../Validates/validates";
import "./CreateDog.css";


export const CreateDog =()=> {

  const temperament = useSelector((state)=> state.temperaments)
  const dispatch = useDispatch();
  const [error, setError] = useState({})
  const [input, setInput] = useState({
    name: '',
    heightMin: '',
    heightMax: '',
    weightMin: '',
    weightMax: '',
    years: '',
    temperament: []
  })

  function handleDelete(e){
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e)
    })
  }

  function handleSelect(e){
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value]
        })
  }

  const handleChange = (e) => {
    setInput({
        ...input,
        [e.target.name] : e.target.value 
    })
    setError(validate({
        ...input,
        [e.target.name] : e.target.value
    }))}

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input))
    alert('Created succesfully')
    setInput({
      name: '',
      heightMin: '',
      heightMax: '',
      weightMin: '',
      weightMax: '',
      years: '',
      temperament: []
    })
  }

  const [button, setButton] = useState({})

  useEffect(() => {
      input.name && 
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.years &&
      input.temperament.length ? setButton(false) : setButton(true)
  }, [input])

  useEffect(()=>{
      dispatch(getTemperaments())
  },[dispatch])


  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className='form-text'>Add a breed</h1>

        <div className='form-name'>
          <input type="text" name="name" value={input.name} onChange={handleChange}  placeholder='Name'/>
        </div> 
        { error.name && <p>{error.name}</p>} 

        <div className='form-height'>
          <input type="number" name="heightMin"  value={input.heightMin} onChange={handleChange} placeholder='Height min:'/>
        </div>

        {error.heightMin && <p>{error.heightMin}</p>}

        <div className='form-height'>
          <input type="number" name="heightMax" value={input.heightMax}  onChange={handleChange}placeholder='Height max:'/>
        </div>

        {error.heightMax && <p>{error.heightMax}</p>}
        {error.height && <p>{error.height}</p>}

        <div className='form-weight'>
          <input type="number" name="weightMin" value={input.weightMin}  onChange={handleChange} placeholder='Weight min:' />
        </div>

        {error.weightMin && <p>{error.weightMin}</p>}

        <div className='form-weight'>
          <input type="number" name="weightMax" value={input.weightMax} onChange={handleChange} placeholder='Weight max: '/>
        </div>

        {error.weightMax && <p>{error.weightMax}</p>}
        {error.weight && <p>{error.weight}</p>}

        <div className='form-life-span'>
          <input type="number" name="years" value={input.years} onChange={handleChange}  placeholder='Life span:'/>
        </div>

        <div>
            <div>

              <select className='temp-selector' onChange={(e) => handleSelect(e)}>
                  <option value='all' hidden >Choose temperaments</option>
                  {temperament.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
              </select>

            </div>

            <div className='container-temps'>
                {input.temperament.map((element, index) => (
                    <div className='temp-selected' key={index}>
                    <h4>{element}</h4>
                    <div>
                    <button type="button" onClick={() => handleDelete(element)}> X </button>
                    </div>
                    </div>
                ))}
            </div>
        </div> 

        <div className='create-button'>
          <button disabled={button} type="submit">Create</button>
        </div>
        <div className='back-home-button'>
          <Link to='/home'>
            <button>Back to home</button>
          </Link>       
        </div>
      </form>
    </div>
  )
}