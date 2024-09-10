import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const resetInput = () => {
    if (value !== "") {
      setValue("");
    }
  };
  return (
    <div className="relative w-full">
      <input
        onChange={(e) => setValue(e.currentTarget.value)}
        value={value}
        className="w-full p-2 pl-10 bg-transparent border border-border rounded-2xl focus:border-accent outline-none peer transition-colors"
        placeholder="Search"
        name="search"
        type="text"
      />
      <IconSearch
        className="peer-focus:text-accent text-slate-400 absolute top-1/2 -translate-y-1/2 left-2 transition-colors"
        size={"1.5rem"}
      />
      {value && (
        <Button
          variant={"ghost"}
          className="p-0 absolute top-1/2 -translate-y-1/2 right-2"
          onClick={resetInput}
        >
          <IconX />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
