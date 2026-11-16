
import React from 'react';

const CategoryDetailsPage = async ({params}) => {
    const {slag} = await params ; 
    console.log(slag); 
    return (
        <div>
            This is categoray
        </div>
    );
};

export default CategoryDetailsPage;