import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row
} from "reactstrap";
import Select from "react-select";
import DefaultTemplateGeneration from "./DefaultTemplateGeneration";
import {
  CreateNewPowerpoint,
  addData,
  exportPowerpoint,
  addTitleSlide,
  add2RowsTablePieChart,
  add1Table1PieChart,
  add1Table,
  add2TablesSide,
  add2RowsBarChart
} from "util/pptslidegenerator";
import ReportActions from "redux/reports/actions";
import DatePicker from "react-datepicker";
import DatepickerWrapper from "components/forms/alldatepickers/datepicker.style";

const { getAllPolicies } = ReportActions;

const ReportGenerateForm = props => {
  //call apis
  const [incomingData, setIncData] = useState([]);
  const [data, setData] = useState([]);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationSubtitle, setPresentationSubtitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({
    value: "Default Powerpoint Template",
    label: "Default Powerpoint Template"
  });
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [generatingPPT, setGeneratingPPT] = useState(false);

  const [allPolicies, setAllPolicies] = useState([
    { value: "P1", label: "Policy1" },
    { value: "P2", label: "Policy2" },
    { value: "P3", label: "Policy3" },
    { value: "P4", label: "Policy4" },
    { value: "P5", label: "Policy5" }
  ]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  useEffect(() => {
    //update the data
    props.getAllPolicies(props.authData);
  }, []);

  useEffect(() => {
    setAllPolicies(props.reportsData.allPolicies);
  }, [props.reportsData.allPolicies]);

  /*useEffect(()=>{
        let labels = [];
        let data = [];
        let data2 = [];
        if(incomingData==null || incomingData.length==0) return;
        for( var i=0; i<incomingData[0].length; i++){
            labels.push(incomingData[0][i].VYear + "-" + incomingData[0][i].VMonth);
            data.push(incomingData[0][i].SClaims);
        }
        for( var i=0; i<incomingData[1].length; i++){
            //edit in the future
            data2.push(incomingData[1][i].SClaims);
        }
        const dataTemp = {
            labels: labels,
            datasets: [
                {
                    label: "Sum of Non Panel Claims",
                    backgroundColor: "#563c91",
                    borderColor: "#563c91",
                    borderWidth: 1,
                    hoverBorderColor: "#563c91",
                    data: data
                },
                {
                    label: "Sum of Panel Claims",
                    backgroundColor: "#008000",
                    borderColor: "#008000",
                    borderWidth: 1,
                    hoverBorderColor: "#008000",
                    data: data2
                }
            ]
        };
        setData(dataTemp);
    },[incomingData]);*/

  let handleChange = e => {
    switch (e.target.id) {
      case "presentationTitle":
        setPresentationTitle(e.target.value);
        break;
      case "presentationSubtitle":
        setPresentationSubtitle(e.target.value);
        break;
      /*case "templateSelect":
                setSelectedTemplate(e.target.value);
                break;
            case "policySelect":
                console.log(e.target.value);
                var options = e.target.options;
                var value = [];
                for (var i = 0, l = options.length; i < l; i++) {
                  if (options[i].selected) {
                    value.push(options[i].value);
                  }
                }
                setSelectedPolicies(value);
                break;*/
    }
  };

  let handleChangeTemplate = e => {
    setSelectedTemplate(e);
  };

  let handleChangePolicy = e => {
    setSelectedPolicies(e);
  };

  let GenerateReport = () => {
    if (generatingPPT) {
      alert("Generating ppt, please wait.");
    } else {
      setGeneratingPPT(true);
    }
    return;
    let ppt = CreateNewPowerpoint(presentationTitle, presentationSubtitle);
    //create slide 3 template
    let customColWidth = [0.5, 3.0, 2.0, 2.0];
    let header1 = "Total Claim Costs by Type";
    let tableData1 = [
      ["No", "Claim Type", "Total Claim Costs", "Claim Percentage"],
      ["1", "GHS (IP)", "$120,000", "40%"],
      ["2", "Panel GP", "$20,000", "20%"],
      ["3", "Panel SP", "$25,000", "25%"],
      ["4", "Other Non Panel", "$40,000", "15%"]
    ];
    let labels1 = ["GHS", "Panel GP", "Panel SP", "Non Panel"];
    let PCData1 = [120000, 20000, 25000, 40000];

    let header2 = "Cost Distribution by Relationship";
    let tableData2 = [
      ["No", "Relationships", "Total Claim Costs", "Claim Percentage"],
      ["1", "Employee", "$120,000", "40%"],
      ["2", "Spouse", "$20,000", "20%"],
      ["3", "Child", "$25,000", "25%"]
    ];
    let labels2 = ["Employee", "Spouse", "Child"];
    let PCData2 = [120000, 20000, 25000];
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
      ],
      ["1", "GHS (IP)", "$120,000", "40%"],
      ["2", "Panel GP", "$20,000", "20%"],
      ["3", "Panel SP", "$25,000", "25%"],
      ["4", "Other Non Panel", "$40,000", "15%"]
    ];
    ppt = add1Table(ppt, S4customColWidth, S4title1, S4header1, S4tableData1);

    //create slide 5 template
    let S5customColWidth = [0.5, 2.0, 1.5, 1.5];
    let S5title1 = "Snapshot of Outpatient Utilization (Panel GP/SP)";
    let S5header1 = "Panel GP";
    let S5tableData1 = [
      ["No", "Metric", "Chronic", "Acute"],
      ["1", "Case", "22", "9"],
      ["2", "Total Claimant", "14", "6"],
      ["3", "Claimant (Emp)", "12", "3"],
      ["4", "Claimant (Dep)", "2", "3"],
      ["5", "Amount", "(75%) $75,000", "(25%) $25,000"],
      ["6", "Avg Cost", "$75", "$25"]
    ];
    let S5header2 = "Panel SP";
    let S5tableData2 = [
      ["No", "Metric", "Chronic", "Acute"],
      ["1", "Case", "22", "9"],
      ["2", "Total Claimant", "14", "6"],
      ["3", "Claimant (Emp)", "12", "3"],
      ["4", "Claimant (Dep)", "2", "3"],
      ["5", "Amount", "(75%) $75,000", "(25%) $25,000"],
      ["6", "Avg Cost", "$75", "$25"]
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

    //create slide 8 template
    let S8title1 = "Snapshot of Chronic Demographics";
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
    let S8Data1 = [1, 2, 3, 4, 5, 6, 7];
    let S8BarChartData1 = [
      { name: "Unique Claimants", labels: S8LabelData1, values: S8Data1 }
    ];
    let S8header2 = "By Gender";
    let S8LabelData2 = ["Male", "Female"];
    let S8Data2 = [13, 15];
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
    //create slide 11 template
    let S11customColWidth = [0.5, 2.5, 1.5, 1.5, 1.5, 1.5];
    let S11title1 = "Snapshot of Inpatient Utilization";
    let S11header1 = "Overview";
    let S11tableData1 = [
      ["No", "Description", "Employee", "Spouse", "Child", "Overall"],
      ["1", "Amount", "$120,000", "$20,000", "$10,000", "$150,000"],
      ["2", "Case", "50", "20", "10", "80"],
      ["3", "Claimant", "5", "2", "1", "8"],
      ["4", "Average Cost", "$45", "$35", "$32", "$40"]
    ];
    ppt = add1Table(
      ppt,
      S11customColWidth,
      S11title1,
      S11header1,
      S11tableData1
    );

    //create slide 12 template
    let S12customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
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
      ],
      ["1", "URTI", "$120,000", "52", "$42", "20", "12", "5", "3", "40%"],
      ["2", "COVID", "$110,000", "48", "$42", "18", "10", "5", "3", "35%"]
    ];
    ppt = add1Table(
      ppt,
      S12customColWidth,
      S12title1,
      S12header1,
      S12tableData1
    );

    //create slide 13 template
    let S13customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    let S13title1 = "Snapshot of Inpatient Utilization";
    let S13header1 = "Top 10 Provider";
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
      ],
      ["1", "Hospital A", "$120,000", "52", "$42", "20", "12", "5", "3", "40%"],
      ["2", "Hospital B", "$110,000", "48", "$42", "18", "10", "5", "3", "35%"]
    ];
    ppt = add1Table(
      ppt,
      S13customColWidth,
      S13title1,
      S13header1,
      S13tableData1
    );

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
      ],
      ["1", "Patient 1", "E", "Plan A", "$42,000", "20", "12", "$45"],
      ["2", "Patient 2", "E", "Plan A", "$40,000", "18", "10", "$35"]
    ];
    ppt = add1Table(
      ppt,
      S14customColWidth,
      S14title1,
      S14header1,
      S14tableData1
    );

    ppt = addTitleSlide(ppt, "Panel GP", "Utilization Review");

    //create slide 16 template
    let S16customColWidth = [0.5, 2.5, 1.5, 1.5, 1.5, 1.5];
    let S16title1 = "Snapshot of Inpatient Utilization";
    let S16header1 = "Overview";
    let S16tableData1 = [
      ["No", "Description", "Employee", "Spouse", "Child", "Overall"],
      ["1", "Amount", "$120,000", "$20,000", "$10,000", "$150,000"],
      ["2", "Case", "50", "20", "10", "80"],
      ["3", "Claimant", "5", "2", "1", "8"],
      ["4", "Average Cost", "$45", "$35", "$32", "$40"]
    ];
    ppt = add1Table(
      ppt,
      S16customColWidth,
      S16title1,
      S16header1,
      S16tableData1
    );

    //create slide 17 template
    let S17customColWidth = [0.5, 3.5, 1.5, 1.5, 1.5];
    let S17title1 = "Panel GP Utilization Review";
    let S17header1 = "By Entity";
    let S17tableData1 = [
      ["No", "Entity Name", "Amount Paid", "No. of Cases", "Avg per Case"],
      ["1", "AmMetLife Pte LTD", "$14,000", "52", "$20"],
      ["2", "AmMetLife Pte LTD 2", "$12,000", "24", "$10"]
    ];
    let S17header2 = "Utilization: Claimants by Relationship";
    let S17LabelData2 = ["Employee", "Spouse", "Child"];
    let S17Data2 = [13000, 1500, 200];
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

    //create slide 18 template
    let S18customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    let S18title1 = "Snapshot of Inpatient Utilization";
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
      ],
      ["1", "URTI", "$120,000", "52", "$42", "20", "12", "5", "3", "40%"],
      ["2", "COVID", "$110,000", "48", "$42", "18", "10", "5", "3", "35%"]
    ];
    ppt = add1Table(
      ppt,
      S18customColWidth,
      S18title1,
      S18header1,
      S18tableData1
    );

    //create slide 19 template
    let S19customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    let S19title1 = "Snapshot of Inpatient Utilization";
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
      ],
      ["1", "Hospital A", "$120,000", "52", "$42", "20", "12", "5", "3", "40%"],
      ["2", "Hospital B", "$110,000", "48", "$42", "18", "10", "5", "3", "35%"]
    ];
    ppt = add1Table(
      ppt,
      S19customColWidth,
      S19title1,
      S19header1,
      S19tableData1
    );

    //create slide 20 template
    let S20customColWidth = [0.5, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    let S20title1 = "Snapshot of Inpatient Utilization";
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
      ],
      ["1", "Patient 1", "E", "Plan A", "$42,000", "20", "12", "$45"],
      ["2", "Patient 2", "E", "Plan A", "$40,000", "18", "10", "$35"]
    ];
    ppt = add1Table(
      ppt,
      S20customColWidth,
      S20title1,
      S20header1,
      S20tableData1
    );

    ppt = addTitleSlide(ppt, "Panel SP", "Utilization Review");

    exportPowerpoint(ppt);
  };

  return (
    <div>
      {generatingPPT && (
        <DefaultTemplateGeneration
          policiesAttached={selectedPolicies}
          pTitle={presentationTitle}
          pSubtitle={presentationSubtitle}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      )}
      <div className="roe-card-style mt-15 mb-30">
        <div className="roe-card-header">
          <span className="hash"> </span> <p>Report Generation Settings</p>
        </div>
        <Form>
          <FormGroup row>
            <Label
              style={{ paddingLeft: "40px" }}
              for="presentationTitle"
              sm={3}
            >
              Presentation Title
            </Label>
            <Col sm={9}>
              <Input
                autoComplete="true"
                type="text"
                name="text"
                id="presentationTitle"
                value={presentationTitle}
                onChange={e => handleChange(e)}
                placeholder="Presentation 1"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              style={{ paddingLeft: "40px" }}
              for="presentationSubtitle"
              sm={3}
            >
              Presentation Subtitle
            </Label>
            <Col sm={9}>
              <Input
                autoComplete="true"
                type="text"
                name="text"
                id="presentationSubtitle"
                value={presentationSubtitle}
                onChange={e => handleChange(e)}
                placeholder="24th May 2020"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label style={{ paddingLeft: "40px" }} for="templateSelect" sm={3}>
              Select Template
            </Label>
            <Col sm={9}>
              <Select
                type="select"
                name="select"
                id="templateSelect"
                value={selectedTemplate}
                onChange={e => handleChangeTemplate(e)}
                options={[
                  {
                    value: "Default Powerpoint Template",
                    label: "Default Powerpoint Template"
                  }
                ]}
              ></Select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label style={{ paddingLeft: "40px" }} for="policySelect" sm={3}>
              Select Policies
            </Label>
            <Col sm={9}>
              <Select
                defaultValue={selectedPolicies}
                isMulti
                name="colors"
                options={allPolicies}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={e => handleChangePolicy(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label style={{ paddingLeft: "40px" }} for="policySelect" sm={3}>
              Select ROCDate/AdmissionDate
            </Label>
            <Col sm={9}>
              <Row>
                <Col sm={6}>
                  <div className="mb-10">
                    <label className="fs-16 demi-bold-text">From</label>
                    <DatepickerWrapper {...props}>
                      <DatePicker
                        selected={dateFrom}
                        onChange={date => setDateFrom(date)}
                        placeholderText="October 29, 2020"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy"
                        timeCaption="time"
                        className="custom-datepicker"
                        calendarClassName="custom-calender-class"
                      />
                    </DatepickerWrapper>
                  </div>
                </Col>

                <Col sm={6}>
                  <div className="mb-10">
                    <label className="fs-16 demi-bold-text">To</label>
                    <DatepickerWrapper {...props}>
                      <DatePicker
                        selected={dateTo}
                        onChange={date => setDateTo(date)}
                        placeholderText="October 29, 2020"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy"
                        timeCaption="time"
                        className="custom-datepicker"
                        calendarClassName="custom-calender-class"
                      />
                    </DatepickerWrapper>
                  </div>
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Form>
        <Button className="c-primary ml-15" onClick={() => GenerateReport()}>
          Generate Report
        </Button>

        {/*<NewBar
                    data={data}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales:{
                            yAxes:[{
                                ticks:{
                                    beginAtZero:true,
                                    userCallback: function(value, index, values) {
                                        value = value.toString();
                                        value = value.split(/(?=(?:...)*$)/);
                                        value = value.join(',');
                                        return value;
                                    }
                                }
                            }]
                        }
                    }}
                />*/}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authData: {
      accessToken: state.auth.accessToken
    },
    reportsData: {
      allPolicies: state.reports.allPolicies
    }
  };
};

export default connect(mapStateToProps, { getAllPolicies })(ReportGenerateForm);
