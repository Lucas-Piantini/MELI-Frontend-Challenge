import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../../../stores/SearchStore";

interface Props {
  setIsFocused: (value: boolean) => void;
}

const DropdownHistory = ({ setIsFocused }: Props) => {
  const { search, setQuery, clear, recentSearches } = useSearchStore();
  const navigate = useNavigate();

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    clear();
    search(term);
    navigate(`/products/${term}`);
    setIsFocused(false);
  };

  return (
    <ul
      className="absolute left-0 w-full bg-white border shadow z-10 max-h-64 overflow-y-auto"
      style={{ top: "100%", marginTop: "1px" }}
    >
      {recentSearches.map((item, i) => (
        <li
          key={i}
          onClick={() => handleSelectRecent(item)}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img src="/images/clock.svg" alt="clock" className="w-4 h-4" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default DropdownHistory;
