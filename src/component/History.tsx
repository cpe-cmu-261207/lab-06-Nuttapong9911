import { useState } from "react"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'


type AllPrice = {
    bpi: Record<string,number>
    disclaimer: string
    time: {
        updated: string
        updatedISO: string
    }
}

const HistoryPage = () => {

    const [allPrice, setAllPrice] = useState<AllPrice | null>(null);
    const [first, setFirst] = useState<string | null>(null);
    const [last, setLast] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
 
    const history = useHistory();

    
    const getResult = () => {
        if(first && last && Date.parse(first) <= Date.parse(last)){
                history.push('/history/result')
                setLoading(true)
                let url= new URL("https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB&start=2021-08-01&end=2021-08-07")
                let params = new URLSearchParams(url.search);
                params.set("start",first)
                params.set("end",last)
                axios.get<AllPrice | null>("https://api.coindesk.com/v1/bpi/historical/close.json?" + params.toString())
                    .then(resp => {
                        setLoading(false)
                        setAllPrice(resp.data)
                    })
                    .catch(err => {
                        setLoading(false)
                        setError(true)
                    })
                
        }else {
            alert("Please select start date and last date correctly!")
        }
    }


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

        <Switch>
            <Route exact path='/history/select'>
                {/* template for /history/select */}
                <div className='text-center space-y-3 space-x-3'>
                    <p className='text-2xl font-semibold'>Select historical range</p>
                    <span>From date</span>
                    <input type='date' onChange={e => setFirst(e.target.value)}></input>
                    <span>To date</span>
                    <input type='date' onChange={e => setLast(e.target.value)}></input>
                    <br />
                    <button onClick={getResult}>Get data</button>
                </div>

                <br />
            </Route>
            <Route exact path='/history/result'>
                {render()}
            </Route>
        </Switch>
            
    )
}

export default HistoryPage




                