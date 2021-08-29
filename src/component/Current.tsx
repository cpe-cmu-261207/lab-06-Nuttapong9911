import { useEffect, useState } from "react"
import axios from "axios"

type CurPrice = {
    time: {
        updated: string;
    }
    bpi: {
        THB: {
        rate_float: number
        }
    }
}

const Current = () => {
    const [curPrice, setCurPrice] = useState<CurPrice | null>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get<CurPrice>(`https://api.coindesk.com/v1/bpi/currentprice/thb.json`)
            .then(resp =>{
                setCurPrice(resp.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    const render = () => {
        if(loading)
            return <p className='text-center text-2xl'>Loading ...</p>
        else 
            return (
                <div>
                    
                    {/* template for /current */}
                    <div className='text-center space-y-3'>
                        <p className='text-2xl font-semibold'>Current price</p>
                        <p className='text-2xl'>{curPrice?.bpi.THB.rate_float.toLocaleString()} THB</p>
                        <p> (Last updated {curPrice?.time.updated}) </p>
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

export default Current