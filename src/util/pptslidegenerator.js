import pptxgen from "pptxgenjs";

let tableHeaderOptions = {
    color: "#000000",
    fill: "#004991",
    bold: true
}

//let pptx = new pptxgen.PptxGenJS();
//pptx.layout = "LAYOUT_WIDE";

export function CreateNewPowerpoint(title, subtitle) {
    let pptx = new pptxgen();
    //setting meta data
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = 'IHP Malaysia Sdn Bhd';
    pptx.company = 'IHP Malaysia Sdn Bhd';
    pptx.revision = '1';
    pptx.subject = title;
    pptx.title = subtitle;

    pptx.defineSlideMaster({
        title: "NORMAL_MASTER_TEMPLATE",
        bkgd: "FFFFFF",
        objects: [
            { image: { x: 0, y: 0, w: "100%", h: "100%", path: "https://i.ibb.co/DQMVxW8/Master-Slide.png" } }
        ],
        slideNumber: { x: 0.2, y: "95%", color: "#FFFFFF" }
    });

    //Cover Slide
    let coverSlide = pptx.addSlide();
    coverSlide.addImage({ x: 0, y: 0, w: "100%", h: "100%", path: "https://i.ibb.co/0MDkDyS/Cover-Page.png" });

    return pptx;
}

export function addData(ppt, data) {
    //data.text
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(data, { x: "20%", y: "25%", align: "left" });
    return ppt;
}

export function addTable(ppt, data, labels) {
    //data.text
    let rows = [];
    rows.push(labels);
    for (var i = 0; i < data.length; i++) {
        rows.push(data[i]);
    }
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addTable(rows, { x: "0.5", y: "1.0", w: "9.0" });
    return ppt;
}

export function exportPowerpoint(ppt) {
    let thankyouSlide = ppt.addSlide();
    thankyouSlide.addImage({ x: 0, y: 0, w: "100%", h: "100%", path: "https://i.ibb.co/k1wRGHC/Thank-You-Page.png" });
    ppt.writeFile();
}

export function add2RowsTablePieChart(ppt, customColWidth, title, header1, tableData1, pieChartData1, header2, tableData2, pieChartData2) {
    //styling the labels
    tableData1 = styleLabels(tableData1);
    tableData2 = styleLabels(tableData2);

    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText(header1, { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData1, { x: "0.4", y: "1.5", w: "55%", colW: customColWidth });
    newSlide.addChart(ppt.ChartType.pie, pieChartData1, { x: "8.5", y: "0.5", w: "25%", showLegend: true });
    newSlide.addText(header2, { x: "0.2", y: "50%", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData2, { x: "0.4", y: "57%", w: "55%", colW: customColWidth });
    newSlide.addChart(ppt.ChartType.pie, pieChartData2, { x: "8.5", y: "3.2", w: "25%", showLegend: true });
    return ppt;
}

export function add1Table(ppt, customColWidth, title, header1, tableData1) {
    tableData1 = styleLabels(tableData1);
    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText(header1, { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData1, { x: "0.4", y: "1.5", w: "55%", colW: customColWidth });
    return ppt;
}

export function add2TablesSide(ppt, customColWidth, title, header1, tableData1, header2, tableData2) {
    //styling the labels
    tableData1 = styleLabels(tableData1);
    tableData2 = styleLabels(tableData2);

    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText(header1, { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData1, { x: "0.4", y: "1.5", w: "40%", colW: customColWidth });
    newSlide.addText(header2, { x: "50%", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData2, { x: "50%", y: "1.5", w: "40%", colW: customColWidth });
    return ppt;
}

export function add2RowsBarChart(ppt, title, header1, barChartData1, header2, barChartData2) {
    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText(header1, { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addChart(ppt.ChartType.bar, barChartData1, { x: "0.5", y: "1.5", w: "90%", h: "35%", showLegend: true });
    newSlide.addText(header2, { x: "0.2", y: "55%", bold: true, underline: true, fontSize: 20 });
    newSlide.addChart(ppt.ChartType.bar, barChartData2, { x: "0.5", y: "4.5", w: "90%", h: "30%", showLegend: true });
    return ppt;
}

export function addTitleSlide(ppt, title, subtitle) {
    //Title Slide
    let titleSlide = ppt.addSlide();
    titleSlide.addImage({ x: 0, y: 0, w: "100%", h: "100%", path: "https://i.ibb.co/KD9BXx8/Title-Page.png" });
    titleSlide.addText(title, { x: "10%", y: "16%", align: "right", bold: true, underline: true, fontSize: 28 });
    titleSlide.addText(subtitle, { x: "10%", y: "23%", align: "right", bold: true, fontSize: 22 });
    return ppt;
}

export function add1Table1PieChart(ppt, customColWidth, title, header1, tableData1, header2, pieChartData2) {
    //styling the labels
    tableData1 = styleLabels(tableData1);
    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText(header1, { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    newSlide.addTable(tableData1, { x: "0.4", y: "1.5", w: "40%", colW: customColWidth });
    newSlide.addText(header2, { x: "0.2", y: "52%", bold: true, underline: true, fontSize: 20 });
    newSlide.addChart(ppt.ChartType.pie, pieChartData2, { x: "0.5", y: "4.3", w: "40%", h: "35%", showLegend: true });
    return ppt;
}

export function addEmptySlide(ppt, title) {
    //Generate the slide
    let newSlide = ppt.addSlide({ masterName: "NORMAL_MASTER_TEMPLATE" });
    newSlide.addText(title, { x: "0.2", y: "0.4", bold: true, fontSize: 30 });
    newSlide.addText("There are no datasets in this slide", { x: "0.2", y: "1.0", bold: true, underline: true, fontSize: 20 });
    return ppt;
}

//INTERNAL FUNCTOINS
function styleLabels(tableData1) {
    if (tableData1 == null || tableData1.length <= 0) return [[]];
    let labels1 = tableData1[0];
    let labelsStyled1 = [];
    for (var i = 0; i < labels1.length; i++) {
        labelsStyled1.push({
            text: labels1[i],
            options: tableHeaderOptions
        })
    }
    tableData1.splice(0, 1, labelsStyled1);
    return tableData1;
}


