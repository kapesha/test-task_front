import apiClient from "../../utils/fetchHeroes";
import { CloseSVG } from "../SVGs/CloseSVG"
import { useState, Dispatch, SetStateAction, useEffect, } from 'react';
import classNames from 'classnames';
import { FileInput } from "../FileInput/FileInput";


type Props = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setUpdateflag: Dispatch<SetStateAction<boolean>>;
  updateFlag: boolean;
}

export const AddNew: React.FC<Props> = ({ setOpenModal, setUpdateflag, updateFlag }) => {
  const [nickname, setNickname] = useState<string>('');
  const [realName, setRealName] = useState<string>('');
  const [originDescription, setOriginDescription] = useState<string>('');
  const [superpowers, setSuperpowers] = useState<string>('');
  const [catchPhrase, setCatchPhrase] = useState<string>('');
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false)
      }, 5000)
    }
  }, [errorMessage]);

  const deleteFiles = (i: number) => {
    const newFiles = files.filter((_, index) => index !== i);

    setFiles(newFiles);
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (!nickname || !realName || !originDescription || !superpowers || !catchPhrase || files.length === 0) {
      setErrorMessage(true)
      return
    }
    formData.append('nickname', nickname);
    formData.append('realName', realName);
    formData.append('originDescription', originDescription);
    formData.append('superpowers', superpowers);
    formData.append('catchPhrase', catchPhrase);
    files.forEach(file => formData.append('files', file));

    apiClient.post('http://localhost:3000/superheroes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        setUpdateflag(!updateFlag)
      })
      .catch(error => console.log(error))
      .finally(() => {
        setOpenModal(false);
        setNickname('');
        setRealName('');
        setOriginDescription('');
        setSuperpowers('');
        setCatchPhrase('');
        setFiles([]);
      })
  }

  return (
    <div className="addnew">
      <div className="addnew__header">
        <h4 className="addnew__title">Add new Hero</h4>
        <CloseSVG onClick={() => setOpenModal(false)} className="addnew__close" />
      </div>
      <div className="addnew__form">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="addnew__input"
          placeholder="nickname"
          type="text"
        />
        <input
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          className="addnew__input"
          placeholder="real_name"
          type="text"
        />
        <textarea
          value={originDescription}
          onChange={(e) => setOriginDescription(e.target.value)}
          className="addnew__input"
          placeholder="origin_description"
        />
        <textarea
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
          className="addnew__input"
          placeholder="superpowers"
        />
        <textarea
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          className="addnew__input"
          placeholder="catch_phrase"
        />

        <FileInput files={files} setFiles={setFiles} />
        <div className="addnew__imgs">
          {files.map((file, i) => (
            <div key={i} className="addnew__img-container">
              <CloseSVG onClick={() => deleteFiles(i)} className="addnew__delete-img" />
              <img
                className="addnew__img"
                src={typeof file === 'string' ? `http://localhost:3000${file}` : URL.createObjectURL(file)}
                alt="#" />
            </div>
          ))}
        </div>

      </div>
      <button onClick={onSubmit} className="addnew__button">Add</button>
      <p className={classNames("addnew__error", {
        isActive: errorMessage
      })}>Please fill all the fields!!!</p>
    </div>

  )
}