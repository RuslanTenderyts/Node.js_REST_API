const sortValue = (sort) => {
    const value = sort === 'ascending' ? 1 : -1;
   return value;
};


module.exports = sortValue;