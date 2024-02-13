import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    .oi { 
        box-shadow: 0px 0px 7px #c3c1c1;
        height: 86vh;
        width: 25%;
      }

    .divSongs {
    z-index: 1;

    ::-webkit-scrollbar-track {
          
      }
      
    ::-webkit-scrollbar-thumb {
        background-color: #c3c1c1;                
      }
    }

    .title {
        margin: 10px 10px;
        font-size: 40px;
        color: #16171a;   
    }
 
    .top {
        width: 100%;
        box-shadow: 4px 1px 7px #c3c1c1;

        input {
          border: none;
          outline: none;
          background-color: #232429;
          border-radius: 10px; 
          margin: 15px 0px 30px 30px;
          height: 31px;
          width: 40%;
          color: #fff;
          font-size: 18px;
          padding: 5px;
        }
       
    }
      
    @media only screen and (max-width: 820px) {
      .top {
        height: 86vh;
        
        .title {
          margin: 10px 10px;
          text-align: center; 
      }        
      .divSongs {
        width: 100vw;
      }
      input {
        margin-left: 13%;
        width: 250px;
      }
    }
`;

export const Music = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 10px;
`;