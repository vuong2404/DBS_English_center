import styled from "styled-components";

export const BodyContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: auto;
    height: auto;
    padding: 2%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 5px;
    .alert {
        width:30%;
        font-size: 16px;
    }
    .tag{
        padding-bottom: 16px;
        display: flex;
        justify-content: space-between;
        font-size: 35px;
        font-weight: bold;
    }
    .tool{
        display: flex;
        margin: 0px;
        padding-bottom: 16px;
        flex-direction: row;
        justify-content: space-between;
    }
    .list{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: 400px;    
    }
    .paging{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    table {
        border-collapse: collapse;
        text-align: left;
        width: 100%;
    }
    td, th{
        padding: 5px;
    }
    tr {
    border-bottom: 0.1pt solid #F3E5F5;
    }
    tr:hover{
        background-color: #f7f7f7;
    }
    .noti{
        font-size: 22px;
        font-weight: 500;
        text-align: center;
    }
    .icon{
        height: 80px;
        width: 80px;
        color: #e70000;
    }
    .rework{
        text-align: center;
        font-size: 22px;
        font-weight: 400;
        color: #232323;
    }

 `

export const Search = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  input {
      position: relative;
      width: 300px;
      height: 40px;
      font-size: 1rem;
      font-weight: 300;
      line-height: 1;
      color: #495057;
      background-color: #ffffff;
      border: 1px solid #e6ebf5;
      border-radius: 0.3rem 0rem 0rem 0.3rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      outline: none;
  }
  input:hover{
    border: 1px solid #648cdc95
  }
  .search-button {
    position: relative;
    margin-left: -1%;
    width: 40px;
    height: 40px;
    background-color: #0d6efd;
    border: 1px solid #6d8ef0;
    border-radius: 0rem 0.3rem 0.3rem 0rem;
    
  }
  .search-button:hover{
    background-color: #3684fb;

  }
  .search-img{
    width: 40px;
    height: 40px;
    font-weight: 450;
    color: #ffffff;
  }

`   