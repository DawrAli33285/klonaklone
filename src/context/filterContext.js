import { createContext,useState } from "react";

const FilterContext = createContext();


const FilterContextProvider = ({ children }) => {
    const [filter, setFilter] = useState();
  
    return (
      <FilterContext.Provider value={{ filter, setFilter }}>
        {children}
      </FilterContext.Provider>
    );
  };

  export { FilterContext, FilterContextProvider };