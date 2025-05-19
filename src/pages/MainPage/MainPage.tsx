import { useEffect, useState } from "react"
import { Superhero } from "../../types/Superhero";
import { Item } from "../../components/Item/Item";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";
import { AddNew } from "../../components/AddNew/AddNew";
import apiClient from "../../utils/fetchHeroes";
import { Loader } from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";


export const MainPage = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number>();
  const [updateFlag, setUpdateflag] = useState<boolean>(true)
  const [searchPapams] = useSearchParams();
  const currentPage = searchPapams.get('page') || '1';

  useEffect(() => {
    setLoading(true)
    apiClient.get("superheroes", {
      params: {
        page: currentPage
      }
    })
      .then((res) => {
        const { content, pagesAmount } = res.data
        setPages(pagesAmount)
        setSuperheroes(content)
      })
      .catch(() => {
        console.log("something went wrong");
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage, updateFlag])

  return (
    <div className="main-page">
      <div className="main-page__title">
        <h1 className="main-page__header">Available Heroes!!!</h1>
        <button onClick={() => setOpenModal(true)} className="main-page__button">Create new</button>
        <ModalWindow openModal={openModal} setOpenModal={setOpenModal} >
          <AddNew updateFlag={updateFlag} setUpdateflag={setUpdateflag} setOpenModal={setOpenModal} />
        </ ModalWindow >
      </div>
      {loading ?
        (
          <Loader />
        ) : (
          superheroes.length !== 0 ? (
            <div className="main-page__content">
              <div className="main-page__list">
                {superheroes.map(superhero => (
                  <Item setLoading={setLoading} updateFlag={updateFlag} setUpdateflag={setUpdateflag} key={superhero.id} superhero={superhero} />
                ))}
              </div>
              <Pagination pages={pages} />
            </div>
          ) : (
            <div>its empty reight now, add them!)</div>
          )
        )}
    </div>
  )
}