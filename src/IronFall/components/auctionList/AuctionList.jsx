import { AuctionCard } from './AuctionCard'

// eslint-disable-next-line react/prop-types
export const AuctionList = ({ auctionList }) => {


  // eslint-disable-next-line react/prop-types
  if (auctionList.length == 0) {
    return (
      <>
        <div >
          <h3 className='text-white text-3xl'>Empty</h3>
        </div>
      </>
    )
  } else {
    return (
      // eslint-disable-next-line react/prop-types
      auctionList.map((item, index) => {
        return (
          <div key={index} className='flex flex-wrap gap-4'>
            <AuctionCard key={index} auction={item} auctionId={item.auctionIndex} />
          </div>
        )
      }
      )
    )
  }
}