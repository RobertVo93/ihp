import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CreateNewPowerpoint,
  addEmptySlide,
  exportPowerpoint,
  addTitleSlide,
  add2RowsTablePieChart,
  add1Table1PieChart,
  add1Table,
  add2TablesSide,
  add2RowsBarChart
} from "util/pptslidegenerator";
import ReportActions from "redux/reports/actions";
import UtilitiesActions from "redux/utilities/actions";
import { calculatePercentage } from "util/constant_methods";
import SweetAlert from "react-bootstrap-sweetalert";
const {
  getHeadcount,
  getS3OverviewCosts,
  getS4IPTopDiagnosis,
  getS5OPStats,
  getS7ChronicStats,
  getS8ChronicIllness,
  getS11IPTable,
  getS12IPTopDiagnosis,
  getS13IPTopProviders,
  getS14IPTopClaimants,
  getS16OPSPTable,
  getS17OPSPEntity,
  getS18OPSPTopDiagnosis,
  getS19OPSPTopProviders,
  getS20OPSPTopClaimants,
  getS22OPGPTable,
  getS23OPGPEntity,
  getS24OPGPTopDiagnosis,
  getS25OPGPTopProviders,
  getS26OPGPTopClaimants,
  getS27OPGPUtilization,
  getS28OPSPUtilization,
  getS29Chronicdemo,
  getS30PanelGpEntity,
  getS31PanelGpRelationship,
  nullifyReports
} = ReportActions;

const { updateLoading } = UtilitiesActions;

