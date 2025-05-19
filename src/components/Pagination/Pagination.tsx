import { useSearchParams } from "react-router-dom";
import { Arrow } from "../SVGs/Arrow"

type Props = {
  pages: number | undefined;
}

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [searchPapams, setSearchPapams] = useSearchParams()
  const currentPage = searchPapams.get('page') || '1'

  return (
    <div className="pagination">
      <button
        disabled={+currentPage === 1}
        className="pagination__button"
        onClick={() => setSearchPapams({ page: `${+currentPage - 1}` })}
      >
        <Arrow className="pagination__arrow left" />
      </button>

      {[...Array(pages)].map((_, i) => (
        <div
          className="pagination__button"
          key={i}
          onClick={() => setSearchPapams({ page: `${i + 1}` })}
        >
          {i + 1}
        </div>
      ))}
      <button
        disabled={+currentPage === pages}
        onClick={() => setSearchPapams({ page: `${+currentPage + 1}` })}
        className="pagination__button"
      >
        <Arrow className="pagination__arrow right" />
      </button>

    </div>
  )
}