import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CloseSVG } from "../../components/SVGs/CloseSVG";
import { Superhero } from "../../types/Superhero";
import apiClient from "../../utils/fetchHeroes";
import { FileInput } from "../../components/FileInput/FileInput";
import { Loader } from "../../components/Loader/Loader";
import { Arrow } from "../../components/SVGs/Arrow";

export const SuperHero = () => {
  const path = useLocation();
  const [loading, setLoading] = useState<boolean>(false)
  const [hero, setHero] = useState<Superhero>()
  const [edit, setEdit] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('');
  const [realName, setRealName] = useState<string>('');
  const [originDescription, setOriginDescription] = useState<string>('');
  const [superpowers, setSuperpowers] = useState<string>('');
  const [catchPhrase, setCatchPhrase] = useState<string>('');
  const [files, setFiles] = useState<(string | File)[]>([]);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:3000/superheroes${path.pathname}`)
      .then((res) => {
        setHero(res.data)
        setNickname(res.data.nickname);
        setRealName(res.data.realName)
        setOriginDescription(res.data.originDescription)
        setSuperpowers(res.data.superpowers)
        setCatchPhrase(res.data.catchPhrase)
        setFiles(res.data.images)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  const deleteFiles = (i: number) => {
    const newFiles = files.filter((_, index) => index !== i);

    setFiles(newFiles);
  };

  const onPatchUpdate = async () => {
    const formData = new FormData();
    setLoading(true)

    formData.append('nickname', nickname);
    formData.append('realName', realName);
    formData.append('originDescription', originDescription);
    formData.append('superpowers', superpowers);
    formData.append('catchPhrase', catchPhrase);
    formData.append('existingImages', JSON.stringify(files));
    files.forEach((file) => formData.append('files', file));

    apiClient.patch(`/superheroes/${hero?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        setEdit(false)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  };

  return (
    <div className="superhero">
      {loading ?
        (
          <Loader />
        ) : (
          <div className="superhero__container">
            <div className="superhero__imgs">
              {files.map((file, i) => (
                <div key={i} className="superhero__img-container">
                  {edit && (<CloseSVG onClick={() => deleteFiles(i)} className="superhero__delete-img" />)}
                  <img
                    className="superhero__img"
                    src={typeof file === 'string' ? `http://localhost:3000${file}` : URL.createObjectURL(file)}
                    alt="#" />
                </div>
              ))}
              {edit && (
                <FileInput files={files} setFiles={setFiles} />
              )}
            </div>
            <div className="superhero__infos">
              <div className="superhero__info">
                <p className="superhero__option">Nickname:</p>
                {edit ? (
                  <input
                    className="superhero__input"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    type="text" />
                ) : (
                  <p className="superhero__value">{nickname}</p>
                )}
              </div>
              <div className="superhero__info">
                <p className="superhero__option">Real name:</p>
                {edit ? (
                  <input
                    className="superhero__input"
                    value={realName}
                    onChange={(e) => setRealName(e.target.value)}
                    type="text" />
                ) : (
                  <p className="superhero__value">{realName}</p>

                )}
              </div>
              <div className="superhero__info">
                <p className="superhero__option">Hero origin:</p>
                {edit ? (
                  <textarea
                    className="superhero__input"
                    value={originDescription}
                    onChange={(e) => setOriginDescription(e.target.value)}
                  />
                ) : (
                  <p className="superhero__value">{originDescription}</p>
                )}
              </div>
              <div className="superhero__info">
                <p className="superhero__option">Superpowers:</p>
                {edit ? (
                  <textarea
                    className="superhero__input"
                    value={superpowers}
                    onChange={(e) => setSuperpowers(e.target.value)} />
                ) : (
                  <p className="superhero__value">{superpowers}</p>
                )}
              </div>
              <div className="superhero__info">
                <p className="superhero__option">Catch phrase:</p>
                {edit ? (
                  <textarea
                    className="superhero__input"
                    value={catchPhrase}
                    onChange={(e) => setCatchPhrase(e.target.value)} />
                ) : (
                  <p className="superhero__value">{catchPhrase}</p>
                )}
              </div>
              {edit && (
                <button className="superhero__submit" onClick={onPatchUpdate}>
                  save changes
                </button>
              )}
            </div>
          </div>
        )}
      <div className="superhero__buttons">
        <Link  className="superhero__back" to={'/'}>
          <Arrow className="superhero__arrow" />
          <p>To All</p>
        </Link>
        <button className="superhero__update" onClick={() => {
          if (edit && hero) {
            setNickname(hero.nickname);
            setRealName(hero.realName)
            setOriginDescription(hero.originDescription)
            setSuperpowers(hero.superpowers)
            setCatchPhrase(hero.catchPhrase)
            setFiles(hero.images)
          }
          setEdit(!edit)
        }} >
          {edit ? 'decline changes' : 'change hero'}
        </button>
      </div>
    </div>
  )
}