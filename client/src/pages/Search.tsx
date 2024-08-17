const Search = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-evenly gap-5">
      <div className="rounded-lg  border mx-10 md:mx-0 md:block border-slate-300 p-3  h-fit top-10">
        <div className="space-y-5">
          <h1 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:{" "}
          </h1>
          {/* <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilitiesChange}
          />
          <PriceFilter
            selectedPrice={selectePrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          /> */}
        </div>
      </div>

      <div className="flex flex-col h-fit gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
          </span>
          <select
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {/* {hotelData?.data.map((hotel) => (
          <SearchResultsCard key={hotel._id} hotel={hotel} />
        ))} */}
        <hr />
       
      </div>
    </div>
  );
};

export default Search;
