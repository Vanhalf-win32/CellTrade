import React from "react";
import { getPageArray } from "../../../utils/page";


export default function Pagination({totalPage, page, changePage}) {
    
    let pagesArray = getPageArray(totalPage);
    return (
        <div className='page__wrapper'>
            {pagesArray.map( p => 
            <span
                onClick={() => changePage(p)}  
                key={p} 
                className={page === p ? 'page page__current': 'page' }>
                {p}
                </span>
            )}
        </div>
    )
}