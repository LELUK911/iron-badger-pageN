import { NumConvBig } from "./helper";

export const filterAuctionList = (auctionList, filter, advFilter = null, upward = true) => {





    
   
    if (filter.srcAuctionID && filter.srcAuctionID > auctionList.length) {
        return [];
    }

 
    let filteredList = auctionList;


    if (!advFilter || Object.keys(advFilter).length === 0) {
        filteredList = auctionList.filter((item, _index) => {
            if (filter.srcAuctionId !== undefined && filter.srcAuctionId !== null && !isNaN(filter.srcAuctionId) && _index !== filter.srcAuctionId) {
                return false;
            }
            if (filter.srcPactId && +(item[1].toString()) !== filter.srcPactId) return false;
            return true;
        });
    } else {

        filteredList = auctionList.filter((item, _index) => {
            // Auction Index
            if (filter.srcAuctionId !== undefined && filter.srcAuctionId !== null && !isNaN(filter.srcAuctionId) && _index !== filter.srcAuctionId) {
                return false;
            }
            // Pact ID
            if (filter.srcPactId && +(item[1].toString()) !== filter.srcPactId) return false;
            // Status

            const auctionStatus = advFilter.auctionStatus === "true"
                ? true
                : advFilter.auctionStatus === "false"
                    ? false
                    : undefined;
            if (auctionStatus !== undefined && auctionStatus !== item.open) {
                return false
            };
            // Floor Price
            if (advFilter.floorPriceLow &&  item[3] < NumConvBig(advFilter.floorPriceLow)) return false;
            if (advFilter.floorPriceHigh && item[3] > NumConvBig(advFilter.floorPriceHigh)) return false;
            // Instalment Price
            if (advFilter.instalmentPriceLow &&  item[5] < NumConvBig(advFilter.instalmentPriceLow)) return false;
            if (advFilter.instalmentPriceHigh && item[5] > NumConvBig(advFilter.instalmentPriceHigh)) return false;
            // Drop Tolerance (solo per non-upward)
            if (!upward) {
                if (advFilter.dropToleranceLow &&  +item[8].toString() < advFilter.dropToleranceLow) return false;
                if (advFilter.dropToleranceHigh && +item[8].toString() > advFilter.dropToleranceHigh) return false;
            }
            // Amount
            if (advFilter.amountLow &&  +item[2].toString() < advFilter.amountLow) return false;
            if (advFilter.amountHigh && +item[2].toString() > advFilter.amountHigh) return false;
            // Player Address
            if (advFilter.playerAddress !== '0x' && advFilter.playerAddress && advFilter.playerAddress !== item[6]) return false;

            // Date Start
            if (advFilter.dateStart) {
                const dateStartTimestamp = new Date(advFilter.dateStart).getTime();
                const dateSearchInSeconds = Math.floor(dateStartTimestamp / 1000);
                if (!isNaN(dateSearchInSeconds) && +item[4].toString() < dateSearchInSeconds) return false;
            }

            // Date End
            if (advFilter.dateEnd) {
                const dateEndTimestamp = new Date(advFilter.dateEnd).getTime();
                const dateSearchInSeconds = Math.floor(dateEndTimestamp / 1000);
                if (!isNaN(dateSearchInSeconds) && +item[4].toString() > dateSearchInSeconds) return false;
            }
            
            return true;
        });
    }
    return filteredList;

};
