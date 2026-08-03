import React, { useState } from 'react'

function Fruist() {
    const [fruits,setFruits]=useState(['Apple','Mango'])
    const [fname,setFname] = useState("");
    const [edit,setEdit]=useState(null)

    const handleChange = (e)=>{
        setFname(e.target.value)
    }

    const handleClick = (e)=>{
        e.preventDefault();
        console.log(fname);
        setFruits([...fruits,fname])
        setFname("")
    }

    const delFruit= (id)=>{
        let newArray = fruits.filter((index,i)=>{
              if(id != i){
                  return index
              }
        })
        console.log(newArray);
        setFruits(newArray)
        
    }

    const EditFruit = (id)=>{
        setEdit(id)
        setFname(fruits[id])
    }
    const handleClickup=(e)=>{
          e.preventDefault();
        let newArray = fruits;
        fruits[edit]=fname;
        console.log(newArray);
        setFruits(newArray);
        setFname("")
        setEdit(null)
        
    }

  return (
    <div className='container mt-5 p-5 border border-5'>
        <h2>Fruits List</h2>
        <form className='border border-3 p-5' >
            
            <div className="form-group">
                <label htmlFor="">Enter fruit name:</label>
                <input type="text" name="" id="" onChange={handleChange} value={fname} />
               {
                  edit==null ?
                   <input type="submit" value="Add" onClick={handleClick}/>
                   :
                <input type="submit" value="Update" onClick={handleClickup}/>
               }
            </div>
        </form>

        <div className="row mt-5 border border-3 p-5">
            <ul>
                {
                    fruits && fruits.map((index,i)=>(
                        <li key={i}>{index} <button className='bg-transparent border-0' onClick={()=>{
                            delFruit(i)
                        }}>remove</button>
                        <button className='bg-transparent border-0' onClick={()=>{
                            EditFruit(i)
                        }}>Edit</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Fruist