import { Link } from "react-router-dom";
import { Superhero } from "../../types/Superhero"
import { CloseSVG } from "../SVGs/CloseSVG";
import React, { Dispatch, SetStateAction } from 'react';
import axios from "axios";

type Props = {
  superhero: Superhero;
  setUpdateflag: Dispatch<SetStateAction<boolean>>;
  updateFlag: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const Item: React.FC<Props> = ({ superhero, setUpdateflag, updateFlag, setLoading }) => {
  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://localhost:3000/superheroes/${superhero.id}`)
    .then(() => {
      setUpdateflag(!updateFlag)
    })
    .catch(error => console.log(error))
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="item">
      <img className="item__img" src={`http://localhost:3000${superhero.images[0]}`} alt="#" />
      <div className="item__info">
        <p className="item__nickname">{superhero.nickname}</p>
        <Link className="item__link" to={`${superhero.id}`} >
          More Info
        </Link>
      </div>
      <CloseSVG onClick={handleDelete} className="item__delete" />
    </div>
  )
}