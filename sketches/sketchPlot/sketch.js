//------------------------------------------------------------
let SERVER_URL = "http://127.0.0.1:8080";
let bDoExportSvg = false, filenameSvg=null;
let myRandomSeed = 12345;

//------------------------------------------------------------
// https://axidraw.com/doc/py_api/#options-general
let myAxiDrawOptions = 
{
  'model'         : 6, // https://axidraw.com/doc/py_api/#model
  'penlift'       : 3, // https://axidraw.com/doc/py_api/#penlift
  'speed_pendown' : 40, 
  'speed_penup'   : 60
}

//------------------------------------------------------------
async function setup() 
{
    createCanvas(384,576); // 4"x6" at 96 dpi
    createButtons();

    // Infos about Axidraw
    await call('axidraw/version');
}

//------------------------------------------------------------
function draw() 
{
  randomSeed(myRandomSeed); 
  background(255);

  if (bDoExportSvg)
  {
    beginRecordSVG(this, filenameSvg);
  }

  stroke(0);
  let margin = 0.1*width,prevx,prevy;
  for (let i=0;i<50;i++)
  {
    let x1 = prevx??random(margin,width-margin);
    let y1 = prevy??random(margin,height-margin);
    let x2 = random(margin,width-margin);
    let y2 = random(margin,height-margin);

    line(x1,y1,x2,y2);

    prevx = x2;
    prevy = y2;
  }

    if (bDoExportSvg)
    {
        let svgToPlot = endRecordSVG();

        if (filenameSvg == null)
          call('axidraw/plot', myAxiDrawOptions, {'svg':svgToPlot})

        bDoExportSvg  = false;
        filenameSvg   = null;
    }
}

//------------------------------------------------------------
function createButtons()
{
    // A bit of UI
    regenerateButton = createButton('Regenerate');
    regenerateButton.mousePressed(regenerate);

    saveFileButton = createButton('Save .svg');
    saveFileButton.mousePressed(saveSvg);

    toggleButton = createButton('Toggle Up/Down');
    toggleButton.mousePressed( async _=> await call('axidraw/toggle', myAxiDrawOptions) );

    cycleButton = createButton('Cycle Up/Down');
    cycleButton.mousePressed( async _=> await call('axidraw/cycle', myAxiDrawOptions) );

    turnoffButton = createButton('Turn off motors');
    turnoffButton.mousePressed( async _=> await call('axidraw/align', myAxiDrawOptions) );

    exportSvgButton = createButton('Plot');
    exportSvgButton.mousePressed(initiatePlot);
}

//------------------------------------------------------------
// Call the server
async function call(endPoint, options={}, data={})
{
  data.options = options;

  let response = await fetch(`${SERVER_URL}/${endPoint}`, 
  {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
  });

  let result = await response.json();
  if (result.status == 'error')   console.warn(result.message);
  else if (result.status == 'ok') console.log(result.message);
}


//------------------------------------------------------------
// Make a new random seed when the "Regenerate" button is pressed
function regenerate(){
  myRandomSeed = round(millis()); 
}

//------------------------------------------------------------
function saveSvg(){
  filenameSvg = `plot_${myRandomSeed}.svg`;
  initiatePlot();
}

//------------------------------------------------------------
// Set the SVG to be exported when the "Export SVG" button is pressed
function initiatePlot(){
  bDoExportSvg = true; 
}
