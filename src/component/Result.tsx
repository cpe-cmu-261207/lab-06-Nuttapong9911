import { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from 'react-router-dom'

type AllPrice = {
    bpi: Record<string,number>
    disclaimer: string
    time: {
        updated: string
        updatedISO: string
    }
}


const Result = () => {

    const [allPrice, setAllPrice] = useState<AllPrice | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [first, setFirst] = useState<string | null>(null);
    const [last, setLast] = useState<string | null>(null);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    
    useEffect(() => {
        setFirst(query.get("start"))
        setLast(query.get("end"))
        setLoading(true)
        axios.get<AllPrice | null>(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=${query.get("start")}&end=${query.get("end")}`)
            .then(resp => {
                setLoading(false)
                setAllPrice(resp.data)
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    },[])

    const render = () => {
        if(loading)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-center text-2xl'>Loading ...</p>
                </div>   
            )
        else if(error)
            return (
                <div className='text-center space-y-3'>
                    <p className='text-2xl font-semibold'>Historical price</p>
                    <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
                </div>    
            )
        else if(allPrice)
            return (
                <div>
                    {/* template for /history/result */}
                    <div className='text-center space-y-3'>
                        <p className='text-2xl font-semibold'>Historical price</p>
                        <p className='text-xl font-semibold'> ( From {first} To {last})</p>
                        <ul>
                        {Object.entries(allPrice?.bpi).map(x => (
                            <li className='text-xl'>{x[0]} - {x[1].toLocaleString()} THB</li>
                        ))}
                        </ul>
                    </div>

                    <br />
                </div>
            )
    }

    return (
        <div>
            {render()}
        </div>
    )
}

export default Result