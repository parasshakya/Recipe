import { useEffect, useState } from "react";
import "./SearchBar.css";
import { GetRequest } from "../../../plugins/https";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = async () => {
   try{

    const res = await GetRequest("recipes/search", {
        params: {
            query: input
        }
    });

    setResults(res.data);

   }catch(error){

   }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  useEffect(() => {
    if(input.trim() === ''){
        setInput("");
    }else{
        fetchData();
    }
  }, [input])

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};