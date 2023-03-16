
import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import {deleteBasket, basketAmount, removeBasket } from "../../redux/reducer/orders";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Box} from "./basket.Style"
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";



function Basket () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/orders')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { basket } = useSelector((state) => state.orders);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const subTotal = basket.reduce((a, b) => {
    a += b.price * b.amount;
    return a;
  }, 0);
  const tax = (subTotal / 100) * 18;
  const basketremove = id => {
    dispatch(deleteBasket(id))  
   }
  console.log(basket);
  

  function Submit() {
    if (!basket.length) {
      return alert("Ichi bo'sh,ichini to'ldiring.")
    }
    axios.post("http://localhost:8080/history", {
      total: basket.reduce((acc, curr) => acc += (curr.price * curr.amount), tax),
      count: basket.reduce((acc, curr) => acc += curr.amount, 0),
      product: basket,
      date: moment().format('L'),
      hour: moment().format('LT')
    }).then((res)=>{
      console.log(res);
      setIsModalOpen(true)
      dispatch(removeBasket())
    })

    
  }
  
return (
    <Box>
      <h1>basket</h1>
      <div className="Our">
          <div className="Box1">
          <table class="table">
        <thead>
          <tr>
            <th>N</th>
            <th>img</th>
            <th>name</th>
            <th>amount</th>
            <th>price</th>
            <th>date</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {basket.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td> <img src={item.img ? item.img : '/img/no_Image.png'} width='90' alt="4"/></td>
              <td>{item.name}</td>
              <td>
                
                <i className="minus" class="bi bi-dash"onClick={() => dispatch(basketAmount({id: item.id, key: false}))} ></i>
                {item.amount}
                <i className="plus" class="bi bi-plus"onClick={() => dispatch(basketAmount({id: item.id, key: true}))} ></i>
               
              </td>
              <td>{item.price}</td>
              <td>{item.date}</td>
              <td className="icon">
              <i class="bi bi-trash-fill"  onClick={()=>basketremove(item.id)}></i >
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
          <div className="Box2">
            <h1 className="totle">Total</h1>
            <h3>Sub Total : $ {subTotal} </h3>
              <h3>Shipping : Shipping</h3>
              <h3>Tax(18%) : $ {parseInt(tax)}</h3>
              <h3>
                Total : <b> $ {parseInt(subTotal + tax)}</b>
              </h3>
              <>
                
                <Modal title="Haridingiz uchun rahmat" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <h1>🛒🛒👍</h1>
                 
                </Modal>
              </>
              
            <button  className="btn1" onClick={() => dispatch(removeBasket())} >All Clear</button>
            <button className="btn2" onClick={Submit}>Check Out</button>
          </div>
      </div>
    </Box>
  );
}

export default Basket;
