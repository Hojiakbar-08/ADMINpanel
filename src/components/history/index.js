import { Input, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getUserHistory } from "../../redux/reducer/history";
import { useDispatch, useSelector } from "react-redux";
import { Block } from "./style";


function History() {
  const [state, setstate] = useState(0);
  const dispatch = useDispatch();
  const {history} = useSelector(state => state.history)

  useEffect(() => {
    dispatch(getUserHistory());
  }, [])

  console.log(history);
  function show(number) {
    setstate(number);
  };
  

  return (
    <Block>
      <div className="line">
        <h2>History</h2>
        <Input type={"date"} />
      </div>
       <div className="cards">
        {history.map((item,index)=>
            <div className="card">
              <div className="nav">
                <i className="bi bi-cart-check"></i>
                <br />
                <div className="times">
                  <div className="date"><i className="bi bi-calendar-date"> </i> {item.date} </div>
                  <div className="time"><i className="bi bi-clock"></i>{item?.hour}</div>
                </div>
              </div>
              <div className="tab">
                <table className="table table">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>amount</th>
                      <th>price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {item.product.map((e,i)=> <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.amount}</td>
                    <td>{e.price}</td>
                    
                  </tr>)}
                     
                  </tbody>
                </table>
              <div className="Jami">
                 <div>Count: {item.count}</div>
                 <div>Total: ${item.total}</div>
              
                  
              </div>
              </div>
            </div>
      )}</div>
      
      <Pagination
        defaultCurrent={1}
        total={1}
        onChange={(e) => show(e)}
      />
    </Block>
  );
}

export default History;
