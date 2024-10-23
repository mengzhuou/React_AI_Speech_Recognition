import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo-removebg-preview.png';
import { withFuncProps } from "./withFuncProps";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SpeechDetection from './SpeechDetection'; // Import the speech detection component

class Chatbox extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      prompt: "",
      response: "",
    }
  }

  localNav = () => {
    this.props.navigate("/")
  }

  handleInputChange = (event: { target: { value: any; }; }) => {
    this.setState({ prompt: event.target.value });
  };

  handleAISubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/generate', { prompt: this.state.prompt });
      const response = res.data.response;
      window.alert(res.data.response);
      this.setState({ response: res.data.response });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleSpeechDetection = (transcript: string) => {
    this.setState({ prompt: transcript });
  };

  render() {
    const { prompt, response } = this.state;
    return (
      <div className="App">
        <div className='container'>
          <h1 className="title">AI Speech Recognizer</h1>
          <img className="logo_img" src={logo} alt="Logo" />
          <p className='midLineChatbox'>
            You can speak or type any questions. How can I help you? 
          </p>

          <SpeechDetection onDetect={this.handleSpeechDetection} />

          <div className="inputSection">
            <input
              className="inputBar"
              type="text"
              placeholder="Message Traversal AI ..."
              value={prompt}
              onChange={this.handleInputChange}
            />
            <button type="submit" className="submitBtn" onClick={this.handleAISubmit}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
          {response && <p>{response}</p>}
        </div>

        <footer>
          <div className="footer-text">
            Empower Your Journey @
          </div>
          <div className="footer-find-me">
            <a onClick={this.localNav}>AI Speech Recognizer</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default withFuncProps(Chatbox);
