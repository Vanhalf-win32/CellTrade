import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";


export default function PostFilter({filter, setFilter}) {
    return (
    <div>
        <MyInput
          value={filter.query}
          onChange={ event => setFilter({...filter, query: event.target.value})}
          placeholder='search...'
        />
        <MySelect
          value = {filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue= 'Sorting for'
          options={[
            {value:'title', name:'For name'},
            {value:'body', name:'For content'},
          ]}
        />
    </div>
    );
};
