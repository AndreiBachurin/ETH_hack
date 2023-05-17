import React from "react";
import Mosaic from "./Mosaic";
import Footer from "../components/common/Footer";
import ReactGA from "react-ga";
import * as constants from "../constants";
import { loadTranslations } from "../utils/translations";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "../hoc/withRouter";
import { randGoodIcon } from "../utils/^^";
import * as actions from '../actions'

class App extends React.Component {
  constructor() {
    super();
    this.state = {'nickname': '', 'telegram': ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTGChange = this.handleTGChange.bind(this);

    // Analytics
    ReactGA.initialize(constants.GOOGLE_ANALYTICS_ID);
    ReactGA.pageview(window.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.childrenElement.parentElement.scrollTop = 0;
    }
  }

  navigateToFirstIncompleteLevel() {
    // Find first incomplete level
    let target = this.props.levels[0].deployedAddress;
    for (let i = 0; i < this.props.levels.length; i++) {
      const level = this.props.levels[i];
      if (!level.deployedAddress) { 
        return this.props.navigate(`${constants.PATH_LEVEL_ROOT}${i}`);
      }
      const completed = this.props.completedLevels[level.deployedAddress];
      if (!completed) {
        target = level.deployedAddress;
        break;
      }
    }

    // Navigate to first incomplete level
    this.props.navigate(`${constants.PATH_LEVEL_ROOT}${target}`);
  }

  handleNameChange(event) {
    this.setState({nickname: event.target.value});
  }

  handleTGChange(event) {
    this.setState({telegram: event.target.value});
  }
  

  render() {
    let language = localStorage.getItem("lang");
    let strings = loadTranslations(language);
    const supportedNetworks = Object.keys(constants.NETWORKS).filter(
      (key) => key !== "LOCAL" && key !== "UNDEFINED"
    );

    // change the network to goreli network
    async function switchToMumbai() {
      let elements = document.querySelectorAll('.progress-bar-wrapper');
      const deployWindow = document.querySelectorAll('.deploy-window-bg');
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${Number(constants.NETWORKS.MUMBAI.id).toString(16)}` }],//if on wrong network giving option to switch to sepolia network.
        });
        deployWindow[0].style.display = 'none';
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: [{ chainId: `0x${Number(constants.NETWORKS.MUMBAI.id).toString(16)}` }]
                },
              ],
            });
            deployWindow[0].style.display = 'none';
          } catch (addError) {
            if (addError.code === 4001) {
              //User has rejected changing the request
              elements[0].style.display = 'none';
            }
            console.error("Can't add nor switch to the selected network")
          }
        } else if (switchError.code === 4001) {
          //User has rejected changing the request
          if (elements[0]) elements[0].style.display = 'none';
        }
      }
    }

    return (
      <div className="appcontainer">
        {/* Parent container */}
        <main>
          {/* Main title and buttons */}
          <section className="titles">
            <a href={constants.PATH_ROOT}>
              <img
                id="ethical-hacking"
                src="../../imgs/ETHical Hacking_v2.png"
                alt="ETHical-Hacking"
                className="ethical-hacking"
              />
            </a>

            {/* <div
              className="row"
              style={{
                paddingLeft: '100px',
                paddingRight: '40px',
              }}> */}

              
              <center>
              <div className="col-sm-8">
                {/* INFO */}
                { this.props.player.nickname ?
                ( <div><h1>Hello, {this.props.player.nickname}!</h1>
                    <ul>
                      <button
                        onClick={() => this.navigateToFirstIncompleteLevel()}
                        className="buttons">
                        {strings.playNow}
                      </button>
                    </ul>
                    {/* Levels */}
                    <Mosaic></Mosaic>
                  </div>
                )
                : (<form>
                    <input
                      className="form-control"
                      type="text"
                      style={{marginTop: '10px'}}
                      width="auto"
                      onChange={this.handleNameChange}
                      placeholder="Nickname"
                      name="nickname">
                    </input>
                    <input
                      className="form-control"
                      type="text"
                      style={{marginTop: '10px'}}
                      width="auto"
                      onChange={this.handleTGChange}
                      placeholder="Telegram"
                      name="telegram">
                    </input>
                    <button
                      type="button"
                      style={{marginTop: '10px'}}
                      className='btn register_button'
                      onClick={evt => this.props.register(this.state.nickname, this.state.telegram)}>
                      Register
                    </button>
                  </form>)}
                  </div>
                  </center>
                  {/* </div> */}
                  </section>
                    {/* Deploy Window */}
                    <div className="deploy-window-bg">
                      <div className="deploy-window">
                        <h1>{randGoodIcon()}</h1>
                        <h1>{strings.deployMessageTitle}</h1>
                          <br />
                            {strings.deployMessage}
                              <ul>
                                {supportedNetworks.map((network, idx) =>
                                  <li key={idx}>{network}</li>
                                )}
                              </ul>
                              <div className="choice-buttons">
                                <button
                                  className="buttons"
                                  onClick={switchToMumbai}>
                                  {strings.switchToMumbai}
                                </button>
                              </div>
                              
                        </div>
                      </div>
                      {/* Game description */}
                      <section className="Description">
                        <center>
                          <hr />
                        </center>
                      </section>
        </main>
        {/* Footer */}
        <Footer></Footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    levels: state.gamedata.levels,
    completedLevels: state.player.completedLevels,
    player: state.player
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch);
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    register: actions.register
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
