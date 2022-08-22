import React from "react";
import history from "./history.module.css";
import { Link as LinkR } from "react-router-dom";
import { TbDeviceAnalytics } from "react-icons/tb";
const History = ({ operations, virements, numero }) => {
  const getClient = (numero) => {
    return numero;
  };
  console.log(virements);
  if (operations?.length || virements?.length) {
    const totalOps = [...operations, ...virements];
    const sortedAsc = totalOps?.sort((objA, objB) => {
      if (objB.date !== objA.date) {
        return Number(new Date(objB.date)) - Number(new Date(objA.date));
      } else {
        return objB.montant - objA.montant;
      }
    });
    console.log(sortedAsc);
    return (
      <>
        <div>
          <div className={history.movements}>
            {totalOps.map((operation, index) => {
              const { id, type, montant, date, debiteur, recepteur } =
                operation;
              return (
                <div className={history.row} key={index}>
                  {type && (
                    <div
                      className={`${history.type} ${
                        type === "DEPOSIT"
                          ? history.deposit
                          : history.withdrawal
                      }`}
                    >
                      {`${index + 1} ${type}`}
                    </div>
                  )}
                  {!type && (
                    <div
                      className={`${history.type} ${
                        numero === recepteur
                          ? history.deposit
                          : history.withdrawal
                      }`}
                    >
                      {`${index + 1} Payment ${
                        numero === recepteur
                          ? `from ${getClient(debiteur)}`
                          : `to ${getClient(recepteur)}`
                      }`}
                    </div>
                  )}
                  <div className={`${history.date}`}>{date}</div>
                  <div className={`${history.value}`}>{montant} MAD</div>
                </div>
              );
            })}
          </div>
          <div className="align_center">
            <LinkR to={"/accueil/activity"} className={history.btn}>
              <TbDeviceAnalytics style={{ paddingRight: "18px" }} />
              More Infos
            </LinkR>
          </div>
        </div>
      </>
    );
  }
};

export default History;
