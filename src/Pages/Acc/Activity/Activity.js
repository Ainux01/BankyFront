import React, { useState, useEffect } from "react";
import activity from "./activity.module.css";
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  Bar,
  Line,
  LineChart,
} from "recharts";
import { type } from "@testing-library/user-event/dist/type";

const Activity = ({ numero, solde, showSidebar }) => {
  console.log(numero, solde);
  const [operations, setOperations] = useState([]);
  const [virements, setVirements] = useState([]);
  const [soldes, setSoldes] = useState([]);
  const [totalOps, setTotalOps] = useState([]);

  const getOperations = async (numero) => {
    const response = await fetch(
      `https://banky01.herokuapp.com/compte/getOperations/${numero}`
    );
    const data = await response.json();
    setOperations(data);
  };
  const getSoldes = async (numero) => {
    const response = await fetch(
      `https://banky01.herokuapp.com/compte/getSoldes/${numero}`
    );
    const data = await response.json();
    const sortedData = data?.sort(
      (objA, objB) => Number(new Date(objA.date)) - Number(new Date(objB.date))
    );
    console.log(sortedData);
    // const newData =
    //   new Date(sortedData[sortedData.length - 1].date) === new Date()
    //     ? sortedData
    //     : sortedData.push({
    //         id: new Date().valueOf(),
    //         date: new Date().toLocaleDateString("sv"),
    //         solde: solde,
    //       });
    if (
      sortedData[sortedData?.length - 1].date !==
      new Date().toLocaleDateString("sv")
    ) {
      sortedData.push({
        id: new Date().valueOf(),
        date: new Date().toLocaleDateString("sv"),
        solde: solde,
      });
    }
    console.log(sortedData);
    setSoldes(sortedData);
  };
  const getVirements = async () => {
    const response = await fetch(
      `https://banky01.herokuapp.com/compte/getVirements`
    );
    const data = await response.json();
    setVirements(data);
  };

  useEffect(() => {
    getOperations(numero);
    getVirements();
    getSoldes(numero);
  }, [numero, solde]);
  useEffect(() => {
    console.log(operations, soldes, virements);
    if (operations.length || soldes.length || virements.length) {
      const Ops = [...operations, ...virements];
      console.log(Ops);
      console.log(Ops);
      const sortedDesc = Ops?.sort(
        (objA, objB) =>
          Number(new Date(objA.date)) - Number(new Date(objB.date))
      );
      console.log(sortedDesc);
      const newOps = sortedDesc
        .map((operation) => {
          const { id, type, montant, date, debiteur, recepteur } = operation;
          if (type) {
            operation.Montant = type === "DEPOSIT" ? montant : -montant;
            return operation;
          } else {
            if (numero === debiteur) {
              operation.NMontant = -montant;
              operation.type = "Virement envoyé";
              return operation;
            }
            if (numero === recepteur) {
              operation.NMontant = montant;
              operation.type = "Virement reçu";
              return operation;
            }
          }
          return null;
        })
        .filter((operation) => operation !== null);
      setTotalOps(newOps);
      console.log("hello");
      console.log(newOps, "Hello");
      // console.log();
    }
  }, [operations, virements, soldes]);
  // const numero = "1234567890";

  return (
    <div className={activity.activity}>
      <section>
        <div className="align_center">
          <h2
            className={activity.heading_secondary}
            style={{ color: "#413ea0" }}
          >
            Chart of banking operations carried out
          </h2>
        </div>
        <ComposedChart
          width={!showSidebar ? 1000 : 800}
          height={!showSidebar ? 600 : 500}
          data={totalOps}
          style={{ margin: "auto" }}
        >
          <XAxis dataKey="date" />
          <YAxis name="Operation en MAD" />
          <Tooltip isAnimationActive={true} />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="NMontant"
            fill="#8884d8"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Bar dataKey="NMontant" barSize={20} fill="#413ea0" />
          {/* <Line type="monotone" dataKey="newMontant" stroke="#ff7300" /> */}
        </ComposedChart>

        <div className="align_center">
          <h2
            className={activity.heading_secondary}
            style={{ color: "#82ca9d" }}
          >
            Balance Changes
          </h2>
        </div>

        <LineChart
          width={!showSidebar ? 1000 : 800}
          height={!showSidebar ? 600 : 500}
          data={soldes}
          style={{ margin: "auto" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="solde"
            stroke="#82ca9d"
            strokeWidth={2}
            animationBegin={true}
            // style={{ fontWeight: "bolder", fontSize: "50px", width: "8px" }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </section>
    </div>
  );
};
export default Activity;
