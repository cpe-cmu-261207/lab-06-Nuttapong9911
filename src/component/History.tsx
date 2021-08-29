import { useState } from "react"
import { useHistory } from 'react-router-dom'


const HistoryPage = () => {


    const [first, setFirst] = useState<string | null>(null);
    const [last, setLast] = useState<string | null>(null);

    const history = useHistory();

    const getResult = () => {

        if(first && last && Date.parse(first) <= Date.parse(last)){
                history.push(`/history/result?start=${first}&end=${last}`)
        }else {
            alert("Please select start date and last date correctly!")
        }
    }


    return ( 
            <div>
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
            </div>
    )
}

export default HistoryPage




                