const DefaultTemplateGeneration = props => {
  //call apis
  const [incomingData, setIncData] = useState([]);
  const [selectedPolicies, setSelectedPolicies] = useState("");
  const [presentationTitle, setPTitle] = useState("");
  const [presentationSubtitle, setPSubtitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Generation Successful!"
  );
  const [showSM, setShowSM] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const formatDate = date => {
    const time = new Date(date);
    return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
  };

  useEffect(() => {
    props.nullifyReports();
    //update the data
    setDateTo(formatDate(props.dateTo));
    setDateFrom(formatDate(props.dateFrom));

    if (props.policiesAttached == null || props.policiesAttached.length < 0)
      return;
    let sP = "(";

    for (var i = 0; i < props.policiesAttached.length; i++) {
      sP = sP + "'" + props.policiesAttached[i].value + "',";
    }
    sP = sP.replace(/,\s*$/, "");
    sP = sP + ")";
    setSelectedPolicies(sP);
    if (props.pTitle != null && props.pTitle != "") {
      setPTitle(props.pTitle);
    }
    if (props.pSubtitle != null && props.pSubtitle != "") {
      setPSubtitle(props.pSubtitle);
    }
  }, [props.policiesAttached, props.pTitle, props.pSubtitle]);

  useEffect(() => {
    if (selectedPolicies == null || selectedPolicies.length == "") return;
    //call all the policies
    props.getHeadcount(props.authData, selectedPolicies);
    setShowSM(false);
    props.updateLoading(true);
  }, [selectedPolicies]);

  useEffect(() => {
    if (
      props.reportsData.policiesHeadcount == null ||
      props.reportsData.policiesHeadcount.length == 0
    )
      return;
    //call all the APIs

    props.getS3OverviewCosts(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS4IPTopDiagnosis(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS5OPStats(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS7ChronicStats(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS8ChronicIllness(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS11IPTable(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS12IPTopDiagnosis(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS13IPTopProviders(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS14IPTopClaimants(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS22OPGPTable(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS23OPGPEntity(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS24OPGPTopDiagnosis(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS25OPGPTopProviders(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS26OPGPTopClaimants(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS27OPGPUtilization(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS28OPSPUtilization(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS29Chronicdemo(props.authData, selectedPolicies, dateTo, dateFrom);
    props.getS30PanelGpEntity(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
    props.getS31PanelGpRelationship(
      props.authData,
      selectedPolicies,
      dateTo,
      dateFrom
    );
  }, [props.reportsData.policiesHeadcount]);

  useEffect(() => {
    //alert(selectedPolicies);
    if (!generating && checkDataLoaded()) {
      generatePPT();
    }
  }, [
    props.reportsData.S3OverviewCosts,
    props.reportsData.S4IPTopDiagnosis,
    props.reportsData.S5OPStats,
    props.reportsData.S7ChronicStats,
    props.reportsData.S8ChronicIllness,
    props.reportsData.S11IPTable,
    props.reportsData.S12IPTopDiagnosis,
    props.reportsData.S13IPTopProviders,
    props.reportsData.S14IPTopClaimants,
    props.reportsData.S22OPGPTable,
    props.reportsData.S23OPGPEntity,
    props.reportsData.S24OPGPTopDiagnosis,
    props.reportsData.S25OPGPTopProviders,
    props.reportsData.S26OPGPTopClaimants,
    props.reportsData.S27OPGPUtilization,
    props.reportsData.S28OPSPUtilization,
    props.reportsData.S29Chronicdemo,
    props.reportsData.S30PanelPgEntity
  ]);

  //generate ppl when all comes
  const generatePPT = () => {
    //alert("Generating powerpoint!");

    let ppt = CreateNewPowerpoint(props.pTitle, props.pSubtitle);
    ppt = addTitleSlide(ppt, props.pTitle, props.pSubtitle);
    if (props.reportsData.S3OverviewCosts != null) {
      //[0] GHS, [1] SP, [2] GP, [3] NON PANEL, [4] Non Panel Relationship, [5] Panel Relationship
      let customColWidth = [0.5, 3.0, 2.0, 2.0];
      let header1 = "Total Claim Costs by Type";
      let tableData1 = [
        ["No", "Claim Type", "Total Claim Costs", "Claim Percentage"]
        //["1","GHS (IP)","$120,000", "40%"],
        //["2","Panel GP","$20,000", "20%"],
        //["3","Panel SP","$25,000", "25%"],
        //["4","Other Non Panel","$40,000", "15%"],
      ];
      let labels1 = ["GHS", "Panel GP", "Panel SP", "Non Panel"];
      let PCData1 = [];
      let totalCosts = 0;
      if (props.reportsData.S3OverviewCosts[0].length == 0) {
        tableData1.push(["1", "GHS (IP)", "$0", "0%"]);
        PCData1.push(0);
      } else {
        tableData1.push([
          "1",
          "GHS (IP)",
          "$" +
            (props.reportsData.S3OverviewCosts[0][0].SClaims
              ? props.reportsData.S3OverviewCosts[0][0].SClaims
              : 0
            ).toLocaleString(),
          "0%"
        ]);
        PCData1.push(props.reportsData.S3OverviewCosts[0][0].SClaims);
        totalCosts += props.reportsData.S3OverviewCosts[0][0].SClaims;
      }
      if (props.reportsData.S3OverviewCosts[1].length == 0) {
        tableData1.push(["2", "Panel SP", "$0", "0%"]);
        PCData1.push(0);
      } else {
        tableData1.push([
          "2",
          "Panel SP",
          "$" +
            (props.reportsData.S3OverviewCosts[1][0].SClaims
              ? props.reportsData.S3OverviewCosts[1][0].SClaims
              : 0
            ).toLocaleString(),
          "0%"
        ]);
        PCData1.push(props.reportsData.S3OverviewCosts[1][0].SClaims);
        totalCosts += props.reportsData.S3OverviewCosts[1][0].SClaims;
      }
      if (props.reportsData.S3OverviewCosts[1].length == 0) {
        tableData1.push(["3", "Panel GP", "$0", "0%"]);
        PCData1.push(0);
      } else {
        tableData1.push([
          "3",
          "Panel GP",
          "$" +
            (props.reportsData.S3OverviewCosts[2][0].SClaims
              ? props.reportsData.S3OverviewCosts[2][0].SClaims
              : 0
            ).toLocaleString(),
          "0%"
        ]);
        PCData1.push(props.reportsData.S3OverviewCosts[2][0].SClaims);
        totalCosts += props.reportsData.S3OverviewCosts[2][0].SClaims;
      }
      if (props.reportsData.S3OverviewCosts[1].length == 0) {
        tableData1.push(["4", "Non Panel Claims", "$0", "0%"]);
        PCData1.push(0);
      } else {
        tableData1.push([
          "4",
          "Non Panel Claims",
          "$" +
            (props.reportsData.S3OverviewCosts[3][0].SClaims
              ? props.reportsData.S3OverviewCosts[3][0].SClaims
              : 0
            ).toLocaleString(),
          "0%"
        ]);
        PCData1.push(props.reportsData.S3OverviewCosts[3][0].SClaims);
        totalCosts += props.reportsData.S3OverviewCosts[3][0].SClaims;
      }

      //set percentage
      tableData1[1][3] = calculatePercentage(
        props.reportsData.S3OverviewCosts[0].length != 0
          ? props.reportsData.S3OverviewCosts[0][0].SClaims
          : 0,
        totalCosts
      );
      tableData1[2][3] = calculatePercentage(
        props.reportsData.S3OverviewCosts[1].length != 0
          ? props.reportsData.S3OverviewCosts[1][0].SClaims
          : 0,
        totalCosts
      );
      tableData1[3][3] = calculatePercentage(
        props.reportsData.S3OverviewCosts[2].length != 0
          ? props.reportsData.S3OverviewCosts[2][0].SClaims
          : 0,
        totalCosts
      );
      tableData1[4][3] = calculatePercentage(
        props.reportsData.S3OverviewCosts[3].length != 0
          ? props.reportsData.S3OverviewCosts[3][0].SClaims
          : 0,
        totalCosts
      );

      let header2 = "Cost Distribution by Relationship";
      let tableData2 = [
        ["No", "Relationships", "Total Claim Costs", "Claim Percentage"]
        //["1","Employee","$120,000", "40%"],
        //["2","Spouse","$20,000", "20%"],
        //["3","Child","$25,000", "25%"]
      ];
      let totalCostsRel = 0;
      let totalEmp = 0;
      let totalSpouse = 0;
      let totalChild = 0;
      if (props.reportsData.S3OverviewCosts[4].length != 0) {
        for (var i = 0; i < props.reportsData.S3OverviewCosts[4].length; i++) {
          totalCostsRel += props.reportsData.S3OverviewCosts[4][i].SClaims
            ? props.reportsData.S3OverviewCosts[4][i].SClaims
            : 0;
          switch (props.reportsData.S3OverviewCosts[4][i].Relation) {
            case "E0":
              totalEmp += props.reportsData.S3OverviewCosts[4][i].SClaims
                ? props.reportsData.S3OverviewCosts[4][i].SClaims
                : 0;
              break;
            case "S":
              totalSpouse += props.reportsData.S3OverviewCosts[4][i].SClaims
                ? props.reportsData.S3OverviewCosts[4][i].SClaims
                : 0;
              break;
            case "C":
              totalChild += props.reportsData.S3OverviewCosts[4][i].SClaims
                ? props.reportsData.S3OverviewCosts[4][i].SClaims
                : 0;
              break;
          }
        }
      }
      if (props.reportsData.S3OverviewCosts[5].length != 0) {
        for (var i = 0; i < props.reportsData.S3OverviewCosts[5].length; i++) {
          totalCostsRel += props.reportsData.S3OverviewCosts[5][i].SClaims
            ? props.reportsData.S3OverviewCosts[5][i].SClaims
            : 0;
          switch (props.reportsData.S3OverviewCosts[5][i].Relation) {
            case "E0":
              totalEmp += props.reportsData.S3OverviewCosts[5][i].SClaims
                ? props.reportsData.S3OverviewCosts[5][i].SClaims
                : 0;
              break;
            case "S":
              totalSpouse += props.reportsData.S3OverviewCosts[5][i].SClaims
                ? props.reportsData.S3OverviewCosts[5][i].SClaims
                : 0;
              break;
            case "C":
              totalChild += props.reportsData.S3OverviewCosts[5][i].SClaims
                ? props.reportsData.S3OverviewCosts[5][i].SClaims
                : 0;
              break;
          }
        }
      }

      let labels2 = ["Employee", "Spouse", "Child"];
      let PCData2 = [];

      tableData2.push([
        "1",
        "Employee",
        "$" + totalEmp.toLocaleString(),
        calculatePercentage(totalEmp, totalCostsRel)
      ]);
      tableData2.push([
        "2",
        "Spouse",
        "$" + totalSpouse.toLocaleString(),
        calculatePercentage(totalSpouse, totalCostsRel)
      ]);
      tableData2.push([
        "3",
        "Child",
        "$" + totalChild.toLocaleString(),
        calculatePercentage(totalChild, totalCostsRel)
      ]);
      PCData2.push(totalEmp);
      PCData2.push(totalSpouse);
      PCData2.push(totalChild);

      let pieChartData1 = [
        { name: "Claim Type", labels: labels1, values: PCData1 }
      ];
      let pieChartData2 = [
        { name: "Relationship Type", labels: labels2, values: PCData2 }
      ];

      ppt = add2RowsTablePieChart(
        ppt,
        customColWidth,
        "Snapshot of Total Utilization",
        header1,
        tableData1,
        pieChartData1,
        header2,
        tableData2,
        pieChartData2
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S4IPTopDiagnosis != null &&
      props.reportsData.S4IPTopDiagnosis[0].length > 0
    ) {
      //create slide 4 template
      let S4customColWidth = [0.5, 2.5, 1.5, 1.5, 1.5, 1.5, 1.0];
      let S4title1 = "Snapshot of Inpatient Utilization (Diagnosis)";
      let S4header1 = "Top 10 Diagnosis (Inpatient)";
      let S4tableData1 = [
        [
          "No",
          "Diagnosis Group",
          "Amount Paid",
          "No of Cases",
          "Claimant",
          "Avg Cost",
          "%"
        ]
        //["1","GHS (IP)","$120,000", "40%"],
        //["2","Panel GP","$20,000", "20%"],
        //["3","Panel SP","$25,000", "25%"],
        //["4","Other Non Panel","$40,000", "15%"],
      ];
      let totalCostsS4 = 0;
      for (var i = 0; i < props.reportsData.S4IPTopDiagnosis[0].length; i++) {
        totalCostsS4 += props.reportsData.S4IPTopDiagnosis[0][i].SClaims
          ? props.reportsData.S4IPTopDiagnosis[0][i].SClaims
          : 0;
        S4tableData1.push([
          (i + 1).toString(),
          props.reportsData.S4IPTopDiagnosis[0][i].Diagnosis,
          "$" +
            (props.reportsData.S4IPTopDiagnosis[0][i].SClaims
              ? props.reportsData.S4IPTopDiagnosis[0][i].SClaims
              : 0
            ).toLocaleString(),
          props.reportsData.S4IPTopDiagnosis[0][i].SCount,
          props.reportsData.S4IPTopDiagnosis[0][i].HC,
          props.reportsData.S4IPTopDiagnosis[0][i].AClaims,
          "0%"
        ]);
      }
      for (var i = 0; i < props.reportsData.S4IPTopDiagnosis[0].length; i++) {
        S4tableData1[i + 1][6] = calculatePercentage(
          props.reportsData.S4IPTopDiagnosis[0][i].SClaims
            ? props.reportsData.S4IPTopDiagnosis[0][i].SClaims
            : 0,
          totalCostsS4
        );
      }
      ppt = add1Table(ppt, S4customColWidth, S4title1, S4header1, S4tableData1);
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    //create slide 5 template
    if (
      props.reportsData.S27OPGPUtilization != null &&
      props.reportsData.S27OPGPUtilization[0].length > 0
    ) {
      let S5customColWidth = [0.5, 2.0, 1.5, 1.5];
      let S5title1 = "Snapshot of Outpatient Utilization (GP/SP) [Sample]";
      let S5header1 = "Panel GP";

      let filterChronic = props.reportsData.S27OPGPUtilization[0].filter(
        val => val.Classification === "Chronic"
      );
      let filterAcute = props.reportsData.S27OPGPUtilization[0].filter(
        val => val.Classification === "Acute"
      );

        let amountc = filterChronic.length
        ? (filterChronic[0].Sclaims /
            (filterChronic[0]?.Sclaims || 0 + filterAcute[0]?.Sclaims || 0)) *
        100
        : 0;
        let amounta = filterAcute.length
        ? (filterAcute[0].Sclaims /
            (filterChronic[0]?.Sclaims || 0 + filterAcute[0]?.Sclaims || 0)) *
            100
        : 0;

        let costc = filterChronic.length ? filterChronic[0].AClaims : 0;
        let costa = filterAcute.length ? filterAcute[0].AClaims : 0;
      let S5tableData1 = [
        ["No", "Metric", "Chronic", "Acute"],
        ["1", "Case", filterChronic[0]?.Cases || 0, filterAcute[0]?.Cases || 0],
        [
          "2",
          "Total Claimant",
          filterChronic[0]?.Cases || 0,
          filterAcute[0]?.Cases || 0
        ],
        [
          "3",
          "Claimant (Emp)",
          filterChronic[0]?.Emp || 0,
          filterAcute[0]?.Emp || 0
        ],
        [
          "4",
          "Claimant (Dep)",
          filterChronic[0]?.Dep || 0,
          filterAcute[0]?.Dep || 0
        ],
        [
            "5",
            "Amount",
            `(${amountc.toFixed(1)}%) $${filterChronic[0]?.Sclaims || 0}`,
            `(${amounta.toFixed(1)}%) $${filterAcute[0]?.Sclaims || 0}`
          ],
        ["6", "Avg Cost", "$" + costc, "$" + costa]
      ];

      let filterChronic_sp = props.reportsData.S28OPSPUtilization[0].filter(
        val => val.Classification === "Chronic"
      );
      let filterAcute_sp = props.reportsData.S28OPSPUtilization[0].filter(
        val => val.Classification === "Acute"
      );
      let S5header2 = "Panel SP";

      let amount_c = filterChronic_sp.length
        ? (filterChronic_sp[0].Sclaims /
            (filterChronic_sp[0]?.Sclaims || 0 + filterAcute_sp[0]?.Sclaims || 0)) *
          100
        : 0;
      let amount_a = filterAcute_sp.length
        ? (filterAcute_sp[0].Sclaims /
            (filterChronic_sp[0]?.Sclaims || 0 + filterAcute_sp[0]?.Sclaims || 0)) *
          100
        : 0;

      let cost_c = filterChronic_sp.length ? filterChronic_sp[0].AClaims : 0;
      let cost_a = filterAcute_sp.length ? filterAcute_sp[0].AClaims : 0;
      let S5tableData2 = [
        ["No", "Metric", "Chronic", "Acute"],
        [
          "1",
          "Case",
          filterChronic_sp[0]?.Cases || 0,
          filterAcute_sp[0]?.Cases || 0
        ],
        [
          "2",
          "Total Claimant",
          filterChronic_sp[0]?.Cases || 0,
          filterAcute_sp[0]?.Cases || 0
        ],
        [
          "3",
          "Claimant (Emp)",
          filterChronic_sp[0]?.Emp || 0,
          filterAcute_sp[0]?.Emp || 0
        ],
        [
          "4",
          "Claimant (Dep)",
          filterChronic_sp[0]?.Dep || 0,
          filterAcute_sp[0]?.Dep || 0
        ],
        [
          "5",
          "Amount",
          `(${amount_c.toFixed(1)}%) $${filterChronic_sp[0]?.Sclaims || 0}`,
          `(${amount_a.toFixed(1)}%) $${filterAcute_sp[0]?.Sclaims || 0}`
        ],
        ["6", "Avg Cost", "$" + cost_c, "$" + cost_a]
      ];

      ppt = add2TablesSide(
        ppt,
        S5customColWidth,
        S5title1,
        S5header1,
        S5tableData1,
        S5header2,
        S5tableData2
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (props.reportsData.S29Chronicdemo != null) {
      //create slide 8 template
      let S8title1 = "Snapshot of Chronic Demographics [Sample]";
      let S8header1 = "By Age Band";
      let S8LabelData1 = [
        "0-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70 above"
      ];
      let S8Data1 = [];
      // let S8Data1 = [props.reportsData.S29Chronicdemo[0][0], props.reportsData.S29Chronicdemo[0][1], props.reportsData.S29Chronicdemo[0][2], props.reportsData.S29Chronicdemo[0][3], props.reportsData.S29Chronicdemo[0][4], props.reportsData.S29Chronicdemo[0][5], props.reportsData.S29Chronicdemo[0][6]];

      for (let i in props.reportsData.S29Chronicdemo[0][0]) {
        S8Data1.push(props.reportsData.S29Chronicdemo[0][0][i]);
      }
      let S8BarChartData1 = [
        { name: "Unique Claimants", labels: S8LabelData1, values: S8Data1 }
      ];
      let S8header2 = "By Gender";
      let S8LabelData2 = ["Male", "Female"];
      let filterMale = props.reportsData.S29Chronicdemo[2].find(
        val => val.Gender === "M"
      );
      let filterFemale = props.reportsData.S29Chronicdemo[2].find(
        val => val.Gender === "F"
      );
      let S8Data2 = [
        filterMale ? filterMale["HC"] : 0,
        filterFemale ? filterFemale["HC"] : 0
      ];

      let S8BarChartData2 = [
        { name: "Unique Claimants", labels: S8LabelData2, values: S8Data2 }
      ];
      ppt = add2RowsBarChart(
        ppt,
        S8title1,
        S8header1,
        S8BarChartData1,
        S8header2,
        S8BarChartData2
      );
      ppt = addTitleSlide(ppt, "Details Report", "IP,SP & GP");
      ppt = addTitleSlide(ppt, "Inpatient", "Utilization Review");
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S11IPTable != null &&
      props.reportsData.S11IPTable[0].length > 0
    ) {
      //create slide 11 template
      let S11customColWidth = [0.5, 2.5, 1.5, 1.5, 1.5, 1.5];
      let S11title1 = "Snapshot of Inpatient Utilization";
      let S11header1 = "Overview";
      let S11tableData1 = [
        ["No", "Description", "Employee", "Spouse", "Child", "Overall"],
        ["1", "Amount", "$0", "$0", "$0", "$0"],
        ["2", "Case", "-", "-", "-", "-"],
        ["3", "Claimant", "-", "-", "-", "-"],
        ["4", "Average Cost", "-", "-", "-", "-"],
        ["5", "Cost per Member", "-", "-", "-", "-"],
        ["6", "Incidence Rate", "-", "-", "-", "-"]
      ];
      let totalCostsS11 = 0;
      let totalCaseS11 = 0;
      let totalClaimantS11 = 0;

      for (var i = 0; i < props.reportsData.S11IPTable[0].length; i++) {
        totalCostsS11 += props.reportsData.S11IPTable[0][i].SClaims
          ? props.reportsData.S11IPTable[0][i].SClaims
          : 0;
        totalCaseS11 += props.reportsData.S11IPTable[0][i].SCount
          ? props.reportsData.S11IPTable[0][i].SCount
          : 0;
        totalClaimantS11 += props.reportsData.S11IPTable[0][i].UniqueCount
          ? props.reportsData.S11IPTable[0][i].UniqueCount
          : 0;
        //get employee object
        let index = 2;
        switch (props.reportsData.S11IPTable[0][i].Relation) {
          case "E0":
            index = 2;
            break;
          case "S":
            index = 3;
            break;
          case "C":
            index = 4;
            break;
        }
        S11tableData1[1][index] =
          "$" +
          (props.reportsData.S11IPTable[0][i].SClaims
            ? props.reportsData.S11IPTable[0][i].SClaims
            : 0
          ).toLocaleString();
        S11tableData1[2][index] = (props.reportsData.S11IPTable[0][i].SCount
          ? props.reportsData.S11IPTable[0][i].SCount
          : 0
        ).toLocaleString();
        S11tableData1[3][index] = (props.reportsData.S11IPTable[0][i]
          .UniqueCount
          ? props.reportsData.S11IPTable[0][i].UniqueCount
          : 0
        ).toLocaleString();
        S11tableData1[4][index] =
          "$" +
          (props.reportsData.S11IPTable[0][i].AClaims
            ? props.reportsData.S11IPTable[0][i].AClaims
            : 0
          ).toLocaleString();
      }
      S11tableData1[1][5] = "$" + totalCostsS11.toLocaleString();
      S11tableData1[2][5] = totalCaseS11.toLocaleString();
      S11tableData1[3][5] = totalClaimantS11.toLocaleString();
      S11tableData1[4][5] =
        "$" + (totalCostsS11 / totalCaseS11).toLocaleString();
      S11tableData1[5][5] =
        "$" +
        (
          totalCostsS11 / props.reportsData.policiesHeadcount[0][0].ECount
        ).toLocaleString();
      S11tableData1[6][5] = (
        totalClaimantS11 / props.reportsData.policiesHeadcount[0][0].ECount
      ).toLocaleString();
      ppt = add1Table(
        ppt,
        S11customColWidth,
        S11title1,
        S11header1,
        S11tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S12IPTopDiagnosis != null &&
      props.reportsData.S12IPTopDiagnosis[0].length > 0
    ) {
      //create slide 12 template
      let S12customColWidth = [
        0.5,
        2.5,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0
      ];
      let S12title1 = "Snapshot of Inpatient Utilization";
      let S12header1 = "Top 10 Diagnosis";
      let S12tableData1 = [
        [
          "No",
          "Diagnosis",
          "Amount Paid",
          "No. of Case",
          "Avg. per Case",
          "Overall Claimant",
          "Employee",
          "Spouse",
          "Child",
          "Contribution"
        ]
        //["1","URTI","$120,000", "52", "$42" , "20","12","5","3","40%"],
        //["2","COVID","$110,000", "48", "$42" , "18","10","5","3","35%"],
      ];

      let totalCostsS12 = 0;
      for (var i = 0; i < props.reportsData.S12IPTopDiagnosis[0].length; i++) {
        totalCostsS12 += props.reportsData.S12IPTopDiagnosis[0][i].SClaims
          ? props.reportsData.S12IPTopDiagnosis[0][i].SClaims
          : 0;
        if (i <= 9) {
          S12tableData1.push([
            (i + 1).toString(),
            props.reportsData.S12IPTopDiagnosis[0][i].Diagnosis,
            "$" +
              (props.reportsData.S12IPTopDiagnosis[0][i].SClaims
                ? props.reportsData.S12IPTopDiagnosis[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S12IPTopDiagnosis[0][i].SCount,
            "$" +
              (props.reportsData.S12IPTopDiagnosis[0][i].AClaims
                ? props.reportsData.S12IPTopDiagnosis[0][i].AClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S12IPTopDiagnosis[0][i].Employee +
              props.reportsData.S12IPTopDiagnosis[0][i].Spouse +
              props.reportsData.S12IPTopDiagnosis[0][i].Child,
            props.reportsData.S12IPTopDiagnosis[0][i].Employee,
            props.reportsData.S12IPTopDiagnosis[0][i].Spouse,
            props.reportsData.S12IPTopDiagnosis[0][i].Child,
            "0%"
          ]);
        }
      }
      for (var i = 0; i < props.reportsData.S12IPTopDiagnosis[0].length; i++) {
        if (i <= 9) {
          S12tableData1[i + 1][9] = calculatePercentage(
            props.reportsData.S12IPTopDiagnosis[0][i].SClaims
              ? props.reportsData.S12IPTopDiagnosis[0][i].SClaims
              : 0,
            totalCostsS12
          );
        }
      }
      ppt = add1Table(
        ppt,
        S12customColWidth,
        S12title1,
        S12header1,
        S12tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S13IPTopProviders != null &&
      props.reportsData.S13IPTopProviders[0].length > 0
    ) {
      //create slide 13 template
      let S13customColWidth = [
        0.5,
        2.5,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0
      ];
      let S13title1 = "Snapshot of Inpatient Utilization";
      let S13header1 = "Top 10 Providers";
      let S13tableData1 = [
        [
          "No",
          "Provider Name",
          "Amount Paid",
          "No. of Case",
          "Avg. per Case",
          "Overall Claimant",
          "Employee",
          "Spouse",
          "Child",
          "Contribution"
        ]
        //["1","Hospital A","$120,000", "52", "$42" , "20","12","5","3","40%"],
        //["2","Hospital B","$110,000", "48", "$42" , "18","10","5","3","35%"],
      ];

      let totalCostsS13 = 0;
      for (var i = 0; i < props.reportsData.S13IPTopProviders[0].length; i++) {
        totalCostsS13 += props.reportsData.S13IPTopProviders[0][i].SClaims
          ? props.reportsData.S13IPTopProviders[0][i].SClaims
          : 0;
        if (i <= 9) {
          S13tableData1.push([
            (i + 1).toString(),
            props.reportsData.S13IPTopProviders[0][i].ClinicName,
            "$" +
              (props.reportsData.S13IPTopProviders[0][i].SClaims
                ? props.reportsData.S13IPTopProviders[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S13IPTopProviders[0][i].SCount,
            "$" +
              (props.reportsData.S13IPTopProviders[0][i].AClaims
                ? props.reportsData.S13IPTopProviders[0][i].AClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S13IPTopProviders[0][i].Employee +
              props.reportsData.S13IPTopProviders[0][i].Spouse +
              props.reportsData.S13IPTopProviders[0][i].Child,
            props.reportsData.S13IPTopProviders[0][i].Employee,
            props.reportsData.S13IPTopProviders[0][i].Spouse,
            props.reportsData.S13IPTopProviders[0][i].Child,
            "0%"
          ]);
        }
      }
      for (var i = 0; i < props.reportsData.S13IPTopProviders[0].length; i++) {
        if (i <= 9) {
          S13tableData1[i + 1][9] = calculatePercentage(
            props.reportsData.S13IPTopProviders[0][i].SClaims
              ? props.reportsData.S13IPTopProviders[0][i].SClaims
              : 0,
            totalCostsS13
          );
        }
      }
      ppt = add1Table(
        ppt,
        S13customColWidth,
        S13title1,
        S13header1,
        S13tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S14IPTopClaimants != null &&
      props.reportsData.S14IPTopClaimants[0].length > 0
    ) {
      //create slide 14 template
      let S14customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
      let S14title1 = "Snapshot of Inpatient Utilization";
      let S14header1 = "Top 10 Claimants";
      let S14tableData1 = [
        [
          "No",
          "Claimant Name",
          "Relationship",
          "Benefit Plan",
          "Amount Paid",
          "No. of Case",
          "Admission Day",
          "Avg. per Case"
        ]
        //["1","Patient 1","E", "Plan A", "$42,000" , "20","12","$45"],
        //["2","Patient 2","E", "Plan A", "$40,000" , "18","10","$35"],
      ];

      for (var i = 0; i < props.reportsData.S14IPTopClaimants[0].length; i++) {
        if (i <= 9) {
          S14tableData1.push([
            (i + 1).toString(),
            props.reportsData.S14IPTopClaimants[0][i].Name,
            props.reportsData.S14IPTopClaimants[0][i].Relation,
            "",
            "$" +
              (props.reportsData.S14IPTopClaimants[0][i].SClaims
                ? props.reportsData.S14IPTopClaimants[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S14IPTopClaimants[0][i].SCount,
            "0",
            "$" +
              (props.reportsData.S14IPTopClaimants[0][i].AClaims
                ? props.reportsData.S14IPTopClaimants[0][i].AClaims
                : 0
              ).toLocaleString()
          ]);
        }
      }

      ppt = add1Table(
        ppt,
        S14customColWidth,
        S14title1,
        S14header1,
        S14tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    ppt = addTitleSlide(ppt, "Panel GP", "Utilization Review");

    if (
      props.reportsData.S22OPGPTable != null &&
      props.reportsData.S22OPGPTable[0].length > 0
    ) {
      //create slide 16 template
      let S16customColWidth = [0.5, 2.5, 1.5, 1.5, 1.5, 1.5];
      let S16title1 = "Snapshot of Outpatient (GP) Utilization";
      let S16header1 = "Overview";
      let S16tableData1 = [
        ["No", "Description", "Employee", "Spouse", "Child", "Overall"],
        ["1", "Amount", "$0", "$0", "$0", "$0"],
        ["2", "Case", "-", "-", "-", "-"],
        ["3", "Claimant", "-", "-", "-", "-"],
        ["4", "Average Cost", "-", "-", "-", "-"],
        ["5", "Cost per Member", "-", "-", "-", "-"],
        ["6", "Incidence Rate", "-", "-", "-", "-"]
      ];

      let totalCostsS16 = 0;
      let totalCaseS16 = 0;
      let totalClaimantS16 = 0;

      for (var i = 0; i < props.reportsData.S22OPGPTable[0].length; i++) {
        totalCostsS16 += props.reportsData.S22OPGPTable[0][i].SClaims
          ? props.reportsData.S22OPGPTable[0][i].SClaims
          : 0;
        totalCaseS16 += props.reportsData.S22OPGPTable[0][i].SCount
          ? props.reportsData.S22OPGPTable[0][i].SCount
          : 0;
        totalClaimantS16 += props.reportsData.S22OPGPTable[0][i].UniqueCount
          ? props.reportsData.S22OPGPTable[0][i].UniqueCount
          : 0;
        //get employee object
        let index = 2;
        switch (props.reportsData.S22OPGPTable[0][i].Relation) {
          case "E0":
            index = 2;
            break;
          case "S":
            index = 3;
            break;
          case "C":
            index = 4;
            break;
        }
        S16tableData1[1][index] =
          "$" +
          (props.reportsData.S22OPGPTable[0][i].SClaims
            ? props.reportsData.S22OPGPTable[0][i].SClaims
            : 0
          ).toLocaleString();
        S16tableData1[2][index] = (props.reportsData.S22OPGPTable[0][i].SCount
          ? props.reportsData.S22OPGPTable[0][i].SCount
          : 0
        ).toLocaleString();
        S16tableData1[3][index] = (props.reportsData.S22OPGPTable[0][i]
          .UniqueCount
          ? props.reportsData.S22OPGPTable[0][i].UniqueCount
          : 0
        ).toLocaleString();
        S16tableData1[4][index] =
          "$" +
          (props.reportsData.S22OPGPTable[0][i].AClaims
            ? props.reportsData.S22OPGPTable[0][i].AClaims
            : 0
          ).toLocaleString();
      }
      S16tableData1[1][5] = "$" + totalCostsS16.toLocaleString();
      S16tableData1[2][5] = totalCaseS16.toLocaleString();
      S16tableData1[3][5] = totalClaimantS16.toLocaleString();
      S16tableData1[4][5] =
        "$" + (totalCostsS16 / totalCaseS16).toLocaleString();
      S16tableData1[5][5] =
        "$" +
        (
          totalCostsS16 / props.reportsData.policiesHeadcount[0][0].ECount
        ).toLocaleString();
      S16tableData1[6][5] = (
        totalClaimantS16 / props.reportsData.policiesHeadcount[0][0].ECount
      ).toLocaleString();
      ppt = add1Table(
        ppt,
        S16customColWidth,
        S16title1,
        S16header1,
        S16tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S30PanelPgEntity != null &&
      props.reportsData.S30PanelPgEntity[0].length > 0 &&
      props.reportsData.S31PanelPgRelationship &&
      props.reportsData.S31PanelPgRelationship[0].length > 0
    ) {
      //create slide 17 template
      let S17customColWidth = [0.5, 3.5, 1.5, 1.5, 1.5];
      let S17title1 = "Panel GP Utilization Review [Sample]";
      let S17header1 = "By Entity";
      let S17tableData1 = [
        ["No", "Entity Name", "Amount Paid", "No. of Cases", "Avg per Case"]
        // ["1", "AmMetLife Pte LTD", "$14,000", "52", "$20"],
        // ["2", "AmMetLife Pte LTD 2", "$12,000", "24", "$10"],
      ];
      for (let i in props.reportsData.S30PanelPgEntity[0]) {
        S17tableData1.push([
          i + 1,
          props.reportsData.S30PanelPgEntity[0][i].CoyName,
          `$${props.reportsData.S30PanelPgEntity[0][i].SClaims}`,
          props.reportsData.S30PanelPgEntity[0][i].SCount,
          `$${props.reportsData.S30PanelPgEntity[0][i].AClaims}`
        ]);
      }
      let S17header2 = "Utilization: Claimants by Relationship";
      let S17LabelData2 = ["Employee", "Spouse", "Child"];
      let e = props.reportsData.S31PanelPgRelationship[0].find(
        val => val.Relation === "E0"
      );
      let s = props.reportsData.S31PanelPgRelationship[0].find(
        val => val.Relation === "S"
      );
      let c = props.reportsData.S31PanelPgRelationship[0].find(
        val => val.Relation === "C"
      );
      let S17Data2 = [
        e?.UniqueCount || 0,
        s?.UniqueCount || 0,
        c?.UniqueCount || 0
      ];
      let S17PieChartData2 = [
        { name: "Unique Claimants", labels: S17LabelData2, values: S17Data2 }
      ];
      ppt = add1Table1PieChart(
        ppt,
        S17customColWidth,
        S17title1,
        S17header1,
        S17tableData1,
        S17header2,
        S17PieChartData2
      );
    }

    if (
      props.reportsData.S24OPGPTopDiagnosis != null &&
      props.reportsData.S24OPGPTopDiagnosis[0].length > 0
    ) {
      //create slide 18 template
      let S18customColWidth = [
        0.5,
        2.5,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0
      ];
      let S18title1 = "Panel GP Utilization Review";
      let S18header1 = "Top 10 Diagnosis";
      let S18tableData1 = [
        [
          "No",
          "Diagnosis",
          "Amount Paid",
          "No. of Case",
          "Avg. per Case",
          "Overall Claimant",
          "Employee",
          "Spouse",
          "Child",
          "Contribution"
        ]
        //["1","URTI","$120,000", "52", "$42" , "20","12","5","3","40%"],
        //["2","COVID","$110,000", "48", "$42" , "18","10","5","3","35%"],
      ];

      let totalCostsS18 = 0;
      for (
        var i = 0;
        i < props.reportsData.S24OPGPTopDiagnosis[0].length;
        i++
      ) {
        totalCostsS18 += props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
          ? props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
          : 0;
        if (i <= 9) {
          S18tableData1.push([
            (i + 1).toString(),
            props.reportsData.S24OPGPTopDiagnosis[0][i].Diagnosis,
            "$" +
              (props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
                ? props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S24OPGPTopDiagnosis[0][i].SCount,
            "$" +
              (props.reportsData.S24OPGPTopDiagnosis[0][i].AClaims
                ? props.reportsData.S24OPGPTopDiagnosis[0][i].AClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S24OPGPTopDiagnosis[0][i].Employee +
              props.reportsData.S24OPGPTopDiagnosis[0][i].Spouse +
              props.reportsData.S24OPGPTopDiagnosis[0][i].Child,
            props.reportsData.S24OPGPTopDiagnosis[0][i].Employee,
            props.reportsData.S24OPGPTopDiagnosis[0][i].Spouse,
            props.reportsData.S24OPGPTopDiagnosis[0][i].Child,
            "0%"
          ]);
        }
      }
      for (
        var i = 0;
        i < props.reportsData.S24OPGPTopDiagnosis[0].length;
        i++
      ) {
        if (i <= 9) {
          S18tableData1[i + 1][9] = calculatePercentage(
            props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
              ? props.reportsData.S24OPGPTopDiagnosis[0][i].SClaims
              : 0,
            totalCostsS18
          );
        }
      }
      ppt = add1Table(
        ppt,
        S18customColWidth,
        S18title1,
        S18header1,
        S18tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S25OPGPTopProviders != null &&
      props.reportsData.S25OPGPTopProviders[0].length > 0
    ) {
      //create slide 19 template
      let S19customColWidth = [
        0.5,
        2.5,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        1.0
      ];
      let S19title1 = "Panel GP Utilization Review";
      let S19header1 = "Top 10 Provider";
      let S19tableData1 = [
        [
          "No",
          "Provider Name",
          "Amount Paid",
          "No. of Case",
          "Avg. per Case",
          "Overall Claimant",
          "Employee",
          "Spouse",
          "Child",
          "Contribution"
        ]
        //["1","Hospital A","$120,000", "52", "$42" , "20","12","5","3","40%"],
        //["2","Hospital B","$110,000", "48", "$42" , "18","10","5","3","35%"],
      ];

      let totalCostsS19 = 0;
      for (
        var i = 0;
        i < props.reportsData.S25OPGPTopProviders[0].length;
        i++
      ) {
        totalCostsS19 += props.reportsData.S25OPGPTopProviders[0][i].SClaims
          ? props.reportsData.S25OPGPTopProviders[0][i].SClaims
          : 0;
        if (i <= 9) {
          S19tableData1.push([
            (i + 1).toString(),
            props.reportsData.S25OPGPTopProviders[0][i].ClinicName,
            "$" +
              (props.reportsData.S25OPGPTopProviders[0][i].SClaims
                ? props.reportsData.S25OPGPTopProviders[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S25OPGPTopProviders[0][i].SCount,
            "$" +
              (props.reportsData.S25OPGPTopProviders[0][i].AClaims
                ? props.reportsData.S25OPGPTopProviders[0][i].AClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S25OPGPTopProviders[0][i].Employee +
              props.reportsData.S25OPGPTopProviders[0][i].Spouse +
              props.reportsData.S25OPGPTopProviders[0][i].Child,
            props.reportsData.S25OPGPTopProviders[0][i].Employee,
            props.reportsData.S25OPGPTopProviders[0][i].Spouse,
            props.reportsData.S25OPGPTopProviders[0][i].Child,
            "0%"
          ]);
        }
      }
      for (
        var i = 0;
        i < props.reportsData.S25OPGPTopProviders[0].length;
        i++
      ) {
        if (i <= 9) {
          S19tableData1[i + 1][9] = calculatePercentage(
            props.reportsData.S25OPGPTopProviders[0][i].SClaims
              ? props.reportsData.S25OPGPTopProviders[0][i].SClaims
              : 0,
            totalCostsS19
          );
        }
      }
      ppt = add1Table(
        ppt,
        S19customColWidth,
        S19title1,
        S19header1,
        S19tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    if (
      props.reportsData.S26OPGPTopClaimants != null &&
      props.reportsData.S26OPGPTopClaimants[0].length > 0
    ) {
      //create slide 20 template
      let S20customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
      let S20title1 = "Panel GP Utilization Review";
      let S20header1 = "Top 10 Claimants";
      let S20tableData1 = [
        [
          "No",
          "Claimant Name",
          "Relationship",
          "Benefit Plan",
          "Amount Paid",
          "No. of Case",
          "Admission Day",
          "Avg. per Case"
        ]
        //["1","Patient 1","E", "Plan A", "$42,000" , "20","12","$45"],
        //["2","Patient 2","E", "Plan A", "$40,000" , "18","10","$35"],
      ];

      for (
        var i = 0;
        i < props.reportsData.S26OPGPTopClaimants[0].length;
        i++
      ) {
        if (i <= 9) {
          S20tableData1.push([
            (i + 1).toString(),
            props.reportsData.S26OPGPTopClaimants[0][i].Name,
            props.reportsData.S26OPGPTopClaimants[0][i].Relation,
            "",
            "$" +
              (props.reportsData.S26OPGPTopClaimants[0][i].SClaims
                ? props.reportsData.S26OPGPTopClaimants[0][i].SClaims
                : 0
              ).toLocaleString(),
            props.reportsData.S26OPGPTopClaimants[0][i].SCount,
            "0",
            "$" +
              (props.reportsData.S26OPGPTopClaimants[0][i].AClaims
                ? props.reportsData.S26OPGPTopClaimants[0][i].AClaims
                : 0
              ).toLocaleString()
          ]);
        }
      }

      ppt = add1Table(
        ppt,
        S20customColWidth,
        S20title1,
        S20header1,
        S20tableData1
      );
    } else {
      ppt = addEmptySlide(ppt, "Snapshot of Total Utilization");
    }

    props.updateLoading(false);

    ppt = addTitleSlide(ppt, "Panel SP", "Utilization Review");
    setShowSM(true);

    exportPowerpoint(ppt);
  };

  const checkDataLoaded = () => {
    if (props.reportsData.S3OverviewCosts == null) {
      return false;
    }
    if (props.reportsData.S4IPTopDiagnosis == null) {
      return false;
    }
    if (props.reportsData.S11IPTable == null) {
      return false;
    }
    if (props.reportsData.S12IPTopDiagnosis == null) {
      return false;
    }
    if (props.reportsData.S13IPTopProviders == null) {
      return false;
    }
    if (props.reportsData.S14IPTopClaimants == null) {
      return false;
    }
    if (props.reportsData.S22OPGPTable == null) {
      return false;
    }
    if (props.reportsData.S23OPGPEntity == null) {
      return false;
    }
    if (props.reportsData.S24OPGPTopDiagnosis == null) {
      return false;
    }
    if (props.reportsData.S25OPGPTopProviders == null) {
      return false;
    }
    if (props.reportsData.S26OPGPTopClaimants == null) {
      return false;
    }
    if (props.reportsData.S27OPGPUtilization == null) {
      return false;
    }
    if (props.reportsData.S28OPSPUtilization == null) {
      return false;
    }
    if (props.reportsData.S29Chronicdemo == null) {
      return false;
    }
    if (props.reportsData.S30PanelPgEntity == null) {
      return false;
    }
    if (props.reportsData.S31PanelPgRelationship == null) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <SweetAlert
        success
        show={showSM}
        title={successMessage}
        onConfirm={() => {
          //refreshPage();
          setShowSM(false);
        }}
        confirmBtnCssClass="sweet-alert-confirm-button"
        cancelBtnCssClass="sweet-alert-cancel-button"
      >
        Generation of the Powerpoint was successful! Please find the powerpoint
        in your "Downloads" folder.
      </SweetAlert>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    reportsData: {
      policiesHeadcount: state.reports.policiesHeadcount,
      S3OverviewCosts: state.reports.S3OverviewCosts,
      S4IPTopDiagnosis: state.reports.S4IPTopDiagnosis,
      S5OPStats: state.reports.S5OPStats,
      S7ChronicStats: state.reports.S7ChronicStats,
      S8ChronicIllness: state.reports.S8ChronicIllness,
      S11IPTable: state.reports.S11IPTable,
      S12IPTopDiagnosis: state.reports.S12IPTopDiagnosis,
      S13IPTopProviders: state.reports.S13IPTopProviders,
      S14IPTopClaimants: state.reports.S14IPTopClaimants,
      S16OPSPTable: state.reports.S16OPSPTable,
      S17OPSPEntity: state.reports.S17OPSPEntity,
      S18OPSPTopDiagnosis: state.reports.S18OPSPTopDiagnosis,
      S19OPSPTopProviders: state.reports.S19OPSPTopProviders,
      S20OPSPTopClaimants: state.reports.S20OPSPTopClaimants,
      S22OPGPTable: state.reports.S22OPGPTable,
      S23OPGPEntity: state.reports.S23OPGPEntity,
      S24OPGPTopDiagnosis: state.reports.S24OPGPTopDiagnosis,
      S25OPGPTopProviders: state.reports.S25OPGPTopProviders,
      S26OPGPTopClaimants: state.reports.S26OPGPTopClaimants,
      S27OPGPUtilization: state.reports.S27OPGPUtilization,
      S28OPSPUtilization: state.reports.S28OPSPUtilization,
      S29Chronicdemo: state.reports.S29Chronicdemo,
      S30PanelPgEntity: state.reports.S30PanelPgEntity,
      S31PanelPgRelationship: state.reports.S31PanelPgRelationship
    }
  };
};

export default connect(mapStateToProps, {
  updateLoading,
  getHeadcount,
  getS3OverviewCosts,
  getS4IPTopDiagnosis,
  getS5OPStats,
  getS7ChronicStats,
  getS8ChronicIllness,
  getS11IPTable,
  getS12IPTopDiagnosis,
  getS13IPTopProviders,
  getS14IPTopClaimants,
  getS16OPSPTable,
  getS17OPSPEntity,
  getS18OPSPTopDiagnosis,
  getS19OPSPTopProviders,
  getS20OPSPTopClaimants,
  getS22OPGPTable,
  getS23OPGPEntity,
  getS24OPGPTopDiagnosis,
  getS25OPGPTopProviders,
  getS26OPGPTopClaimants,
  getS27OPGPUtilization,
  getS28OPSPUtilization,
  getS29Chronicdemo,
  getS30PanelGpEntity,
  getS31PanelGpRelationship,
  nullifyReports
})(DefaultTemplateGeneration);
