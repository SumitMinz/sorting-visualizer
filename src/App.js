import React from "react";
import { Component } from "react";
//algorithim
import BubbleSort from'./algorithim/bubbleSort';
import InsertionSort from "./algorithim/InsertionSort";
import SelectionSort from "./algorithim/SelectionSort";
//icon
import Play from '@mui/icons-material/PlayCircleOutlineRounded';
import Forward from "@mui/icons-material/SkipNextRounded";
import Backward from '@mui/icons-material/SkipPreviousRounded';
import RotateLeft from '@mui/icons-material/RotateLeft';


import Bar from './components/Bar';
import Form from './components/form'
//css
import './App.css';

//app class
class App extends Component{
  state = {
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 300,
    algorithim:"Bubble Sort",
    timeouts: [],
  };

  ALGORITHIM = {
    "Bubble Sort":BubbleSort,
    "Insertion Sort":InsertionSort,
    "Selection Sort":SelectionSort,
  };
  componentDidMount(){
    this.generateRandomArray();
  }
  generateSteps = () =>{
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    this.ALGORITHIM[this.state.algorithim](array , 0 , steps , colorSteps);

    this.setState({
      arraySteps: steps,
      colorSteps: colorSteps,
    });
  };
  clearTimeouts = () =>{
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  }
  clearColorKey = () =>{
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };
  //random number generate function
  generateRandomNumbers=(min,max)=>{
    return Math.floor(Math.random()*(max - min)+min);
  };

  //random array generate function
  generateRandomArray=()=>{
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    for(let i=0;i<count;i++){
      temp.push(this.generateRandomNumbers(50,200));
    }
    this.setState({
      array: temp,
      arraySteps: [temp],
      currentStep: 0,
    }, () =>{
      this.generateSteps();
    });
  };
  changeArray = (index,value)=>{
    let arr = this.state.array;
    arr[index]=value;
    this.setState({
      array: arr,
      arraySteps: [arr],
      currentStep: 0,
      
    }, () =>{
      this.generateSteps();
    });
  };




  //button handle function
  previousStep = ()=>{
    let currentStep = this.state.currentStep;
    if(currentStep === 0) return ;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    })
  }
  nextStep = () =>{
    let currentStep = this.state.currentStep;
    if(currentStep > this.state.arraySteps.length - 1) return ;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    })
  }
  start = () =>{
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;
    this.clearTimeouts();
    let timeouts = [];
    let i = 0;
     while(i < steps.length - this.state.currentStep){
      let timeout = setTimeout(()=>{
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay *i);
      i++;
     }
     this.setState({
      timeouts: timeouts,
     });
  };


  //toggle functions between different sorting
  bubbleHandle = () =>{
    this.clearTimeouts();
    this.generateRandomArray();
    this.setState({
      algorithim: "Bubble Sort",
    });
  };
  insertionHandle = () =>{
    this.clearTimeouts();
    this.generateRandomArray();
    this.setState({
      algorithim: "Insertion Sort",
    });
  };
  selectionHandle = () =>{
    this.clearTimeouts();
    this.generateRandomArray();
    this.setState({
      algorithim: "Selection Sort",
    });
  };


  //function to change speed of algorithim
  changeSpeed = (e) =>{
    this.clearTimeouts();
    this.setState({
      delay: parseInt(e.target.value),
    });
  };
  render(){
    let Bars = this.state.array.map((value , index)=>(
      <Bar 
        key={index}
        index={index}
        length={value} 
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));
    let playButton;
    if(this.state.arraySteps.length === this.state.currentStep){
      playButton = (
        <button className="controller" onClick={this.generateRandomArray}>
          <RotateLeft/>
        </button>
      );
    }else{
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play/>
        </button>
        );
      
    }
    return (
      <div className="app">
        <div className="header">
          <p>
            Sorting Visualizer
            <div className="sorting">                                          
              <button className="button" onClick={this.bubbleHandle}>Bubble Sort</button>
              <button className="button" onClick={this.selectionHandle}>Selection Sort</button>
              <button className="button" onClick={this.insertionHandle}>Insertion Sort</button>
            </div>
          </p>
          
        </div>
        <div className="frame">
          <div className="barsdiv container card">{Bars}</div>
        </div>
        <div className="control-pannel">
          <div className="control-buttons">
          <button className="controller" onClick={this.previousStep}>
            <Backward/>
          </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
            <Forward/>
          </button>
          </div>
        </div>
        <div className="pannel">
          <Form 
            formLabel='SPEED' 
            values={[500,400,300,200,100]} 
            currentValue={this.state.delay} 
            labels={['1x','2x','3x','4x','5x']}
            onChange={this.changeSpeed}
          />
        </div>
      </div>
    )
  }
}

export default App;
