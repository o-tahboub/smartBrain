import React from 'react'

const Rank = ({userName, userEntries}) => {
    return (
<div>
    <p className='center text-white text-base'>
        {`${userName}, the number of your entries is`}
    </p>
    <p className='center text-white text-5xl'>
        {userEntries}
    </p>
</div>
    )
}

export default Rank
